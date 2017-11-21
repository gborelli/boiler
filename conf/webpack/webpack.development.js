import path from 'path';
import webpack from 'webpack';
import Merge from 'webpack-merge';

import CommonConfig from './webpack.common';
import PATH from './paths';


export default Merge(CommonConfig, {
  // devtool: 'inline-source-map',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    watchContentBase: true,
    // publicPath: config.output.publicPath,
    contentBase: path.resolve(PATH.public),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
