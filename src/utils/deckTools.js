import { tools } from '@/utils/MStools'
import api from '@/api/api'

export const deckTools = () => {
  return {
    combineCardWithScryfallData: function(card) {
      api.get_scryfall_card(card.scryfall_id)
        .then(function(scryeCard) {
          return {...scryeCard, ...card}
        })
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
            // Make all lands type: "Land"
            // Make all legendary creatures type: "Creature"
            const type = (card.type_line.indexOf('Land') > -1)
              ? 'Land'
              : (card.type_line.indexOf('Creature') > -1)
                ? 'Creature'
                : card.type_line

            if (!(type in groupedCards)) {
              groupedCards[type] = []
            }

            // For cards with 2 faces, merge card data with first face
            if ('card_faces' in card) {
              card = {...card, ...card.card_faces[0]}
            }

            // Add "C" to colorless cards for filtering data
            if (card.colors.length === 0) {
              card.colors = ['C']
            }
            tools().fastPush(groupedCards[type], card)
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
    }
    // This creates a hash of sorted type categories by card length
    // - could be useful when responsive screens resort deck card types
    //
    // function _getSortKeys(deckList) {
    //   const typesUsed = Object.keys(deckList)
    //   const sortArray = typesUsed.map(type => {
    //     let sortKey = {'name': type}
    //     sortKey.count = deckList[type].length
    //     return sortKey
    //   })
    //   const sortKeys = sortArray.sort(tools().sortBy('count'))
    //   return sortKeys
    // }
  }
}
