const MinifyPlugin = require('babel-minify-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MinifyPlugin(
      {},
      {
        test: /\.(j|t)s($|\?)/i
      }
    )
  ]
})
