import webpack from 'webpack'; // to access built-in plugins
import Merge from 'webpack-merge';
import CommonConfig from './webpack.common';


export default Merge(CommonConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        // output: {
        //   comments: false,
        //   beautify: false,
        // },
        compress: true, // switch to true?
      },
    }),
  ],
});
