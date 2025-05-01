const _ = require('lodash');
const fetch = require('node-fetch');

const args = require('./args');
const environments = require('./environments.json');

/**
 * A barebones, minimal "session store" needed to get stuff working. Your actual solution
 * will need to be more complex than this.
 */
const Session = {
  token: null, // the token to set on proxied requests
  endpoint: _.get(environments, `${args.env}.authEndpoint`),

  /**
   * Middleware that gets the token and sets it on the request for later middleware (eg: the proxy)
   * to consume.
   *
   * @param {Req} req Express request
   * @param {Res} res Express response
   * @param {Function} next Express next function
   * @returns {Promise}
   */
  async middleware(req, res, next) {
    try {
      req.token = await this.getToken();
      next();
    } catch (ex) {
      console.error('Could not establish session:', ex);
      res.sendStatus(401);
    }
  },

  /**
   * Returns the existing token, or if not present, gets a token using the command line args.
   *
   * @returns {Promise<string>}
   */
  async getToken() {
    // if we already got a token, re-use it
    if (this.token) {
      return this.token;
    }

    // otherwise, get a new one using the command-line args
    if (args.exchangeToken) {
      this.token = await this.jwtExchange(args.exchangeToken);
    } else {
      this.token = args.accessToken;
    }

    return this.token;
  },

  /**
   * Gets a token by performing a bearer token exchange.
   *
   * This should be what your solution uses in production.
   *
   * @param {string} jwt
   * @returns {Promise<string>}
   */
  async jwtExchange(jwt) {
    const converted = Buffer.from(jwt.split('.')[1], 'base64').toString('ascii');
    const { iss } = JSON.parse(converted); // client_id must match issuer

    const authResponse = await this._makeURLEncodedAuthRequest({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
      client_id: iss
    });

    return authResponse.access_token;
  },

  /**
   * Actually makes the request to the auth endpoint for the payload.
   *
   * @param {string} payload Body of the request
   * @returns {Promise<object>}
   */
  async _makeURLEncodedAuthRequest(payload) {
    const body = new URLSearchParams();
    _.forEach(payload, (value, key) => {
      body.append(key, value);
    });

    const response = await fetch(this.endpoint, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    if (response.status !== 200) {
      throw new Error(await response.text());
    }

    return response.json();
  }
};

module.exports = Session;
