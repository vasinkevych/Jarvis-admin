const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: './client/client.js',
  output: {
    path: __dirname + " '/../../src/public/",
    publicPath: '/',
    filename: 'client.min.js'
  }
});
