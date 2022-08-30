/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:47:24
 * @LastEditTime: 2022-08-30 11:35:45
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
        const md5Password = service.common.getMd5Data(params.password)
        params.password = md5Password
        // 插入到数据库
        return await app.mysql.insert('users', {
            ...params,
            ctime: ctx.cTime(),
            utime: ctx.cTime(),
            // 这里使用了uuid插件生成uuid
            // 我们在 app/extend/context.js 中封装的方法都会挂载到 ctx 对象上去
            id: ctx.uuid()
        })
    }
}

module.exports = UsersService
