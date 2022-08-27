/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:46:14
 * @LastEditTime: 2022-08-27 14:48:16
 * @FilePath: /simple_eggjs/app/service/common.js
 * @Description: common.js文件，用来封装一些公用的方法
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */

const Service = require('egg').Service
const crypto = require('crypto');

class CommonService extends Service {
    // 根据用户名查询数据库中的数据
    async getUser(params) {
        const { app } = this
        return await app.mysql.select('users', {
            where: {
                username: params.username
            }
        })
    }

    // 专门对数据进行md5加密的方法，输入明文返回密文
    getMd5Data(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    }
}

module.exports = CommonService
