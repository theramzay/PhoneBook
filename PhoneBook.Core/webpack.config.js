/// <binding ProjectOpened='Watch - Development' />
"use strict";
var WebpackNotifierPlugin = require('webpack-notifier');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'Scripts');

module.exports = {
    entry: {
        application: './Scripts/app.jsx'
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
  new WebpackNotifierPlugin()
    ]
};