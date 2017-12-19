const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'main': ['babel-polyfill', './static/src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './static/dist'),
    publicPath: './dist/',
    filename: './[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'postcss': 'style-loader!postcss-loader'
          },
          cssSourceMap: false
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: (process.env.NODE_ENV !== 'production'),
      compress: {
        warnings: false
      }
    })
  ]
};
