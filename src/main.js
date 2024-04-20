// main.js入口文件
// 引入Vue
import Vue from 'vue'

// 这个包用于操作cookie,将后端返回的token存到cookie中
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
// import enLang from 'element-ui/lib/locale/lang/en'

import '@/styles/index.scss' // global css

// 引入APP组件
import App from './App'
// 引入仓库
import store from './store'
// 引入路由
import router from './router'

import './icons' // icon
// 引入权限模块
import './permission' // permission control
import './utils/error-log' // error log

// 引入过滤器
import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// process是node中的全局变量
// 当通过npm run dev时，NODE_ENV就是development
// 当通过npm run build时，NODE_ENV就是production
if (process.env.NODE_ENV === 'production') {
  // 导入mock模块，用于模拟接口
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})

// 注册全局过滤器
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 关闭生产环境时的提示
Vue.config.productionTip = false

// new一个Vue
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
