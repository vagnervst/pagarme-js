const path = require('path')

module.exports = {
  context: path.join(__dirname, './src'),
  entry: './index.js',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.join(__dirname, './dist'),
    libraryTarget: 'commonjs2',
    filename: 'pagarme.js',
    sourceMapFilename: 'pagarme.js.map',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/,
      },
    ],
  },
}

