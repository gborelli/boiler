import webpack from 'webpack';
import Merge from 'webpack-merge';

import CommonConfig from './webpack.common';


export default Merge(CommonConfig, {
  watch: process.env.NODE_ENV === 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.jsx?$/, // both .js and .jsx
  //       loader: 'eslint-loader',
  //       include: '/scripts',
  //       enforce: 'pre',
  //       options: {
  //         fix: true
  //       }
  //     }
  //   ]
  // }
});
