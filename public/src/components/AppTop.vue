<template>
  <div class="loading-area" v-loading="loading">
    <pic-header></pic-header>
    <main>
      <section v-show="uploadedImage">
        <img class="thumbnail" :src="uploadedImage"/>
        <div class="button-container">
          <el-button class="submit-button" @click="submitPhoto">写真を送る</el-button>
          <el-button class="cancel-button" @click="cancelPhoto">キャンセル</el-button>
        </div>
      </section>
      <camera-button :onSelectImage="selectImage" :is-show="isCameraButtonShow"></camera-button>
    </main>
  </div>
</template>

<script>
import PicHeader from './Header.vue';
import CameraButton from './CameraButton.vue';
import Photo from '../utils/Photo';
const photo = new Photo();

export default {
  name: 'app',
  components: {
    PicHeader,
    CameraButton
  },
  data() {
    return {
      loading: false,
      file: null,
      uploadedImage: null,
      isCameraButtonShow: true
    };
  },
  methods: {
    selectImage(file) {
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
        this.isCameraButtonShow = false;
      };
    },
    submitPhoto() {
      this.loading = true;
      photo.upload(this.file)
          .then(() => {
            this.$message({message: '写真をアップロードしました。', type: 'success'});
            this.loading = false;
            this.uploadedImage = null;
            this.isCameraButtonShow = true;
          })
          .catch((e) => {
            this.$message({message: '写真のアップロードに失敗しました。', type: 'error'});
            this.loading = false;
            this.uploadedImage = null;
            this.isCameraButtonShow = true;
          });
    },
    cancelPhoto() {
      this.uploadedImage = null;
      this.isCameraButtonShow = true;
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

  .el-message {
    top: 60px;
  }
</style>

<style lang="postcss" scoped>
  .loading-area {
    width: 100%;
    height: 100%;
  }

  main {
    margin: 20px;
  }

  .thumbnail {
    display: block;
    width: 80%;
    margin: 0 auto;
  }

  .button-container {
    margin: 20px 0;
    text-align: center;
  }

  .submit-button {
    color: #fff;
    border: 1px solid #ff5555;
    background-color: #ff5555;
  }

  .cancel-button {
    color: #c0bebe;
    border: 1px solid #c0bebe;
    background-color: #fff;
  }
</style>
