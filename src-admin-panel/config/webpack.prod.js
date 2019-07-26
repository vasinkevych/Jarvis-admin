const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: './src-admin-panel/js/client.js',
  output: {
    path: __dirname + " '/../../src/public/",
    publicPath: '/',
    filename: 'client.min.js'
  }
});
