import Vue from 'vue'
import App from './App.vue'
import api from '@/api/api'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import '@/assets/css/mana.css'

window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  const baseUrl = window.location.host === 'localhost:8080'
    ? '/'
    : '/slatronica-mtg/'

  // Uncommnmet to enable Service Worker API cacheing
  navigator.serviceWorker.register(`${baseUrl}cache.js`).then(
    () => console.log('Successfully registered cache worker'),
    err => console.warn('Service worker registration failed')
  )
})

Vue.config.productionTip = false

// Universal Filters
Vue.filter('format-datestring', function (value) {
  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec'
  }
  if (!value) return ''
  const vals = value.toString().split('-')
  if (vals.length !== 3) return ''
  const month = months[vals[1]]
  let day = vals[2]
  day = day[0] === '0' ? day[1] : day
  return `${month} ${day}, ${vals[0]}`
})

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
