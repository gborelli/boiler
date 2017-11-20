import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import ENTRYPOINTS from './entrypoints';
import PATH from './paths';

export default {
  context: PATH.src,
  entry: ENTRYPOINTS,
  output: {
    path: PATH.build,
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        }),
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                // modules: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },

  resolve: {
    modules: [
      PATH.node_modules,
      PATH.src,
    ],
    // alias: {
    //   // product: path.resolve(PATH.src.desktop, 'product'),
    //   common: PATH.src.common
    // },
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    // new CommonsChunkPlugin({
    // The order of this array matters
    //  names: ["common"],
    //  minChunks: 2
    // }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(PATH.public, 'index.html'),
      // excludeChunks: [
      //   'docs/assets/main',
      // ],
      minify: false,
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),

  ],
};
