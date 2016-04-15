/// <binding />
"use strict";
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'Scripts');

module.exports = {
    entry: {
        application: [
            //'./Scripts/jquery.cookie-1.4.1.min.js',
            './Content/site.css',
            './Scripts/Parallax.js',
            './Content/creative/bootstrap.min.js',
            './Content/creative/bootstrap.min.css',
            './Content/creative/animate.min.css',
            './Content/creative/creative.css',
            //'./Content/creative/jquery.easing.min.js',
            './Content/creative/jquery.fittext.js',
            './Content/creative/creative.js',
            './Scripts/views/App.jsx']
            //'./Scripts/views/Router.jsx']
    },
    output: {
        filename: "./Scripts/bundle.js"
    },
    module: {
        loaders: [
          {
              test: /\.jsx?/,
              include: APP_DIR,
              loader: 'babel'
          },
          { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/, loader: 'url-loader?limit=100000' },
      { test: /\.json$/, loader: "json" }

        ]
    },
    plugins: [
  new WebpackNotifierPlugin(),
  new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      React: "react",
      ReactDOM: "react-dom"
  }),
  new webpack.optimize.UglifyJsPlugin(),
  new webpack.optimize.DedupePlugin(),
  new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};