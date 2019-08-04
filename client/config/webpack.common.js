// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const config = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config({ path: path.resolve(__dirname, '../../.env') })
    .parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: './client/client.js',
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
    },
    plugins: [new webpack.DefinePlugin(envKeys)]
  };
};

module.exports = config();
