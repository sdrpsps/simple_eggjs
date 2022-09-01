/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-30 10:37:36
 * @LastEditTime: 2022-08-30 11:36:22
 * @FilePath: /simple_eggjs/app/controller/goods.js
 * @Description: 
 * 
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved. 
 */
const Controller = require('egg').Controller

class GoodsController extends Controller {
    async getGoodsList() {
        const { ctx, service } = this
        const { currentPage = 1, pageSize = 5 } = ctx.request.query;
        // 获取数据库操作结果
        const data = await service.goods.getGoodsList({ currentPage, pageSize });
        ctx.body = ctx.page("查询成功", data);

    }
}

module.exports = GoodsController