import axios from 'axios'

let baseUrl = window.location.host === 'localhost:8080' ? '/' : '/slatronica-mtg/'

export default {
  get_cards: () => {
    return axios.get(baseUrl + 'data/cards.json')
  },

  get_settings: () => {
    return axios.get(baseUrl + 'data/settings.json')
  }
}
