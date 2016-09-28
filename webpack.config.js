var path = require('path');

module.exports = {
  context: __dirname,
  entry: {
    app: './scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: ['scripts', 'node_modules'],
    alias: {
      'underscore': 'lodash'
    },
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/,
        test: /\.js$/,
        query: {
          presets: ['es2015'],
          cacheDirectory: true,
          plugins: ['lodash', 'transform-strict-mode', 'transform-object-rest-spread', 'es6-promise']
        },
      }
    ]
  },
  devServer: {
    inline: true
  }
};
