import { tools } from '@/utils/MStools'
import api from '@/api/api'

export const deckTools = () => {
  return {
    combineCardWithScryfallData: function(card) {
      return api.get_scryfall_card(card.scryfall_id)
        .then(function(scryeCard) {
          return {...scryeCard.data, ...card}
        })
    },

    getCardCategoryName: function(card) {
      // Fix extra words in type_line (ex... Legendary)
      // Make all creatures category: "Creature"
      // Make all planeswalkers category: "Planeswalker"
      // Make all lands category: "Land"
      // Make all Dual Instants "Instant" (avoid Instant // Sorcery)
      // Else use type_line as category
      return (card.type_line.indexOf('Planeswalker') > -1)
        ? 'Planeswalker'
        : (card.type_line.indexOf('Creature') > -1)
          ? 'Creature'
          : (card.type_line.indexOf('Artifact') > -1)
            ? 'Artifact'
            : (card.type_line.indexOf('Enchantment') > -1)
              ? 'Enchantment'
              : (card.type_line.indexOf('Land') > -1)
                ? 'Land'
                : (card.type_line.indexOf('Instant') > -1)
                  ? 'Instant'
                  : card.type_line
    },

    prepCardForDeckpageDisplay: function(card) {
      // For cards with 2 faces, merge card data with first face
      if ('card_faces' in card) {
        card = {...card, ...card.card_faces[0]}
      }
      // Add "C" to colorless cards for filtering data
      if (card.colors.length === 0) {
        card.colors = ['C']
      }
      return card
    },

    combineListScryfallData: function(cards) {
      // Get all scryfall data to add to local list
      // Then sort deck into categories
      const card_ids     = tools().pluck(cards, 'scryfall_id')
      const cardPromises = card_ids.map(id => api.get_scryfall_card(id))
      return Promise.all(cardPromises)
        .then(cardData => {
          const scryeCards = cardData.map(responseData => responseData.data)
          const combinedDataCardlist = (scryeCards.length === cards.length)
            ? scryeCards.map((scryeCard, idx) => {
                return {...scryeCard, ...cards[idx]}
              })
            : decks[0].cards
          const groupedCards = {}
          combinedDataCardlist.forEach(card => {
            const category = this.getCardCategoryName(card)
            if (!(category in groupedCards)) {
              groupedCards[category] = []
            }
            card = this.prepCardForDeckpageDisplay(card)
            card.category = category
            tools().fastPush(groupedCards[category], card)
          })
          return groupedCards
        })
    },

    filterByColor: function(options) {
      // Fix for double-faced cards
      let filteredDeck = {}
      options.types.forEach(type => {
        filteredDeck[type] = options.deck[type].filter(card => {
          const intersection = tools().intersection(card.colors, options.colors)
          return options.includes === 'includes'
            ? intersection.length > 0
            : intersection.length === 0
        })
      })
      return filteredDeck
    },

    setAllCardsVisible: card => {
      card.visible = true
      return card
    }
  }
}
