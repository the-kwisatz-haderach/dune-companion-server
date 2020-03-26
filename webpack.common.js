const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()]
}
