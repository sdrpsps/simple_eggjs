/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:40:52
 * @LastEditTime: 2022-09-01 14:05:52
 * @FilePath: /simple_eggjs/app/middleware/errorHandler.js
 * @Description: 中间件，目的还是为了扩展功能，这次我们是为了写一个全局错误处理的中间件
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
module.exports = () => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            console.log('捕捉到了错误', err);
            // 处理字段校验错误
            if (err.status === 422 && err.message === 'Validation Failed') {
                ctx.body = ctx.fail(err.message, err.errors)
            } else if (err.sql) {
                // 处理数据库报错
                ctx.body = ctx.fail('MySQL Error', err.sqlMessage)
            } else if (err.status === 401 && err.name === 'UnauthorizedError') {
                ctx.body = ctx.fail('UnauthorizedError', err.message)
            } else {
                ctx.body = ctx.fail('Unknow Error', err)
            }
        }
    };
};
