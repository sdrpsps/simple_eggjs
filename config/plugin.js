'use strict';

const mysql = {
  enable: true,
  package: 'egg-mysql',
};
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mysql,
};
