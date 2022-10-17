import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/api'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import './styles/common.scss'
import './directive' //引入自定义指令
import vuescroll from 'vuescroll/dist/vuescroll-native'
import { Constants } from './utils/constants'
import filters from './utils/filters'
// import { observable } from 'vue/types/umd'

Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.use(vuescroll, {
  ops: {
    bar: {
      background: '#ccc',
      onlyShowBarOnScroll: false
    }
  }
})

Vue.prototype.$api = api  //挂载到vue原型上
Vue.prototype.$Constants = Constants //挂在到vue原型上
Vue.config.productionTip = false
//定义全局过滤器
// Object.entries() //方法返回一个给定对象自身可枚举属性的键值对数组
Object.entries(filters).forEach(([name, fn]) => {
  Vue.filter(name, fn)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
