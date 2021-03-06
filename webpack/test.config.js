const webpack = require('webpack')
const autoprefixer = require('autoprefixer')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      }, {
        test: /\.(scss|css)$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  externals: {
    jsdom: 'window',
    // cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window',
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'],
  },
  watch: true,
  postcss: [autoprefixer],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('test'),
    }),
  ],
}
