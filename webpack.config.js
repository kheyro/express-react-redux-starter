const path = require('path');
const dev = process.env.NODE_ENV !== "production";

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? "none" : "source-map",
  entry: {
    app: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ["env", "react"]
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }]
  }
};