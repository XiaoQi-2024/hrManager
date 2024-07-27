import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes, resetRouter } from '@/router'

const state = {
  token: getToken(),
  userInfo: {},
  routes: constantRoutes // 静态路由的数组
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 设置缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, data) {
    state.userInfo = data
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 静态路由 + 动态路由
  }
}

const actions = {
  async login(context, date) {
    console.log(date)
    // 调用后端登录接口
    const token = await login(date)
    // 返回一个token 123456
    context.commit('setToken', token)
  },
  async getUserInfo(context) {
    const data = await getUserInfo()
    context.commit('setUserInfo', data)
    return data
  },
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空
    resetRouter() // 清空路由信息
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
