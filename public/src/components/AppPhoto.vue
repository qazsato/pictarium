<template>
  <div class="screen" v-loading="loading">
    <pic-header left-icon="chevron_left" :left-click="back" right-icon="refresh" :right-click="reload"></pic-header>
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
      loading: false,
      photos: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.loading = true;
      photo.get()
          .then((urls) => {
            this.loading = false;
            this.photos = urls;
          }).catch((e) => {
            this.loading = false;
            this.$message({message: '写真の取得に失敗しました。', type: 'error'});
          });
    },
    back() {
      this.$router.go(-1);
    },
    reload() {
      this.fetch();
    }
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

  .el-loading-spinner .path {
    stroke: #ff5555;
  }
</style>

<style lang="postcss" scoped>
  .screen {
    width: 100%;
    height: 100%;
  }

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

  img:hover {
    opacity: 0.8;
  }
</style>
