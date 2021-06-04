const _ = require('lodash');

const fetch = require('node-fetch');
const args = require('./args');

const Session = {
  token: null,
  endpoint: 'https://sit-idp.nextcapital.com/as/token.oauth2',

  async middleware(req, res, next) {
    try {
      req.token = await this.getToken();
      next();
    } catch (ex) {
      console.error('Could not establish session:', ex);
      res.sendStatus(401);
    }
  },

  async getToken() {
    if (this.token) {
      return this.token;
    }

    if (args.jwt) {
      this.token = this.jwtExchange(args.jwt);
    } else {
      this.token = this.credentialLogin(args.username, args.password);
    }

    return this.token;
  },

  async credentialLogin(username, password) {
    const authResponse = await this._makeURLEncodedAuthRequest({
      username,
      password,
      client_id: 'ro_client',
      grant_type: 'password'
    });

    return authResponse.access_token;
  },

  async jwtExchange(jwt) {
    const authResponse = await this._makeURLEncodedAuthRequest({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
      client_id: 'componentui'
    });

    return authResponse.access_token;
  },

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
