import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken()
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
  }
}

const actions = {
  async login(context, date) {
    console.log(date)
    // 调用后端登录接口
    const token = await login(date)
    // 返回一个token 123456
    context.commit('setToken', token)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
