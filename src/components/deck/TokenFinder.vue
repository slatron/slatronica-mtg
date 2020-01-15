<template>
  <form>
    <fieldset>
      <button
        type="button"
        name="button"
        @click="getTokens()"
      >
        Get Tokens
      </button>
    </fieldset>
    <fieldset class="tabs">

      <div
        v-for="(item, idx) in token_hash"
        :key="idx"
      >
        <img :src="`https://img.scryfall.com/cards/small/front/${item.token.id[0]}/${item.token.id[1]}/${item.token.id}.jpg`" >
        {{ item.original }}: <a target="_blank" :href="item.token.uri">{{item.token.name}}</a>
      </div>
    </fieldset>
  </form>
</template>

<script>
import { deckTools } from '@/utils/deckTools'
export default {
  name: 'TokenFinder',
  data: () => {
    return {
      msg: '',
      token_hash: {}
    }
  },
  computed: {
    deck_current () {
      return this.$store.state.deck.deck_current
    }
  },
  methods: {
    getTokens: function () {
      this.token_hash = deckTools().getTokens(this.deck_current.cards)
    },
  }
}
</script>

<style lang="scss" scoped>
  fieldset {
    margin-bottom: 0.5em;
  }

  // copied from compare deck form
  button {
    outline: 0;
    background-color: #2d3748;
    color: #edf2f7;
    cursor: pointer;
    padding: 0.25rem;
    border-color: #2b6cb0;
    border-width: 1px;
    font-size: 0.75rem;
  }

  .tabs {
    display: flex;
    > div {
      flex-grow: 1;
      text-align: center;
    }
  }

</style>
