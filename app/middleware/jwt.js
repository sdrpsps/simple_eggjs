/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-09-01 14:02:16
 * @LastEditTime: 2022-09-01 14:35:34
 * @FilePath: /simple_eggjs/app/middleware/jwt.js
 * @Description: 验证并解密token
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
module.exports = () => {
    return async (ctx, next) => {
        const token = ctx.get('Authorization');
        let decodeToken;
        if (token) {
            try {
                // 解码token
                decodeToken = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
                // 验证token用户
                if (decodeToken.username != ctx.request.body.username) {
                    ctx.status = 401;
                    return ctx.body = ctx.fail('不是你的token')
                }
                await next();
            } catch (error) {
                ctx.status = 500;
                return ctx.body = ctx.fail(error.message)
            }
        } else {
            ctx.status = 401;
            return ctx.body = ctx.fail('token不能为空')
        }
    };
};