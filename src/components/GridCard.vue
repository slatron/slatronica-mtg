<template>
  <div class="card-image-grid">
    <div
      class="card-image"
      v-on:click="flip()"
      v-bind:class="{ 'flipped': flipped }"
    >
      <div class="card-altered">
        <img v-if="localImg"  class="card" :src="localImg">
        <img v-if="!localImg" class="card" :src="imgUrl">
      </div>
      <div class="card-original">
        <img class="card" v-bind:src="imgUrl">
      </div>
    </div>
    <h5>{{title}}</h5>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GridCard',
  props: {
    cardData: Object
  },
  data: () => {
    return {
      title: '',
      imgUrl: '',
      flipped: false,
      localImg: ''
    }
  },
  created: function () {
    let vm = this
    axios.get('https://api.scryfall.com/cards/' + this.cardData.id)
      .then((response) => {
        let localUrl = ''
        if (response.data.card_faces && vm.cardData.hasOwnProperty('face')) {
          vm.title = response.data.card_faces[vm.cardData.face].name
          vm.imgUrl = response.data.card_faces[vm.cardData.face].image_uris.normal
          localUrl = response.data.card_faces[vm.cardData.face].illustration_id
        } else {
          vm.title = response.data.name
          vm.imgUrl = response.data.image_uris.normal
          localUrl = response.data.illustration_id
        };
        vm.localImg = require('@/assets/images/' + localUrl + '.jpg')
      })
      .catch((error) => {
        console.warn('OOPS: ', error)
      })
  },
  methods: {
    flip: function () {
      this.flipped = !this.flipped
    }
  }
}
</script>

<style scoped>
.card-image-grid {
  position: relative;
  display: inline-block;
  width: 250px;
  height: 344px;
  margin: 2em;
}
.card-image {
  transform-style: preserve-3d;
  transition: transform 250ms;
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
  cursor: pointer;
  transition: transform 250ms;
  border-radius: 4.75% / 3.5%;
  color: #000;
  display: block;
  overflow: hidden;
  text-align: center;
}
.card-image.flipped {
  transform: rotateY(-180deg);
}
h5 {
  position: absolute;
  bottom: -60px;
  font-size: 16px;
}
</style>
