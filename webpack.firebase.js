module.exports = {
  mode: "production",
  // devtool: "inline-source-map",
  entry: "./firebase-bundle.js",
  output: {
    filename: "firebase-bundle.js",
    library: 'firebaseBundle'
  },
  resolve: {
    extensions: [".js"]
  },
};
