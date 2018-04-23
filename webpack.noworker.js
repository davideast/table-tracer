const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { NormalModuleReplacementPlugin } = require('webpack');

module.exports = {
  mode: "production",
  // devtool: "inline-source-map",
  entry: "./src/client/index.tsx",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      { from: 'src/client/images/**/*', to: './images', flatten: true },
      { from: 'src/index.html', to: '../functions' },
      'src/client/style.css',
      'src/client/worker/worker.js',
      'node_modules/firebase/firebase-app.js',
      'node_modules/firebase/firebase-firestore.js',
    ]),
    new NormalModuleReplacementPlugin(/\.\/worker$/, '@firebase/app'),
    new NormalModuleReplacementPlugin(/noop-webpack-plugin/, '@firebase/firestore'),
  ]
};
