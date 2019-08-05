const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const common = require('./webpack.common.js');

const prodConfig = () => {
  const envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`environment.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

  return {
    mode: 'production',
    entry: './client/client.js',
    output: {
      path: path.resolve(__dirname, '../../src/public'),
      publicPath: '/',
      filename: 'client.min.js'
    },
    plugins: [new webpack.DefinePlugin(envKeys)]
  };
};

module.exports = merge(common, prodConfig());
