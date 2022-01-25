import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const { VUE_APP_ROUTE } = process.env

const router =  new Router({
  mode:'history',
  base: VUE_APP_ROUTE,
  routes: [
    {
      path: '',
      name: 'index',
      component:  () => import('@/page/index'),
      redirect: 'query',
      children: [{
        path: 'home',
        name: 'home',
        component:  () => import('@/page/home.vue'),
      }, {
        path: 'query',
        name: 'query',
        component:  () => import('@/page/query')
      }, {
        path: 'serverDetails',
        name: 'serverDetails',
        component:  () => import('@/page/serverDetails'),
        meta: { action: 'query' }
      }, {
        path: 'serverManage',
        name: 'serverManage',
        component:  () => import('@/page/serverManage.vue'),
        meta: { login: true }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component:  () => import('@/page/login'),
    },
    {
      path: '/404',
      name: 'notFound',
      component:  () => import('@/page/404')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const token = localStorage.getItem("token")
  const { login } = to.meta 
  if(!token && to.path != '/login' && login) {
    const { query, name } = to
    store.state.prevRoute = { query, name }
    next({ name: 'login'})
  }else {
    next()
  }
})


export default router