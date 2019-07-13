import Vue from 'vue'
import Router from 'vue-router'
import Gallery from './views/Gallery.vue'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production'
    ? '/slatronica-mtg/'
    : '/',
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }
  ]
})
