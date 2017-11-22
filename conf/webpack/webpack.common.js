import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import ENTRYPOINTS from './entrypoints';
import PATH from './paths';

const TARGET = process.env.npm_lifecycle_event;

const htmlOptions = () => (
  TARGET === 'start' ? null : {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  }
);

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
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: () => [
                  autoprefixer({
                    flexbox: 'no-2009',
                  }),
                ],
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
      {
        test: [/\.bmp$/, /\.ico$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]',
        },
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
      minify: htmlOptions(),
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),

  ],
};
