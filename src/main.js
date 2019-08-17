import Vue from 'vue'
import App from './App.vue'
import api from '@/api/api'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'

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
