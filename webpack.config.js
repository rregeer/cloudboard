module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'public/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: 'node_modules'
      }
    ]
  }
};
