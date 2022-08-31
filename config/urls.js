/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:41:49
 * @LastEditTime: 2022-08-30 13:56:33
 * @FilePath: /simple_eggjs/config/urls.js
 * @Description: 集成所有的接口，方便统一管理
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
module.exports = {
    // 用户模块
    users: {
        register: '/api/register', // 注册
        login: '/api/login', // 登录
        updatePassword: '/api/updatePassword', // 修改密码
        deleteUser: '/api/deleteUser', // 修改密码
    },
    goods: {
        getGoodsList: "/api/getGoodsList",
    }
}