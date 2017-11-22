import webpackConfigs from './conf/webpack';

export default env => webpackConfigs[env.NODE_ENV];
