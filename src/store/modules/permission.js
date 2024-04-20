import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// 判断用户是否有该路由权限
function hasPermission(roles, route) {
  // 判断用户角色是否在路由规则中的meta角色信息中
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  // 遍历所有动态路由
  routes.forEach(route => {
    // 临时路由变量
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        // 如果有子路由，递归计算
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      // 如果有权限，放到res中
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [], // 当前用户可以访问的所以路由
  addRoutes: [] // 只有当前用户可以访问的动态路由
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) { // admin用户，可访问的路由为router所有的动态路由，可以根据需要修改
        accessedRoutes = asyncRoutes || []
      } else { // 否则，从所有动态路由中过滤出可以访问的
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
