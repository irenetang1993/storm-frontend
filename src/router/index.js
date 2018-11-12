import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
* hidden: true                        if `hidden: true` will not show in the sidebar(default is false)
* alwaysShow: true                    if `alwaysShow: true` will always show the root menu, whatever its child routes length
*                                      if `alwaysShow: false`
* redirect:
* name: ''
* meta: {
*   roles: ['admin', 'editor'],
*   title: 'title',
*   icon: 'svg-name',
*   noCache: true
* }
*/
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  }
]

export default new Router({
  routes: constantRoutes
})
