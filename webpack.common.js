const path = require('path')
const resolve = require('./webpack/resolve')
const loaders = require('./webpack/loaders')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: [
    'js/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: resolve,
  module: {
    rules: [
      loaders.js,
      loaders.sass,
      loaders.reactSvg
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'React webpack babel template',
      hash: true,
      template: path.join(__dirname, 'src', 'index.html')
    })
  ]
}
