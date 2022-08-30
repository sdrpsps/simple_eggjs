/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:47:24
 * @LastEditTime: 2022-08-30 15:13:56
 * @FilePath: /simple_eggjs/app/service/users.js
 * @Description: 用户模块SQL逻辑
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
const Service = require('egg').Service

class UsersService extends Service {
    async register(params) {
        const { ctx, app, service } = this
        // 将密码进行密文处理
        const cipherPassword = service.common.getCipher(params.password)
        params.password = cipherPassword
        // 插入到数据库
        return await app.mysql.insert('users', {
            ...params,
            ctime: ctx.cTime(),
            utime: ctx.cTime(),
            // 这里使用了uuid插件生成uuid
            id: ctx.uuid()
        })
    }
    async login(params) {
        const { ctx, app, service } = this
        const decipherPassword = service.common.getDecipher(ctx.password)
        params.password = decipherPassword
    }
}

module.exports = UsersService
