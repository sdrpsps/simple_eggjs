/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-30 10:37:36
 * @LastEditTime: 2022-09-08 15:36:00
 * @FilePath: /simple_eggjs/app/controller/goods.js
 * @Description: 商品模块控制器
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
const Controller = require('egg').Controller

class GoodsController extends Controller {
    async getGoodsList() {
        const { ctx, service } = this
        const { currentPage = 1, pageSize = 10, keyWord } = ctx.request.query;
        // 获取数据库操作结果
        const res = await service.goods.getGoodsList({ currentPage, pageSize, keyWord });
        ctx.body = ctx.page("查询成功", res);
    }
}

module.exports = GoodsController