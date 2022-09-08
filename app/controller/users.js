/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:45:53
 * @LastEditTime: 2022-09-01 15:22:02
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
    /* 用户模块公用方法 */
    // 检查登录注册请求体
    checkLoginRegisterBody(username, password) {
        if (!username) {
            this.ctx.status = 401;
            this.ctx.body = this.ctx.fail("用户名不能为空")
            return false;
        } else if (!password) {
            this.ctx.status = 401;
            this.ctx.body = this.ctx.fail("密码不能为空")
            return false;
        } else {
            return true
        }
    }
    // 检查修改密码请求体
    checkPasswordBody(username, oldPassword, newPassword) {
        if (!newPassword) {
            this.ctx.status = 401;
            this.ctx.body = this.ctx.fail("新密码不能为空");
            return false;
        } else if (!oldPassword) {
            this.ctx.status = 401;
            this.ctx.body = this.ctx.fail("旧密码不能为空");
            return false;
        } else if (!username) {
            this.ctx.status = 401;
            this.ctx.body = this.ctx.fail("用户名不能为空");
            return false;
        } else {
            return true;
        }
    }
    // 
    // 检查用户是否存在
    async checkUser(username) {
        const userInfo = await this.service.common.getUser(username);
        if (userInfo) {
            return userInfo;
        } else {
            return false;
        }
    }
    /* 接口方法 */
    // 注册
    async register() {
        const { ctx, service } = this
        const { username, password } = ctx.request.body;
        // 检查请求体
        const bodyStatus = this.checkLoginRegisterBody(username, password)
        if (!bodyStatus) return;
        // 先检查用户是否存在
        const userInfo = await this.checkUser(username)
        if (userInfo) {
            ctx.body = ctx.fail("用户已存在")
            return;
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
        // 检查请求体
        const bodyStatus = this.checkLoginRegisterBody(username, password)
        if (!bodyStatus) return;
        // 检查用户是否存在
        const userInfo = await this.checkUser(username)
        if (!userInfo) {
            ctx.body = ctx.fail("用户不存在")
            return
        };
        // 如果存在，则解密密码进行比对
        const decipherPassword = await service.common.getDecipher(userInfo.password)
        if (decipherPassword === password) {
            const token = app.jwt.sign({ id: userInfo.id, username: userInfo.username }, app.config.jwt.secret);
            return (ctx.body = ctx.success("登录成功", { id: userInfo.id, username: userInfo.username, token }));
        } else {
            return (ctx.body = ctx.fail("密码错误"));
        }
    }
    // 修改密码
    async updatePassword() {
        const { ctx, service, app } = this
        const { username, oldPassword, newPassword } = ctx.request.body;
        const Authorization = ctx.get('Authorization');
        // 检查请求体
        const bodyStatus = this.checkPasswordBody(username, oldPassword, newPassword, Authorization);
        if (!bodyStatus) return;
        // 检查用户是否存在
        const userInfo = await this.checkUser(username)
        if (!userInfo) {
            ctx.status = 401;
            ctx.body = ctx.fail("用户不存在")
            return
        };
        // 如果存在，则解密密码进行比对
        const decipherPassword = await service.common.getDecipher(userInfo.password)
        if (decipherPassword === oldPassword) {
            // 如果新密码和旧密码一致
            if (decipherPassword === newPassword) {
                ctx.status = 401;
                return (ctx.body = ctx.fail("新密码不能与旧密码一致"));
            } else {
                const updateStatus = await service.users.updatePassword(userInfo.id, newPassword)
                if (updateStatus.affectedRows === 1) {
                    return (ctx.body = ctx.success('密码更新成功'))
                } else {
                    ctx.status = 500;
                    return (ctx.body = ctx.fail('密码更新失败'))
                }
            }
        } else {
            ctx.status = 401;
            return (ctx.body = ctx.fail("旧密码输入错误"));
        }

    }
    // 删除用户
    async deleteUser() {
        const { ctx, app, service } = this;
        const { username } = ctx.request.body;

        if (!username) {
            ctx.status = 401;
            return (ctx.body = ctx.fail("用户名不能为空"));
        }
        // 先检查用户是否存在
        const userInfo = await this.checkUser(username)
        if (!userInfo) {
            ctx.status = 401;
            ctx.body = ctx.fail("用户名不存在");
            return;
        }
        // 删除用户
        const deleteStatus = await service.users.deleteUser(userInfo.id)
        if (deleteStatus.affectedRows === 1) {
            return (ctx.body = ctx.success('删除成功'))
        } else {
            return (ctx.body = ctx.fail("删除失败"))
        }
    }

}

module.exports = UsersController
