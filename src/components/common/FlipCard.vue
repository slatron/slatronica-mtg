<template>
  <div
    class="card-image-grid"
    v-bind:class="{'card-image-list': !galleryCard}"
  >
    <h5
      class="card-heading"
      v-show="this.galleryCard"
    >
      <span
        v-bind:class="{'hand': gallery_auth_user}"
        v-show="!editNameMode"
        v-on:click="editNameToggle()"
      >
        {{title}}
      </span>
      <form
        v-on:submit.prevent
        v-on:submit="handleEditName(cardData._id)"
        v-show="editNameMode">
        <input v-model="title">
      </form>
      <button
        v-if="gallery_auth_user"
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
import IconBase from '@/components/common/IconBase'
import TrashIcon from '@/components/icons/trash'

export default {
  name: 'FlipCard',
  props: {
    cardData: Object,
    galleryCard: Boolean
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
    TrashIcon
  },
  computed: {
    gallery_auth_user () {
      return this.$store.state.username && this.galleryCard
    }
  },
  created: function () {
    let localUrl = ''
    // Set view model name and local altered image
    if (this.cardData.layout === 'transform') {
      let face = this.cardData.face || 0 // default to front side
      this.title = this.cardData.custom_name || this.cardData.card_faces[face].name
      this.imgUrl = this.cardData.card_faces[face].image_uris.normal
      localUrl = this.cardData.card_faces[face].illustration_id
    } else {
      this.title = this.cardData.custom_name || this.cardData.name
      this.imgUrl = this.cardData.image_uris.normal
      localUrl =this.cardData.illustration_id
    };
    this.localImg = require('@/assets/images/' + localUrl + '.jpg')
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
      if (this.gallery_auth_user) {
        this.editNameMode = !this.editNameMode
      }
    },
    handleEditName: function(id) {
      this.$store.dispatch('putAlter', {
        'alter': {
          'id': id,
          'custom_name': this.title
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
.card-image-list {
  width: 250px;
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
