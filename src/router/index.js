import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
// import HomeView from '../views/HomeView.vue'
import Login from '../views/user/Login.vue'

Vue.use(VueCookies)
Vue.use(VueRouter)

// 获取登录用户类型，不同类型匹配不同路由
const userType = Vue.$cookies.get('userType')

// const Login = () => import('../views/user/Login.vue')
// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   }
// ]

let routes = []
const defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录' }
  }
]

//教师管理
const TeacherList = () => import('../views/user/teacher/List.vue')
const TeacherEdit = () => import('../views/user/teacher/Edit.vue')
const TeacherAdd = () => import('../views/user/teacher/Add.vue')

routes = [
  {
    path: '/teacher/list',
    name: 'teacherList',
    component: TeacherList,
    // meta: { title: '教师管理' }
    meta: ['教师管理']
  },
  {
    path: '/teacher/edit',
    name: 'teacherEdit',
    component: TeacherEdit,
    // meta: { title: '教师管理' }
    meta: ['教师管理','编辑']
  },
  {
    path: '/teacher/add',
    name: 'teacherAdd',
    component: TeacherAdd,
    // meta: { title: '教师管理' }
    meta: ['教师管理','新增']
  },
]
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [ ...routes, ...defaultRoutes ]
})

export default router
