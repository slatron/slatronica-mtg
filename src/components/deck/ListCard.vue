<template>
  <div class="card-container py-1 text-lg">
    <div
      class="card-title"
      v-on:mouseover="show(true)"
      v-on:mouseout="show(false)"
    >
      {{cardData.quantity || 1}} | {{title}}
      <span
        class="inline-block md:invisible text-gray-600 border-gray-500 hover:text-white hover:border-white">
        <icon-base icon-name="view-show"><ViewShow /></icon-base>
      </span>
    </div>
    <img
      v-bind:src="imgUrl"
      v-show="visible"
      class="card-hover"
    >
  </div>
</template>

<script>
import api from '@/api/api'
import IconBase from '@/components/IconBase'
import ViewShow from '@/components/icons/view-show'

export default {
  name: 'ListCard',
  props: {
    cardData: Object
  },
  components: {
    IconBase,
    ViewShow
  },
  data: function() {
    let vm = this;
    api.get_scryfall_card(this.cardData.id)
      .then(response => {
        vm.title  = response.data.name;
        vm.imgUrl = response.data.image_uris.normal;
      })
      .catch(error => console.warn('OOPS: ',  error))
    return {
      title: '',
      imgUrl: '',
      visible: false
    };
  },
  methods: {
    show: function(visible) {
      this.visible = visible
    }
  }
}
</script>

<style scoped>
  .card-container {
    position: relative;
    cursor: pointer;
  }
  .card-hover {
    position: absolute;
    top: 30px;
    left: 10px;
    z-index: 100000;
    width: 300px;
  }
</style>
