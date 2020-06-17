const environments = {
  sit: {
    env: "sit",
    endpoint: "/api",
    authEndpoint: "/as/token.oauth2",
    proxyAuthEndpoint: "https://sit-idp.nextcapital.com",
    proxyEndpoint: "https://sit-pa.nextcapital.com",
    shouldRetryAuth: false,
    staticResourcePath: "https://content.nextcapital.com",
    loginPath: "https://accounts.nextcapital.com",
    logoutEndpoint: "https://sit-fed.nextcapital.com/logout?tenant=john-hancock",
    logoutTarget: "https://john-hancock-sit.nextcapital.com/#/login",
    postMessageTarget: "*",
    sendPostMessages: false
  },
  uat: {
    env: "uat",
    endpoint: "/api",
    authEndpoint: "/as/token.oauth2",
    proxyAuthEndpoint: "https://uat-idp.nextcapital.com",
    proxyEndpoint: "https://uat-pa.nextcapital.com",
    shouldRetryAuth: false,
    staticResourcePath: "https://content.nextcapital.com",
    loginPath: "https://accounts.nextcapital.com",
    logoutEndpoint: "https://uat-fed.nextcapital.com/logout?tenant=john-hancock",
    logoutTarget: "https://john-hancock-uat.nextcapital.com/#/login",
    postMessageTarget: "*",
    sendPostMessages: false
  }
};

module.exports = environments;
