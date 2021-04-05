import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: import('../components/Home/home.vue')
  }, {
    path: '/user',
    name: 'Index',
    component: () => import('../views/Index.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../components/User/Login.vue')
  }, {
    path: '/regist',
    name: 'Regist',
    component: () => import('../components/User/Regist.vue')
  },
  {
    path: "/forgotPassword",
    name: "forgotPassword",
    component: () => import("../components/User/forgotPassword.vue")
  }, {
    path: "/resetpassword/:id",
    name: "resetpassword",
    component: () => import("../components/User/resetPassword.vue")
  }, {
    path: '/:catchAll(.*)',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
