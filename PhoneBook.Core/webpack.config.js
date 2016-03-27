/// <binding BeforeBuild='Run - Development' ProjectOpened='Watch - Development' />
"use strict";
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');
var webpack = require("webpack");

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'Scripts');

module.exports = {
    entry: {
        application: [
            //'./Scripts/jquery.cookie-1.4.1.min.js',
            './Scripts/jquery.datetimepicker.full.min.js',
            './Scripts/Parallax.js',
            './Content/creative/bootstrap.min.js',
            //'./Content/creative/jquery.easing.min.js',
            './Content/creative/jquery.fittext.js',
            './Content/creative/creative.js',
            //'./Scripts/modernizr-2.6.2.js',
            //'./Scripts/respond.js',
            './Scripts/dropzone/dropzone.js',
            './Scripts/views/App.jsx']
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
          { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
      { test: /\.useable\.css$/, loader: "style/useable!css" }
        ]
    },
    plugins: [
  new WebpackNotifierPlugin(),
  new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      React: "react",
      ReactDOM: "react-dom"
  })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};