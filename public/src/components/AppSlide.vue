<template>
  <div class="photo-area">
    <transition name="fade" v-for="(photo, index) in photos" :key="photo">
      <img v-show="currentNumber == index" :src="photo" alt="">
    </transition>
  </div>
</template>

<script>
import Photo from '../scripts/Photo';
const photo = new Photo();

export default {
  name: 'app',
  data() {
    return {
      slideTimer: null,
      fetchTimer: null,
      photos: [],
      currentNumber: 0
    };
  },
  methods: {
    fetch() {
      photo.get('large').then((urls) => this.photos = urls);
    },
    slide() {
      if (this.currentNumber >= this.photos.length - 1) {
        this.currentNumber = 0;
      } else {
        this.currentNumber++;
      }
    }
  },
  mounted() {
    this.fetch();
    this.slideTimer = setInterval(this.slide, 10000);
    this.fetchTimer = setInterval(this.fetch, 10000);
  },
  destroyed() {
    clearInterval(this.slideTimer);
    clearInterval(this.fetchTimer);
  }
}
</script>

<style lang="postcss">
  @import '../styles/main.css';

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>

<style lang="postcss" scoped>
  .photo-area {
    height: 100%;
    width: 100%;
  }

  .photo-area img {
    display: block;
    margin: auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
