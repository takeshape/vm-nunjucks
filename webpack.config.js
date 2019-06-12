'use strict';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    filename: 'index.js'
  },
  target: 'node',
  node: false,
  mode: 'production',
  plugins: [
    new webpack.IgnorePlugin(/^chokidar$/)
  ]
};
