var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src-admin-panel/js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
    ]
  },
  output: {
    path: __dirname + "/src-admin-panel/",
    publicPath: 'http://localhost:3001/',
    filename: "client.min.js"
  },
  plugins: []
};
