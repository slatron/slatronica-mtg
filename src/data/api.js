import axios from 'axios';

export default {
  get_cards: () => {
    return axios.get('/data/cards.json');
  }
}
