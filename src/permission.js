import router from './router'
import store from './store'
// 进度条插件
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']
/**
 * 前置守卫
 */
router.beforeEach(async(to, from, next) => {
  nprogress.start // 开启进度条
  if (store.getters.token) {
    // 有token
    if (to.path === '/login') {
      // 访问登录页 因为已经登录所以跳转至首页
      next('/')
      // next(地址) 不会执行后置守卫，手动关闭进度条
      nprogress.done
    } else {
      // 已登录 访问非登录页 直接放行
      if (!store.getters.userId) { // vuex中不存在userInfo,初始化执行通过请求头token获取用户信息
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 没有token 没有登录
    if (whiteList.includes(to.path)) {
      // 访问页面在白名单中 直接跳转
      next()
    } else {
      next('/login')
      nprogress.done
    }
  }
})

/**
 * 后置守卫
 */
router.afterEach(() => {
  // 关闭进度条
  nprogress.done
})
