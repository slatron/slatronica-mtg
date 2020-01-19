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
    <fieldset>
      <div class="scroll-y">
        <div
          v-for="(item, idx) in token_hash"
          :key="idx"
        >
          <a :href="`https://img.scryfall.com/cards/large/front/${item.token.id[0]}/${item.token.id[1]}/${item.token.id}.jpg`" target="_blank">
            <img :src="`https://img.scryfall.com/cards/small/front/${item.token.id[0]}/${item.token.id[1]}/${item.token.id}.jpg`" >
          </a>
          <span class="text-blue-dk">{{ item.original }}:</span> {{item.token.name}}
        </div>
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

  .scroll-y {
    overflow-y: scroll;
    height: 225px;
    > div {
      max-width: 50%;
    }
  }

</style>
