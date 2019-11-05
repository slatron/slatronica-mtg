<template>
  <div class="card-image-grid">
    <h5
      class="card-heading"
    >
      {{cardData.name || title}}

      <button
        v-if="username"
        v-on:click="editAlter(cardData._id)"
        class="edit-alter"
      >
        <icon-base icon-name="edit-icon"><EditIcon /></icon-base>
      </button>

      <button
        v-if="username"
        v-on:click="deleteAlter(cardData._id)"
        class="delete-alter"
      >
        <icon-base icon-name="trash-icon"><TrashIcon /></icon-base>
      </button>
    </h5>
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
        <img class="card" :src="imgUrl">
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import IconBase from '@/components/common/IconBase'
import EditIcon from '@/components/icons/edit-pencil'
import TrashIcon from '@/components/icons/trash'

export default {
  name: 'FlipCard',
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
  components: {
    IconBase,
    EditIcon,
    TrashIcon
  },
  computed: {
    username () {
      return this.$store.state.username
    }
  },
  created: function () {
    let vm = this
    api.get_scryfall_card(this.cardData.scryfall_id)
      .then(response => {
        let localUrl = ''
        if (response.data.card_faces) {
          let face = vm.cardData.face || 0 // default to front side
          vm.title = response.data.card_faces[face].name
          vm.imgUrl = response.data.card_faces[face].image_uris.normal
          localUrl = response.data.card_faces[face].illustration_id
        } else {
          vm.title = response.data.name
          vm.imgUrl = response.data.image_uris.normal
          localUrl = response.data.illustration_id
        };
        vm.localImg = require('@/assets/images/' + localUrl + '.jpg')
      })
      .catch(error => console.warn('OOPS: ', error))
  },
  methods: {
    flip: function () {
      this.flipped = !this.flipped
    },
    deleteAlter: function(id) {
      if (window.confirm('Confirm Delete')) {
        this.$store.dispatch('deleteAlter', {
          'id': id
        })
      }
    }
  }
}
</script>

<style scoped>
.card-heading {
  margin-bottom: 0.25em;
  text-align:left;
}
button {
  color: #a0aec0;
}
button:hover {
  color: #fff;
}
.delete-alter {
  float: right;
}
.edit-alter {
  font-size: 10px;
}
.card-image-grid {
  position: relative;
  display: inline-block;
  width: 300px;
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
</style>
