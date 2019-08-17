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
      path: '/about',
      name: 'AboutPage',
      component: () => import('./views/AboutPage.vue')
    },
    {
      path: '/decks',
      name: 'DeckPage',
      component: () => import('./views/DeckPage.vue')
    },
    {
      path: '/card/gallery/:cardID',
      name: 'SingleGalleryCard',
      component: () => import('./views/SingleGalleryCardPage.vue')
    }
  ]
})
