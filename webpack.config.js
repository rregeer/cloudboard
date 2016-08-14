const webpack = require('webpack')

const env = process.env.NODE_ENV
const config = {
  entry: './src/main.js',
  output: {
    path: 'public',
    publicPath: 'public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ]
}

if (env === 'development') {
  config.devtool = 'source-map'
}

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        unsafe: true,
        warnings: false
      }
    })
  )
}

module.exports = config
