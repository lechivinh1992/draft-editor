const strip = require('strip-loader')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const moduleConfig = {
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [strip.loader('debug'), 'babel']
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css')
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        'style',
        'css?modules&importLoaders=2&sourceMap!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      )
    },
    {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    },
    {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    },
    {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file'
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }
  ]
}

module.exports = moduleConfig
