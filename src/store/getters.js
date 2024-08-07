const getters = {
  sidebar: state => state.app.sidebar, // 取app模块属性
  device: state => state.app.device,
  token: state => state.user.token, // 取user模块属性
  userId: state => state.user.userInfo.userId, // 取user模块属性
  avatar: state => state.user.userInfo.staffPhoto,
  name: state => state.user.userInfo.username,
  routes: state => state.user.routes
}
// getters便捷访问:第二行的sidebar可以通过 getters.sidebar 访问而不需要通过 state.app.sidebar
export default getters
