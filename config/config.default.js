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
      host: "localhost",
      port: "3306",
      user: "root",
      password: "Adreno320",
      database: "CMS",
    },
    app: true,
    agent: false,
  };
  // 跨域
  config.cors = {
    // 这里是允许所有的跨域请求，如有需要可自己查阅文档进行特殊配置
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  };
  // EggJS安全策略，用来暂时解决POST报错
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };
  // 接口URL
  config.urls = urls;

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
