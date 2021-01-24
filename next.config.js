const webpack = require("webpack");

module.exports = {
  build: {
    env: {
      NPM_ONLY_PRODUCTION: 1
    }
  },
  target: "serverless",
  webpack: (config) => {
    config.plugins.push(new webpack.DefinePlugin({ "global.GENTLY": false }));
    return config;
  }
};
