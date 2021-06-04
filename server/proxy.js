const { createProxyMiddleware } = require('http-proxy-middleware');

const apiProxyOptions = {
  target: 'https://sit-pa.nextcapital.com',
  changeOrigin: true,
  timeout: 1000 * 60 * 5, // 5 minutes
  proxyTimeout: 1000 * 60 * 5, // 5 minutes

  /**
   * Handler called before the request is made to AppServer. Here, we add the Authorization
   * header based upon the current session.
   *
   * @param {NodeRequest} proxyReq The native node request object to AppServer. This is missing many
   *  of the stuff that express adds.
   * @param {Request} req The Express request
   */
  onProxyReq: (proxyReq, req) => {
    // add the auth header to the request
    proxyReq.setHeader('Authorization', `Bearer ${req.token}`);
  },

  onProxyRes: () => {
    // while not handled here, it is probably a good idea for you to re-acquire auth and retry
    // once when a 401 is seen (eg: if the old session expired).
  }
};

/**
 * Proxy for handling API requests to NextCapital.
 *
 * @type {Function}
 */
const ApiProxy = createProxyMiddleware(apiProxyOptions);

module.exports = ApiProxy;
