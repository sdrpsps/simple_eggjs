/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-30 10:24:25
 * @LastEditTime: 2022-08-30 11:36:01
 * @FilePath: /simple_eggjs/app/service/goods.js
 * @Description: 
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
const Service = require('egg').Service

class GoodsService extends Service {
    // 获取商品列表
    async getGoodsList({ currentPage, pageSize }) {
        const { ctx, app, service } = this
        return await app.mysql.select('sp_goods', { limit: Number(pageSize), offset: Number((currentPage - 1) * pageSize) })
    }
}

module.exports = GoodsService
