const _ = require('lodash');
const { createProxyMiddleware } = require('http-proxy-middleware');

const args = require('./args');
const environments = require('./environments.json');

const proxyEndpoint = (
  args.proxyEndpoint ||
  _.get(environments, `${args.env}.proxyEndpoint`)
);

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
const apiProxyOptions = {
  target: proxyEndpoint,
  changeOrigin: true,
  timeout: 1000 * 60 * 5, // 5 minutes, NextCapital's server will timeout first
  proxyTimeout: 1000 * 60 * 5, // 5 minutes, NextCapital's server will timeout first

  on: {
    /**
     * Handler called before the request is made to NextCapital's server. Here, we add the
     * Authorization header with the token.
     *
     * @param {NodeRequest} proxyReq The native node request object to NextCapital. This is missing
     *  most of the stuff that express adds.
     * @param {Request} req The Express request
     */
    proxyReq: (proxyReq, req) => {
      proxyReq.setHeader('Authorization', `Bearer ${req.token}`);
    },

    proxyRes: () => {
      // while not handled here, it is probably a good idea for you to re-acquire auth and retry
      // once when a 401 is seen (eg: if the old session expired).
    }
  }
};

/**
 * Proxy for handling API requests to NextCapital.
 *
 * @type {Function}
 */
const ApiProxy = createProxyMiddleware(apiProxyOptions);

module.exports = ApiProxy;
