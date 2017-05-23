const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: __dirname + '/build',
    publicPath: '/'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.css/,
      loader: 'style?sourceMap!css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'GRAPHQL_URL': JSON.stringify(process.env.GRAPHQL_ENDPOINT),
      },
    }),
  ]
}
