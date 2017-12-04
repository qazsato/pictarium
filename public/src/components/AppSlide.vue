<template>
  <el-carousel trigger="click">
    <el-carousel-item v-for="photo in photos" :key="photo">
      <div class="photo-area">
        <img :src="photo" alt="">
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import PicHeader from './Header.vue';
import Photo from '../Photo';
const photo = new Photo();

export default {
  name: 'app',
  data() {
    return {
      photos: []
    };
  },
  mounted() {
    photo.get().then((urls) => this.photos = urls);
  }
}
</script>

<style lang="postcss">
  html {
    height: 100%;
  }

  body {
    height: 100%;
    margin: 0;
    font-family: Avenir, "Helvetica Neue", Helvetica, Arial, Verdana, Roboto, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "Meiryo UI", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
    background-color: #f9f7f7;
  }

  #app {
    height: 100%;
  }

  .el-carousel__container {
    height: 100%;
  }
</style>

<style lang="postcss" scoped>
  .el-carousel {
    height: 100%;
  }

  .photo-area {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .photo-area img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
