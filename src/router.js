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
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/GalleryPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/about',
      name: 'AboutPage',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/AboutPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/decks',
      name: 'DeckPage',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/DeckPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/card/gallery/:cardID',
      name: 'SingleGalleryCard',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/SingleGalleryCardPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '*',
      name: 'Error404Page',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/404.vue'),
        footer: () => import('./views/Footer.vue')
      }
    }
  ]
})
