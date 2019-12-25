import axios from 'axios'

let baseUrl = window.location.host === 'localhost:8080'
  ? '/'
  : '/slatronica-mtg/'

let apiUrl = window.location.host === 'localhost:8080'
  ? 'http://localhost:3000/'
  : 'https://icyzqzjclk.execute-api.us-east-1.amazonaws.com/dev/'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    if (config.url.indexOf('api.scryfall.com') > -1)
      return config
    var token = window.localStorage.getItem('token')
    if (token && (config.method !== 'get'))
      config.headers['x-access-token'] = token
    return config;
  }, function (error) {
    return Promise.reject(error)
  });

export default {
  // /authenticate
  // -----------------------------------------------------------
  login: (username, password) => {
    return axios.post(`${apiUrl}authenticate`, {
      username: username,
      password: password
    })
  },
  verify: (token) => {
    return axios.post(`${apiUrl}authenticate/verify`, {
      token: token
    })
  },

  // /gallery
  // -----------------------------------------------------------
  post_gallery: (postData) => {
    return axios.post(`${apiUrl}gallery/`, postData)
  },
  delete_alter: id => {
    return axios.delete(`${apiUrl}gallery/${id}`)
  },
  get_cards: () => {
    return axios.get(`${apiUrl}gallery/`)
  },
  update_gallery_card: (putData) => {
    return axios.put(`${apiUrl}gallery/`, putData)
  },

  // /decks
  // -----------------------------------------------------------
  get_decks: () => {
    return axios.get(`${apiUrl}decks/`)
  },
  add_deck: (newDeck) => {
    return axios.post(`${apiUrl}decks/`, newDeck)
  },
  add_deck_card: (cardData, deckId) => {
    return axios.put(`${apiUrl}decks/${deckId}/addcard/`, cardData)
  },
  update_deck_card: (deckId, options) => {
    return axios.put(`${apiUrl}decks/${deckId}/updateCard/`, options)
  },
  remove_deck_card: (deckId, options) => {
    return axios.delete(`${apiUrl}decks/${deckId}/card/${options.card_id}`, options)
  },
  update_deck: (deckId, deckData) => {
    return axios.put(`${apiUrl}decks/${deckId}`, deckData)
  },
  delete_deck: id => {
    return axios.delete(`${apiUrl}decks/${id}`)
  },

  // external
  // -----------------------------------------------------------
  get_scryfall_card: id => {
    return axios.get(`https://api.scryfall.com/cards/${id}`)
  },
  search_scryfall_names: name => {
    const url = 'https://api.scryfall.com/cards/autocomplete'
    return axios.get(`${url}?q=${name}`)
  },
  get_card_named: name => {
    const url = 'https://api.scryfall.com/cards/named'
    return axios.get(`${url}?exact=${name}`)
  },
  get_card_editions: search_url => {
    return axios.get(search_url)
  },

  // local json
  // -----------------------------------------------------------
  get_settings: () => {
    return axios.get(`${baseUrl}data/settings.json`)
  },

  get_pages: () => {
    return axios.get(`${baseUrl}data/pages.json`)
  },

  get_posts: () => {
    return axios.get(`${baseUrl}data/posts.json`)
  }
}
