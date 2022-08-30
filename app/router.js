'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 在这里可以拿到config对象
  const { router, controller, config: { urls } } = app;
  // 用户相关
  router.post(urls.users.register, controller.users.register); // 注册
  // 商品相关
  router.get(urls.goods.getGoodsList, controller.goods.getGoodsList); // 获取商品列表
};
