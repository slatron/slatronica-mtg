<template>
  <div class="card-container">
    <div
      class="card-title"
      v-on:mouseover="show(true)"
      v-on:mouseout="show(false)"
    >
      {{title}} x{{cardData.quantity || 1}}
    </div>
    <img
      v-bind:src="imgUrl"
      v-show="visible"
      class="card-hover"
    >
  </div>
</template>

<script>
import axios;

export default {
  name: 'ListCard',
  props: ['cardData'],
  data: function() {
    let vm = this;
    axios.get('https://api.scryfall.com/cards/' + this.cardData.id)
      .then((response) => {
        vm.title = response.data.name;
        vm.imgUrl = response.data.image_uris.normal;
      })
      .catch((error) => {
        console.warn('OOPS: ',  error);
      });
    return {
      title: '',
      imgUrl: '',
      visible: false
    };
  },
  methods: {
    show: function(visible) {
      this.visible = visible;
    }
  }
}
</script>

<style>
</style>
