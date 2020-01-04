const PROXY_CONFIG = [{
  context:['/api'],
  target: 'http://localhost:7200/',
  secure: false,
  logLevel: 'debug', 
  pathRewrite: {
    '^/api': ''
  }
}
];

module.exports = PROXY_CONFIG;

/*{
  "/api/*":{
    "target": "http://localhost:7200/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api": ""
    }
  }
}*/
