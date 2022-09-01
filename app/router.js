'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 在这里可以拿到config对象
  // 引入中间件校验token
  const { router, controller, config: { urls }, middleware } = app;
  // 用户相关
  router.post(urls.users.register, controller.users.register); // 注册
  router.post(urls.users.login, controller.users.login); // 登录
  router.post(urls.users.updatePassword, middleware.jwt(app.config.jwt), controller.users.updatePassword); // 修改密码
  router.delete(urls.users.deleteUser, middleware.jwt(app.config.jwt), controller.users.deleteUser); // 删除用户
  // 商品相关
  router.get(urls.goods.getGoodsList, middleware.jwt(app.config.jwt), controller.goods.getGoodsList); // 获取商品列表
};
