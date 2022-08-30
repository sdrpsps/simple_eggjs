/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-27 14:41:49
 * @LastEditTime: 2022-08-30 10:50:53
 * @FilePath: /simple_eggjs/config/urls.js
 * @Description: 集成所有的接口，方便统一管理
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
module.exports = {
    // 用户模块
    users: {
        register: '/api/register', // 注册
    },
    goods: {
        getGoodsList: "/api/getGoodsList",
    }
}