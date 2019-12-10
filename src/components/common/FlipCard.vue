<template>
  <div class="card-image-grid">
    <h5
      class="card-heading"
      v-show="!this.cardOnly"
    >
      <span
        v-bind:class="{'hand': username}"
        v-show="!editNameMode"
        v-on:click="editNameToggle()"
      >
        {{cardData.name}}
      </span>
      <form v-on:submit="handleEditName(cardData._id)" v-show="editNameMode">
        <input v-model="cardData.name">
      </form>
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
    cardData: Object,
    cardOnly: Boolean
  },
  data: () => {
    return {
      title: '',
      imgUrl: '',
      flipped: false,
      localImg: '',
      editNameMode: false
    }
  },
  components: {
    IconBase,
    EditIcon,
    TrashIcon
  },
  computed: {
    username () {
      return this.$store.state.username && !this.cardOnly
    }
  },
  created: function () {
    let vm = this
    vm.cardData.name = vm.cardData.custom_name || vm.cardData.name || vm.title
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
    },
    editNameToggle: function(id) {
      if (this.username) {
        this.editNameMode = !this.editNameMode
      }
    },
    handleEditName: function(id) {
      this.$store.dispatch('putAlter', {
        'alter': {
          'id': id,
          'name': this.cardData.name
        }
      })
      this.editNameMode = false
    }
  }
}
</script>

<style scoped>
.card-heading {
  margin-bottom: 0.25em;
  text-align:left;
}
.card-heading > form {
  display: inline-block;
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
  padding-left: 0.5em;
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
