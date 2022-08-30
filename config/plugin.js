'use strict';

const mysql = {
  enable: true,
  package: 'egg-mysql',
};

const jwt = {
  enable: true,
  package: 'egg-jwt'
}

/** @type Egg.EggPlugin */
module.exports = {
  mysql,
  jwt,
};
