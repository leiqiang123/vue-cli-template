import Vue from 'vue'
import VueRouter from 'vue-router'
import baseRouters from './routers/baseRouters'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: baseRouters,
})

export default router
