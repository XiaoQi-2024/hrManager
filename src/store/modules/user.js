import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {}
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
  },
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 设置用户信息为空
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
