const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  // devtool: "inline-source-map",
  entry: "./src/server/components.tsx",
  externals: {
    express: 'express',
    fs: 'fs',
  },
  target: 'node',
  output: {
    path: path.join(__dirname, 'functions'),
    filename: 'bundle.js',
    library: 'bundle',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css'
    }),
    new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new CopyWebpackPlugin([
      'src/server/index.html'
    ])
  ],
  node: {
    net: 'empty',
    http: 'empty',
    fs: 'empty',
    __dirname: false,
  }
};
