<template>
  <div class="screen">
    <pic-header action-icon="refresh" :action-click="clickAction"></pic-header>
    <main>
      <ul v-loading="loading">
        <li v-for="photo in photos" :key="photo">
          <img :data-src="photo" @click="clickPhoto(photo)" alt="" class="lazyload">
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import 'lazysizes';
import PicHeader from './Header.vue';
import Photo from '../scripts/Photo';
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
      photo.get('small')
          .then((urls) => {
            this.loading = false;
            this.photos = urls.reverse(); // 新しい順で格納する
          }).catch(() => {
            this.loading = false;
            this.$message({message: '写真の取得に失敗しました。', type: 'error'});
          });
    },
    back() {
      this.$router.go(-1);
    },
    clickAction() {
      this.fetch();
    },
    clickPhoto(url) {
      location.href = url.replace('/small/', '/original/');
    }
  }
}
</script>

<style lang="postcss">
  @import '../styles/main.css';

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
    padding-top: 60px;
    height: calc(100% - 60px);
  }

  ul {
    min-height: 100%;
    margin: 2px 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
    vertical-align: top;
    width: calc(100vw / 3);
    max-width: 240px;
    height: calc(100vw / 3);
    max-height: 240px;
  }

  img {
    width: 100%;
    height: 100%;
    padding: 2px;
    box-sizing: border-box;
    object-fit: cover;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.8;
  }
</style>
