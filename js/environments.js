/**
 * These are the available environments for the demo application. These should not need to
 * be modified. While you can probably figure out the production config if you are clever, we
 * ask that you please do not.
 */
const environments = {
  sit: {
    env: "sit",
    endpoint: "/api",
    authEndpoint: "/as/token.oauth2",
    proxyAuthEndpoint: "https://sit-idp.nextcapital.com",
    proxyEndpoint: "https://sit-pa.nextcapital.com",
    shouldRetryAuth: true,
    staticResourcePath: "nextcapital-styles/",
    loginPath: "https://accounts.nextcapital.com"
  },
  uat: {
    env: "uat",
    endpoint: "/api",
    authEndpoint: "/as/token.oauth2",
    proxyAuthEndpoint: "https://uat-idp.nextcapital.com",
    proxyEndpoint: "https://uat-pa.nextcapital.com",
    shouldRetryAuth: false,
    staticResourcePath: "nextcapital-styles/",
    loginPath: "https://accounts.nextcapital.com"
  }
};

module.exports = environments;
