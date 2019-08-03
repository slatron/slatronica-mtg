import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production'
    ? '/slatronica-mtg/' : '/',
  routes: [
    {
      path: '/',
      name: 'GalleryPage',
      component: () => import('./views/GalleryPage.vue')
    },
    {
      path: '/:card',
      name: 'GalleryCardPage',
      component: () => import('./views/GalleryPage.vue')
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: () => import('./views/AboutPage.vue')
    }
  ]
})
