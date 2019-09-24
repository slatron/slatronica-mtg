import axios from 'axios'

let baseUrl = window.location.host === 'localhost:8080'
  ? '/'
  : '/slatronica-mtg/'

export default {
  get_cards: () => {
    return axios.get(`${baseUrl}data/gallery.json`)
  },

  get_settings: () => {
    return axios.get(`${baseUrl}data/settings.json`)
  },

  get_decks: () => {
    return axios.get(`${baseUrl}data/decks.json`)
  },

  get_scryfall_card: id => {
    return axios.get(`https://api.scryfall.com/cards/${id}`)
  },

  get_pages: () => {
    return axios.get(`${baseUrl}data/pages.json`)
  },

  get_posts: () => {
    return axios.get(`${baseUrl}data/posts.json`)
  }
}
