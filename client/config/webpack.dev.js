const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const common = require('./webpack.common.js');

const devConfig = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config({ path: path.resolve(__dirname, '../../.env') })
    .parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`environment.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      historyApiFallback: true
    },
    plugins: [new webpack.DefinePlugin(envKeys)]
  };
};

module.exports = merge(common, devConfig());
