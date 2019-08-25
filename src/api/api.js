import axios from 'axios';

let baseUrl = window.location.host === 'localhost:8080' ? '/' : '/slatronica-mtg/';

export default {
  get_cards: () => {
    return axios.get(baseUrl + 'data/gallery.json');
  },

  get_settings: () => {
    return axios.get(baseUrl + 'data/settings.json');
  },

  get_decks: () => {
    return axios.get(baseUrl + 'data/decks.json');
  }
}
