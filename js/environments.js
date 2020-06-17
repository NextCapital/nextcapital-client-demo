const environments = {
  sit: {
    env: "sit",
    endpoint: "/api",
    authEndpoint: "/as/token.oauth2",
    proxyAuthEndpoint: "https://sit-idp.nextcapital.com",
    proxyEndpoint: "https://sit-pa.nextcapital.com",
    shouldRetryAuth: true,
    staticResourcePath: "nextcapital-styles/"
  },
  uat: {
    env: "uat",
    endpoint: "/api",
    authEndpoint: "/as/token.oauth2",
    proxyAuthEndpoint: "https://uat-idp.nextcapital.com",
    proxyEndpoint: "https://uat-pa.nextcapital.com",
    shouldRetryAuth: true,
    staticResourcePath: "nextcapital-styles/"
  }
};

module.exports = environments;
