const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './index.js',
  output: {
    path: path.join(__dirname, './build'),
    libraryTarget: 'commonjs',
    filename: 'bundle.js'
  }
}
