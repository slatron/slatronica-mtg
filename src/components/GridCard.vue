<template>
  <div
    class="card-image card-image-grid"
    v-on:click="flip()"
    v-bind:class="{ 'flipped': flipped }"
  >
    <div class="card-altered">
      <img v-if="localUrl"  class="card" :src="localUrl">
      <img v-if="!localUrl" class="card" :src="imgUrl">
    </div>
    <div class="card-original">
      <img class="card" v-bind:src="imgUrl">
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GridCard',
  props: ['cardData'],
  data: function() {
    return {
      id: '',
      title: '',
      imgUrl: '',
      flipped: false,
      localUrl: ''
    };
  },
  created: function() {
    let vm = this;
    axios.get('https://api.scryfall.com/cards/' + this.cardData.id)
      .then((response) => {
        if (response.data.card_faces && vm.cardData.hasOwnProperty('face')) {
          vm.title  = response.data.card_faces[vm.cardData.face].name;
          vm.imgUrl = response.data.card_faces[vm.cardData.face].image_uris.normal;
          vm.id     = response.data.card_faces[vm.cardData.face].illustration_id
        } else {
          vm.title  = response.data.name;
          vm.imgUrl = response.data.image_uris.normal;
          vm.id     = response.data.id
        };
        vm.localUrl = require('@/assets/images/' + this.id + '.jpg');
      })
      .catch((error) => {
        console.warn('OOPS: ',  error);
      });
  },
  methods: {
    flip: function() {
      this.flipped = !this.flipped;
    }
  }
}
</script>

<style scoped>
.card-image-grid {
  display: inline-block;
  width: 250px;
  height: 344px;
  margin: 1em;
}
.card-image {
  transform-style: preserve-3d;
  transition: transform 200ms;
}
.card-altered {
  transform: rotateY(0deg);
}
.card-original {
  transform: rotateY(180deg);
}
.card-altered,
.card-original {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.card-image .card {
  transition: transform 200ms;
  border-radius: 4.75% / 3.5%;
  color: #000;
  display: block;
  overflow: hidden;
  text-align: center;
}
.card-image.flipped {
  transform: rotateY(-180deg);
}
</style>
