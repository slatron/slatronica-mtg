import axios from 'axios';

export default {
  get_cards: () => {
    debugger;
    let baseUrl = window.location.host === 'localhost:8080'
      ? '/'
      : '/slatronica-mtg/'

    return axios.get(baseUrl + 'data/cards.json');
  }
}
