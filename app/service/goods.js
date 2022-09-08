/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-08-30 10:24:25
 * @LastEditTime: 2022-09-08 15:36:22
 * @FilePath: /simple_eggjs/app/service/goods.js
 * @Description: 商品模块SQL逻辑
 *
 * Copyright (c) 2022 by sdrpsps(hchow), All Rights Reserved.
 */
const Service = require("egg").Service;
const tableName = "sp_goods";

class GoodsService extends Service {
    // 获取商品列表
    async getGoodsList({ currentPage, pageSize, keyWord }) {
        const { ctx, app, service } = this;
        /* 查询的列名称 */
        const columns = "goods_id, goods_name, goods_price, goods_number";
        /* 要WHERE的列 */
        const where = "goods_name";
        /* 判断是否有keyWord拼接商品列表查询语句和获取总数语句 */
        const goodsSQL =
            `SELECT ${columns} FROM ${tableName} ` +
            (keyWord ? `WHERE ${where} LIKE "%${keyWord}%" ` : "") +
            `LIMIT ${+pageSize} OFFSET ${+(currentPage - 1) * +pageSize}`;
        const totalSQL =
            `SELECT count(1) FROM ${tableName} ` +
            (keyWord ? `WHERE ${where} LIKE '%${keyWord}%'` : "");
        /* 查询数据库 */
        const goodsRes = await app.mysql.query(goodsSQL);
        const totalRes = await app.mysql.query(totalSQL);
        return { goodsList: goodsRes, total: Object.values(totalRes[0])[0] };
    }
}

module.exports = GoodsService;
