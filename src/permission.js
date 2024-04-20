// permission.js用于计算动态路由

import router from './router'
import store from './store'
// 引入提示组件
import { Message } from 'element-ui'
// 引入进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// 从cookie中获取token
import { getToken } from '@/utils/auth' // get token from cookie
// 获取不同页面title
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单，不需要登陆就可以访问
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

// 全局前置路由守卫
// 核心代码都在守卫中
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  /**
   * 发起登录时，会有两个请求：
   * 一个是登录请求，后端返回token
   * 一个是info请求，后端返回用户的信息，并保存在vuex中
   */
  if (hasToken) { // 有token
    if (to.path === '/login') { // 请求路径还是登录，重定向到首页
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) { // 如果有角色，放行
        next()
      } else { // 没有角色，可能是刷新了浏览器，vuex在内存中的数据丢失
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // 重新获取用户信息中的角色
          const { roles } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on roles
          // 根据角色生成路由规则
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          // 动态的添加动态路由
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 没有token
    /* has no token*/
    // 查看是否在白名单中，如果在，放行
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // 否则重定向到登陆页面
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

// 全局后置路由守卫
router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
