const moduleConfig = {
  loaders: [
    {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader',
      ]
    },
    {
      test: /\.scss$/,
      loaders: [
        'style-loader',
        'css-loader?modules&sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
        'sass-loader'
      ]
    },
    {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        presets: ['react-hmre']
      }
    },
    {
      test: /\.json$/,
      loader: 'json'
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
