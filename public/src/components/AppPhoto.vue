<template>
  <div>
    <pic-header></pic-header>
    <main>
      <ul>
        <li v-for="photo in photos" :key="photo">
          <a :href="photo">
            <img :src="photo" alt="">
          </a>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import PicHeader from './Header.vue';
import Photo from '../utils/Photo';
const photo = new Photo();

export default {
  name: 'app',
  components: {
    PicHeader
  },
  data() {
    return {
      photos: []
    };
  },
  mounted() {
    photo.get()
        .then((urls) => {
          this.photos = urls;
        }).catch((e) => {
          this.$message({message: '写真の取得に失敗しました。', type: 'error'});
        });
  }
}
</script>

<style lang="postcss">
  body {
    margin: 0;
    font-family: Avenir, "Helvetica Neue", Helvetica, Arial, Verdana, Roboto, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "Meiryo UI", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
    background-color: #f9f7f7;
  }

  #app {
    height: 100%;
  }
</style>

<style lang="postcss" scoped>
  main {
    margin: 2px 0;
    padding-top: 60px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
    vertical-align: top;
    width: calc(100vw / 3);
    height: calc(100vw / 3);
  }

  img {
    width: 100%;
    height: 100%;
    padding: 2px;
    box-sizing: border-box;
    object-fit: cover;
  }
</style>
