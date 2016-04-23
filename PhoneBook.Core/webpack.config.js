/// <binding />
"use strict";
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'Assets/js');

module.exports = {
    entry: {
        application: [
            './Assets/css/site.css',
            './Assets/js/Parallax.js',
            './Assets/js/bootstrap.min.js',
            './Assets/css/bootstrap.min.css',
            './Assets/css/animate.min.css',
            './Assets/css/creative.css',
            //'./Content/creative/jquery.easing.min.js',
            './Assets/js/jquery.fittext.js',
            './Assets/js/creative.js',
            './Assets/js/views/App.jsx']
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
      ReactDOM: "react-dom",
      Cookie: "react-cookie"
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new ExtractTextPlugin('bundle.css')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};