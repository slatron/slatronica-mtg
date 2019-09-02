import api from '@/api/api'
import { tools } from '@/utils/MStools'

export default {
  add_scryfall_data: state => {
    const card_ids        = tools().pluck(state.current_deck.cards, 'id')
    const cardPromises    = card_ids.map(id => api.get_scryfall_card(id))

    Promise.allSettled(cardPromises)
      .then(cardData => {
        const scryeCards = cardData.map(resposeData => resposeData.value.data)
        if (scryeCards.length === state.current_deck.cards.length) {
          state.deck_list = scryeCards.map((scryeCard, idx) => {
            return {...scryeCard, ...state.current_deck.cards[idx]}
          })
        } else {
          console.warn('deck list could not fetch all cards, mismatched length')
          state.deck_list = state.current_deck.cards
        }
      })
      .catch((err) => {
        console.warn('Error geting decklist Scryfall data: ', err)
        state.deck_list = state.current_deck.cards
      })
  }
}
