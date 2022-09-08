/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:39:38
 * @LastEditTime: 2022-09-01 14:39:12
 * @FilePath: /simple_eggjs/app/extend/context.js
 * @Description: 扩展 context 的功能，也就是经常使用到的 ctx 
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
            message: isObj ? "操作成功" : msg,
            data,
            success: true,
        };
    },
    // 返回一个分页列表
    page(msg = "操作成功", data = null) {
        const isObj = typeof msg === "object";
        isObj && (data = msg);
        return {
            message: isObj ? "操作成功" : msg,
            data,
            success: true,
        };
    },
    // 失败
    fail(message = "操作失败", data = null) {
        const isObj = typeof message === "object";
        isObj && (data = message);
        return {
            message: isObj ? "操作失败" : message,
            data,
            success: false,
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
