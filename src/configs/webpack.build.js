// const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

// const { NODE_ENV = 'production' } = process.env;

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.ts'
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].bundle.js'
  },
  optimization: {
    minimize: false
  },
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       parallel: true,
  //       extractComments: true,
  //       terserOptions: {
  //         keep_classnames: true,
  //         keep_fnames: true
  //       }
  //     })
  //   ]
  // },
  resolve: { extensions: ['.js', '.ts', '.json', '.mjs'] },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  }
};
