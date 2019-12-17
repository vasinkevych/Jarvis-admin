const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    axios: 'axios'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  resolve: { extensions: ['.js', '.ts'], modules: ['node_modules'] },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
