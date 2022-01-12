import { createRouter } from 'vue-router'
// import store from '../store'

const router =  createRouter({
  history: createWebHistory(),
  // base: VUE_APP_ROUTE,
  routes: [
    {
      path: '/server',
      name: 'server',
      component:  () => import('@/page/server/'),
    }
  ]
})

// router.beforeEach((to, from, next)=>{
//   const token = localStorage.getItem("token")
//   if(!token && to.path != '/login') {
//     const { query, name } = to
//     store.state.prevRoute = { query, name }
//     next({ name: 'login'})
//   }else {
//     next()
//   }
// })


export default router