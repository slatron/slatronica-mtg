import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production'
    ? '/slatronica-mtg/'
    : '/',
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: () => import('./views/Gallery.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
