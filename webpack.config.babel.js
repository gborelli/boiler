import webpackConfigs from './conf/webpack';

const env = process.env.NODE_ENV || 'development';
export default webpackConfigs[env];
