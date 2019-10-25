'use strict';
const webpack = require('webpack');
const path = require('path');
const NodeTemplatePlugin = require("webpack/lib/node/NodeTemplatePlugin");
const LoaderTargetPlugin = require("webpack/lib/LoaderTargetPlugin");
const FunctionModulePlugin = require("webpack/lib/FunctionModulePlugin");

const builtins = require("module").builtinModules || Object.keys(process.binding("natives"));
const polyfilled = new Set(['events']);
const externals = builtins.filter(name => !polyfilled.has(name));

module.exports = {
  entry: './src/nunjucks.js',
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    filename: 'index.js'
  },
  target: compiler => {
    // Customized version of the "node" target from webpack/lib/WebpackOptionsApply.js
    new NodeTemplatePlugin({
      asyncChunkLoading: false
    }).apply(compiler);
    new FunctionModulePlugin().apply(compiler);
    new LoaderTargetPlugin("node").apply(compiler);
  },
  externals,
  mode: 'production',
  plugins: [
    new webpack.IgnorePlugin(/^chokidar$/)
  ]
};
