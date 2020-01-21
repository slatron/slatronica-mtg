import { tools } from '@/utils/MStools'
import api from '@/api/api'

export const deckTools = () => {
  return {
    getCardCategoryName: function (card, use_custom_categories) {
      // If card has custom_category, return that
      // else
      // Fix extra words in type_line (ex... Legendary)
      // Make all creatures category: "Creature"
      // Make all planeswalkers category: "Planeswalker"
      // Make all lands category: "Land"
      // Make all Dual Instants "Instant" (avoid Instant // Sorcery)
      // Else use type_line as category
      return ('custom_category' in card === true && use_custom_categories)
        ? card.custom_category
        : (card.type_line.indexOf('Planeswalker') > -1)
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
                    : (card.type_line.indexOf('Sorcery') > -1)
                      ? 'Sorcery'
                      : card.type_line
    },

    countCards: function (deckCards) {
      const allQuantities = tools().pluck(deckCards, 'quantity')
      const addValuesReducer = (acc, cur) => acc + cur
      return allQuantities.length === 0
        ? 0
        : allQuantities.reduce(addValuesReducer)
    },

    priceDeck: function (deckCards) {
      const allQuantities = tools().pluck(deckCards, 'quantity')
      const allPrices = tools().pluckDeep(deckCards, 'prices', 'usd')

      let prices = []
      allQuantities.forEach((qty, idx) => {
        prices[idx] = (qty * allPrices[idx] || 0)
      })
      const addValuesReducer = (acc, cur) => acc + cur
      return prices.length === 0
        ? 0
        : prices.reduce(addValuesReducer)
    },

    prepCardForDeckpageDisplay: function (card) {
      // For cards with 2 faces, merge card data with first face
      if ('card_faces' in card) {
        card = { ...card, ...card.card_faces[0] }
      }
      // Add "C" to colorless cards for filtering data
      if (card.colors.length === 0) {
        card.colors = ['C']
      }

      // add display-only visible property for filtering
      card.visible = true
      return card
    },

    // Call + Combine Scryfall data
    // ================================
    combineCardWithScryfallData: function (card) {
      return api.get_scryfall_card(card.scryfall_id)
        .then(function (scryeCard) {
          // return {...scryeCard.data, ...card}
          return Object.assign(scryeCard.data, card)
        })
    },

    combineScryfallData: function (cards) {
      // Get all scryfall data to add to local list
      const card_ids = tools().pluck(cards, 'scryfall_id')
      const cardPromises = card_ids.map(id => api.get_scryfall_card(id))
      return Promise.all(cardPromises)
        .then(cardData => {
          const scryeCards = cardData.map(responseData => responseData.data)
          return (scryeCards.length === cards.length)
            ? scryeCards.map((scryeCard, idx) => {
              return Object.assign(scryeCard, cards[idx])
            })
            : scryeCards
        })
    },

    // Return cards as categorized hash
    // Add category to current_list card
    // ================================
    groupCards: function (combinedDataCardlist, current_list, use_custom_categories) {
      const groupedCards = {}
      combinedDataCardlist.forEach(card => {
        const category = this.getCardCategoryName(card, use_custom_categories)
        if (!(category in groupedCards)) {
          groupedCards[category] = []
        }
        card = this.prepCardForDeckpageDisplay(card)
        card.category = category


        // add category data to current list card
        let find_card = current_list.find(current_list_card => current_list_card.scryfall_id === card.scryfall_id)
        find_card.category = category
        tools().fastPush(groupedCards[category], card)
      })
      return groupedCards
    },

    // Filtering Methods
    // ================================
    filterByColor: function (options) {
      // Fix for double-faced cards
      let filteredDeck = {}
      options.types.forEach(type => {
        filteredDeck[type] = options.deck[type].map(card => {
          const intersection = tools().intersection(card.colors, options.colors)
          card.visible = options.includes === 'includes'
            ? intersection.length > 0
            : intersection.length === 0
          return card
        })
      })
      return filteredDeck
    },

    // Check each column for visible cards
    // - return array of cols with no visible cards
    getEmptyColumns: function (deck) {
      let hiddenCols = []
      Object.keys(deck).forEach(type => {
        const visibleCards = tools().pluck(deck[type], 'visible')
        const hasTruthyCheck = (acc, cur) => acc || cur
        const typeHasVisibleCards = visibleCards.length === 0
          ? false
          : visibleCards.reduce(hasTruthyCheck)
        if (!typeHasVisibleCards) hiddenCols.push(type)
      })
      return hiddenCols
    },

    setAllCardsVisible: card => {
      card.visible = true
      return card
    },

    getDifference: (currentDeck, targetDeck) => {
      const targetDeckIds = tools().pluck(targetDeck, 'scryfall_id')
      return currentDeck.filter(card => !targetDeckIds.includes(card.scryfall_id))
    },

    // Return token Objects based on cards passed in array
    getTokens: (cardArray) => {
      const relationCards = cardArray.filter(card => {
        return card.hasOwnProperty('all_parts')
      })
      return relationCards.map(card => {
        const tokenObj = card.all_parts.find(part => part.component === 'token')
        return tokenObj
          ? {original: card.name, token: tokenObj}
          : null
      }).filter(x => x)
    }
  }
}
