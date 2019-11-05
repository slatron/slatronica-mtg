import axios from 'axios'

let baseUrl = window.location.host === 'localhost:8080'
  ? '/'
  : '/slatronica-mtg/'

let apiUrl = window.location.host === 'localhost:8080'
  ? 'http://localhost:3000/'
  : 'https://icyzqzjclk.execute-api.us-east-1.amazonaws.com/dev/'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    var token = window.localStorage.getItem('token')
    if (token)
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
  // update_card: () => {
  //   return axios.update(`${apiUrl}gallery/`)
  // },

  // external
  // -----------------------------------------------------------
  get_scryfall_card: id => {
    return axios.get(`https://api.scryfall.com/cards/${id}`)
  },

  // local json
  // -----------------------------------------------------------
  get_settings: () => {
    return axios.get(`${baseUrl}data/settings.json`)
  },

  get_decks: () => {
    return axios.get(`${baseUrl}data/decks.json`)
  },

  get_pages: () => {
    return axios.get(`${baseUrl}data/pages.json`)
  },

  get_posts: () => {
    return axios.get(`${baseUrl}data/posts.json`)
  }
}
