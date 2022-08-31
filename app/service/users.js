/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:47:24
 * @LastEditTime: 2022-08-31 16:22:15
 * @FilePath: /simple_eggjs/app/service/users.js
 * @Description: 用户模块SQL逻辑
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
const Service = require('egg').Service

class UsersService extends Service {
    // 注册
    async register(username, password) {
        const { ctx, app, service } = this
        // 将密码进行密文处理
        const cipherPassword = service.common.getCipher(password)
        password = cipherPassword
        // 插入到数据库
        return await app.mysql.insert('users', {
            username,
            password,
            ctime: ctx.cTime(),
            utime: ctx.cTime(),
            // 这里使用了uuid插件生成uuid
            id: ctx.uuid()
        })
    }
    // 登录
    async login(username, password) {
        const { ctx, app, service } = this
        const decipherPassword = service.common.getDecipher(ctx.password)
        password = decipherPassword
    }
    // 修改密码
    async updatePassword(id, newPassword) {
        const { ctx, app, service } = this
        // 加密新密码
        const cipherPassword = service.common.getCipher(newPassword)
        newPassword = cipherPassword
        // 插入到数据库
        return await app.mysql.update('users', {
            id,
            password: newPassword,
            utime: ctx.cTime(),
        })
    }
    // 删除用户
    async deleteUser(id) {
        const { ctx, app, service } = this
        // 删除
        return await app.mysql.delete('users', { id });
    }
}

module.exports = UsersService
