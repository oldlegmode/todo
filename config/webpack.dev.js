var webpackMerge = require('webpack-merge');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name]',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
      new ExtractTextPlugin('[name].css')
  ],  

  watch: true,

  devServer: {
    /*contentBase: [
      path.join(__dirname, "./dist"),
      path.join(__dirname)
    ],*/
    historyApiFallback: true,
    stats: 'minimal'
  }
});