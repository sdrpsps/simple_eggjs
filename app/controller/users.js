/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:45:53
 * @LastEditTime: 2022-08-31 16:32:56
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
        const { username, password } = ctx.request.body;
        if (!username) {
            return (ctx.body = ctx.fail("用户名不能为空"));
        } else if (!password) {
            return (ctx.body = ctx.fail("密码不能为空"));
        }
        // 先检查用户是否存在
        const userStatus = await service.common.getUser(username);
        if (userStatus.length) {
            return (ctx.body = ctx.fail("用户已存在"));
        }
        // 获取数据库操作结果
        const data = await service.users.register(username, password);
        if (data.affectedRows === 1) {
            ctx.body = ctx.success("新增用户成功");
        } else {
            ctx.body = ctx.fail("新增用户失败");
        }
    }
    // 登录
    async login() {
        const { ctx, service, app } = this
        const { username, password } = ctx.request.body;
        if (!username) {
            return (ctx.body = ctx.fail("用户名不能为空"));
        } else if (!password) {
            return (ctx.body = ctx.fail("密码不能为空"));
        }
        // 先检查用户是否存在
        const userStatus = await service.common.getUser(username);
        if (userStatus.length) {
            // 如果存在，则解密密码进行比对
            const decipherPassword = await service.common.getDecipher(userStatus[0].password)
            if (decipherPassword === password) {
                const token = app.jwt.sign({ username: userStatus[0].username }, app.config.jwt.secret);
                return (ctx.body = ctx.success("登录成功", { username, token }));
            } else {
                return (ctx.body = ctx.fail("密码错误"));
            }
        }

    }
    // 修改密码
    async updatePassword() {
        const { ctx, service, app } = this
        const { username, oldPassword, newPassword } = ctx.request.body;
        const Authorization = ctx.get('Authorization');

        if (!newPassword) {
            return (ctx.body = ctx.fail("新密码不能为空"));
        } else if (!oldPassword) {
            return (ctx.body = ctx.fail("旧密码不能为空"));
        } else if (!username) {
            return (ctx.body = ctx.fail("用户名不能为空"));
        } else if (!Authorization) {
            return (ctx.body = ctx.fail("token不能为空"));
        }

        // 检查用户是否存在
        const userStatus = await service.common.getUser(username);
        if (userStatus.length) {
            // 如果存在，则解密密码进行比对
            const decipherPassword = await service.common.getDecipher(userStatus[0].password)
            if (decipherPassword === oldPassword) {
                // 如果新密码和旧密码一致
                if (decipherPassword === newPassword) {
                    return (ctx.body = ctx.fail("新密码不能与旧密码一致"));
                } else {
                    const updateStatus = await service.users.updatePassword(userStatus[0].id, newPassword)
                    if (updateStatus.affectedRows === 1) {
                        return (ctx.body = ctx.success('密码更新成功'))
                    } else {
                        return (ctx.body = ctx.fail('密码更新失败'))
                    }
                }
            } else {
                return (ctx.body = ctx.fail("旧密码输入错误"));
            }
        }
    }
    // 删除用户
    async deleteUser() {
        const { ctx, app, service } = this;
        const { username } = ctx.request.body;
        const Authorization = ctx.get('Authorization');

        if (!username) {
            return (ctx.body = ctx.fail("用户名不能为空"));
        } else if (!Authorization) {
            return (ctx.body = ctx.fail("token不能为空"));
        }
        // 先检查用户是否存在
        const userStatus = await service.common.getUser(username);
        if (userStatus.length) {
            const deleteStatus = await service.users.deleteUser(userStatus[0].id)
            if (deleteStatus.affectedRows === 1) {
                return (ctx.body = ctx.success('删除成功'))
            } else {
                return (ctx.body = ctx.fail("删除失败"))
            }
        }
    }
}

module.exports = UsersController
