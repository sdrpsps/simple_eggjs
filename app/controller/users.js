/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:45:53
 * @LastEditTime: 2022-08-30 15:40:46
 * @FilePath: /simple_eggjs/app/controller/users.js
 * @Description: 用户模块控制器
 *         
            ctx就是上下文对象
            service是我们之后会写的查询数据库的方法

            ctx.request.body : 获取前台传递过来的参数
            ctx.body : 设置返回数据
        
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
const Controller = require('egg').Controller

class UsersController extends Controller {
    // 注册
    async register() {
        const { ctx, service } = this
        const params = ctx.request.body;
        if (!params.username) {
            return (ctx.body = ctx.fail("用户名不能为空"));
        } else if (!params.password) {
            return (ctx.body = ctx.fail("密码不能为空"));
        }
        // 先检查用户是否存在
        const userStatus = await service.common.getUser(ctx.request.body);
        if (userStatus.length) {
            return (ctx.body = ctx.fail("用户已存在"));
        }
        // 获取数据库操作结果
        const data = await service.users.register(params);
        if (data.affectedRows === 1) {
            ctx.body = ctx.success("新增用户成功");
        } else {
            ctx.body = ctx.fail("新增用户失败");
        }
    }
    // 登录
    async login() {
        const { ctx, service, app } = this
        const params = ctx.request.body;
        if (!params.username) {
            return (ctx.body = ctx.fail("用户名不能为空"));
        } else if (!params.password) {
            return (ctx.body = ctx.fail("密码不能为空"));
        }
        // 先检查用户是否存在
        const userStatus = await service.common.getUser(ctx.request.body);
        if (userStatus.length) {
            // 如果存在，则解密密码进行比对
            const decipherPassword = await service.common.getDecipher(userStatus[0].password)
            if (decipherPassword === params.password) {
                const token = app.jwt.sign({ username: userStatus[0].username }, app.config.jwt.secret);
                return (ctx.body = ctx.success("登录成功", { username: params.username, token }));
            } else {
                return (ctx.body = ctx.fail("密码错误"));
            }
        }

    }
}

module.exports = UsersController
