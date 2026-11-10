const _ = require('lodash');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { getProxyForUrl } = require('proxy-from-env');

const args = require('./args');
const environments = require('./environments.json');

const proxyEndpoint = (
  args.proxyEndpoint ||
  _.get(environments, `${args.env}.proxyEndpoint`)
);

/**
 * When a corporate HTTP(S) proxy applies to `proxyEndpoint` (per the standard `HTTPS_PROXY`/
 * `NO_PROXY` env var conventions), outbound requests to NextCapital have to tunnel through it
 * via CONNECT. Node's http/https modules don't honor those env vars automatically, and
 * `http-proxy` defaults `outgoing.agent` to `false` when none is given, which forces a fresh
 * direct `Agent` per request - so we build the tunneling agent explicitly here and pass it
 * through. `keepAlive: false` because corporate proxies tend to drop idle CONNECT tunnels,
 * which would otherwise surface as `ECONNRESET` on reuse.
 *
 * This is `undefined` when no proxy applies (eg: outside a corporate network, or when
 * `proxyEndpoint` is covered by `NO_PROXY`), which is equivalent to omitting `agent` entirely.
 *
 * @type {import('https-proxy-agent').HttpsProxyAgent | undefined}
 */
const corporateProxyUrl = getProxyForUrl(proxyEndpoint);
const agent = corporateProxyUrl ?
  new HttpsProxyAgent(corporateProxyUrl, { keepAlive: false }) :
  undefined;

/**
 * This represents a minimal, bare-bones example of using a proxy to provide auth. In this case:
 *
 * - We use command line args to authenticate and receive a token
 * - Middleware sets the `token` on the request for the api routes
 * - This middleware then sets the token on the request to NextCapital
 *
 * While this minimal example works, your actual solution needs to be more complex:
 *
 * - You'll need to use an actual multi-user session store. Make sure that once you have a token
 *   for a user, you re-use it for the lifetime of the session.
 * - You'll need some handling to prevent CSRF attacks (eg: CSRF token)
 * - You'll probably want to re-acquire auth and retry when a 401 response is seen
 * - You'll need to hookup to the proper UAT and Production NextCapital servers
 *
 * NOTE: The NextCapital Client supports `Authentication.setHeader`/`clearHeader` for adding
 * arbitrary headers to all API requests the Client makes. This is useful to, for example, attach
 * a CSRF token to all requests.
 */
/**
 * Express middleware that stamps the current session's API token onto `req.headers.authorization`
 * so that `http-proxy` picks it up when it copies incoming headers to the outgoing request in
 * `setupOutgoing` (before any socket is assigned).
 *
 * This is preferred over `on.proxyReq` because that hook fires from `proxyReq.on('socket', ...)`,
 * and when the outgoing `agent` is an `HttpsProxyAgent` (see above) the socket isn't handed to
 * the `ClientRequest` until after the CONNECT + TLS handshake completes - by that point the
 * header block has already been flushed and `setHeader` is a no-op. Setting on `req.headers`
 * sidesteps that race entirely and behaves identically when no proxy agent is in play.
 *
 * This must run as middleware *before* `ApiProxy` in the Express chain (and after
 * `Session.middleware`, which sets `req.token`).
 *
 * @param {Request} req The Express request.
 * @param {Response} res The Express response.
 * @param {Function} next The next middleware in the chain.
 */
const injectAuthHeader = (req, res, next) => {
  req.headers.authorization = `Bearer ${req.token}`;
  next();
};

const apiProxyOptions = {
  target: proxyEndpoint,
  changeOrigin: true,
  timeout: 1000 * 60 * 5, // 5 minutes, NextCapital's server will timeout first
  proxyTimeout: 1000 * 60 * 5, // 5 minutes, NextCapital's server will timeout first
  agent,

  on: {
    proxyRes: () => {
      // while not handled here, it is probably a good idea for you to re-acquire auth and retry
      // once when a 401 is seen (eg: if the old session expired).
    },

    /**
     * Handler called when the proxy encounters an error (eg: the target server is unreachable).
     *
     * @param {Error} err The error that occurred
     * @param {Request} req The Express request
     */
    error: (err, req) => {
      console.error(`Proxy error for ${req.method} ${req.originalUrl}:`, err);
    }
  }
};

/**
 * Proxy for handling API requests to NextCapital.
 *
 * @type {Function}
 */
const ApiProxy = createProxyMiddleware(apiProxyOptions);

module.exports = { ApiProxy, injectAuthHeader };
