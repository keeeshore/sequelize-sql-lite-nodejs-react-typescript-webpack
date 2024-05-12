const HtmlWebPackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
require('dotenv').config({ path: './.env' }); 

module.exports = {
  entry: "./react/index.tsx",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  }, 
  plugins: [
    new HtmlWebPackPlugin({
      template: "./react/index.html", 
      filename: "./index.html"
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};