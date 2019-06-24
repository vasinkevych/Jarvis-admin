// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src-admin-panel/js/client.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client.min.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;
