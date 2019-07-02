import Vue from 'vue'
import Router from 'vue-router'
import Gallery from './views/Gallery.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/about',
      name: 'about',
      // lazy-loaded when the route is visited:
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
