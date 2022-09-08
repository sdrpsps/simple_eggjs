/* eslint valid-jsdoc: "off" */

'use strict';
const urls = require('./urls.js')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1661582147028_5138';
  // 数据库
  config.mysql = {
    client: {
      host: "120.76.175.16",
      port: "3306",
      user: "study",
      password: "study",
      database: "study",
    },
    app: true,
    agent: false,
  };
  // 跨域
  config.cors = {
    // 这里是允许所有的跨域请求，如有需要可自己查阅文档进行特殊配置
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  };
  // EggJS安全策略，用来暂时解决POST报错
  config.security = {
    csrf: {
      enable: true,
      headerName: 'csrf',
    },
  };
  // 接口URL
  config.urls = urls;
  // jwt 配置
  config.jwt = {
    secret: 'p9d6yH3ntkwBmLij', // 自定义加密字符串，secret 是在服务端的，不要泄露
  };


  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
