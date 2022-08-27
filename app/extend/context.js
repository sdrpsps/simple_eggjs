/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:39:38
 * @LastEditTime: 2022-08-27 14:48:53
 * @FilePath: /simple_eggjs/app/extend/context.js
 * @Description: 扩展 context 的功能，也就是等会会经常使用到的 ctx 
 * 之后我们在设置返回值的时候都是通过
    ctx.body = {
        ... 一些需要返回的数据
    }
    我们可以把这些东西给统一封装起来
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */

const uuid = require('uuid');
module.exports = {
    // 在这里规范一些返回数据的格式
    // 成功
    success(msg = "操作成功", data = null) {
        const isObj = typeof msg === "object";
        isObj && (data = msg);
        return {
            errno: 0,
            message: isObj ? "操作成功" : msg,
            data: data,
        };
    },
    // 返回一个分页列表
    page(msg = "操作成功", data = null) {
        const isObj = typeof msg === "object";
        isObj && (data = msg);
        return {
            errno: 0,
            message: isObj ? "操作成功" : msg,
            ...data,
        };
    },
    // 失败
    fail(message = "操作失败", data = null) {
        const isObj = typeof message === "object";
        isObj && (data = message);
        return {
            errno: 1,
            message: isObj ? "操作失败" : message,
            data: data,
        };
    },
    uuid() {
        return uuid.v4().replace("-", "").substr(0, 12);
    },
    // 顺便封装一个返回当前时间戳的方法
    cTime() {
        // 返回当前的时间
        return +new Date();
    },
}
