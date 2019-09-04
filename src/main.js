import Vue from 'vue'
import App from './App.vue'
import api from '@/api/api'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  const baseUrl = window.location.host === 'localhost:8080'
    ? '/'
    : '/slatronica-mtg/'

  navigator.serviceWorker.register(`${baseUrl}cache.js`).then(
    () => console.log('Successfully registered cache worker'),
    err => console.warn('Service worker registration failed')
  )
})

Vue.config.productionTip = false

api.get_settings()
  .then(function (response) {
    new Vue({
      router,
      store: store(response.data),
      render: h => h(App)
    }).$mount('#app')
  })
  .catch(function (error) {
    console.warn('error getting app settings: ')
    console.error(error)
  })
