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
      props: { default: { pageKey: 'about-page' } },
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/DynamicPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      props: { default: { pageKey: 'login-page' } },
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/LoginPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/edh-mulligan',
      name: 'HouseMulligan',
      props: { default: { pageKey: 'edh-house-mulligan' } },
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/DynamicPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/blueprint-process',
      name: 'BlueprintProcess',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/BlueprintProcessView.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/house-rules',
      name: 'HouseRules',
      props: { default: { pageKey: 'edh-house-rules' } },
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/DynamicPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/all-reports',
      name: 'AllReports',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/AllReportsView.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/post/:id',
      name: 'BlogPost',
      props: { default: true },
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/PostView.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/decks',
      name: 'DefaultDeckPage',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/DeckPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/decks/:deckID',
      name: 'DeckPage',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/DeckPage.vue'),
        footer: () => import('./views/Footer.vue')
      }
    },
    {
      path: '/life-tracker',
      name: 'LifeTracker',
      components: {
        header: () => import('./views/HeaderView.vue'),
        default: () => import('./views/LifeTrackerView.vue')
      }
    },
    {
      path: '/card/gallery/:«cardID»',
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
