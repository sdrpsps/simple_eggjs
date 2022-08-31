/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:46:14
 * @LastEditTime: 2022-08-30 15:57:58
 * @FilePath: /simple_eggjs/app/service/common.js
 * @Description: common.js文件，用来封装一些公用的方法
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */

const Service = require('egg').Service
const crypto = require('crypto');

// 密码加密算法
const algorithm = 'aes192'
// 密码加密密钥
const secret = '4rABqAJacYpNxecTeKkKjzCZpugTwmuE'
// 密码编码方法
const encoding = 'hex'

class CommonService extends Service {
    // 根据用户名查询数据库中的数据
    async getUser(username) {
        const { app } = this
        return await app.mysql.select('users', {
            where: {
                username
            }
        })
    }
    // 加密密码
    getCipher(password) {
        const cipher = crypto.createCipher(algorithm, secret)
        cipher.update(password)
        const cipherPassword = cipher.final(encoding)
        return cipherPassword;
    }
    // 解密密码
    getDecipher(dbPassword) {
        const decipher = crypto.createDecipher(algorithm, secret)
        decipher.update(dbPassword, encoding)
        const decipherPassword = decipher.final('utf-8')
        return decipherPassword;
    }
}

module.exports = CommonService
