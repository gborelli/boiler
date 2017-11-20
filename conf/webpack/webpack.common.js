// import path from 'path';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
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
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'jsx-loader',
          'babel-loader',
        ],
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
    // extensions: ['.json', '.js', ],
  },
  plugins: [
    // new CommonsChunkPlugin({
    // The order of this array matters
    //  names: ["common"],
    //  minChunks: 2
    // }),

    /*
    new HtmlWebpackPlugin({
      inject: 'head',
      excludeChunks: ['common', 'f1','f2','f3','f4','f5','f6','Utils'],
    filename: 'css_sources.html',
      template: path.resolve(PATH.src.less, 'css_links.tmpl'),
      minify: false
    }),
    */

    // new HtmlWebpackPlugin({
    //   filename: 'javascript_sources.html',
    //   template: path.resolve(PATH.src, 'js_links.tmpl'),
    //   excludeChunks: [
    //     'docs/assets/main',
    //   ],
    //   minify: false
    // }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   openAnalyzer: false,
    //   reportFilename: path.resolve(PATH.report, 'webpack.build.report.html')
    // }),
  ],
};
