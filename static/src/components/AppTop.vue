<template>
  <div class="screen" v-loading="loading">
    <pic-header action-icon="apps" :action-click="clickAction"></pic-header>
    <main>
      <section v-if="uploadedImages.length > 0" class="photo-area">
        <img v-for="images in uploadedImages" :key="images" :src="images" class="thumbnail"/>
        <div class="button-container">
          <el-button class="submit-button" @click="submitPhoto">写真を送る</el-button>
          <el-button class="cancel-button" @click="cancelPhoto">キャンセル</el-button>
        </div>
      </section>
      <section v-else class="intro-area">
        <h2>Title</h2>
        <p>text text text text text</p>
      </section>
      <camera-button :onSelectImage="selectImage" :is-show="isCameraButtonShow"></camera-button>
    </main>
  </div>
</template>

<script>
import PicHeader from './Header.vue';
import CameraButton from './CameraButton.vue';
import Photo from '../scripts/Photo';
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
      files: [],
      uploadedImages: [],
      isCameraButtonShow: true
    };
  },
  methods: {
    selectImage(files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => this.uploadedImages.push(e.target.result);
        this.files.push(file);
      }
      this.isCameraButtonShow = false;
    },
    submitPhoto() {
      this.loading = true;
      const promises = this.files.map((file) => photo.upload(file));
      Promise
        .all(promises)
        .then(() => {
          this.$message({message: '写真をアップロードしました。', type: 'success'});
          this.resetData();
        })
        .catch(() => {
          this.$message({message: '写真のアップロードに失敗しました。', type: 'error'});
          this.resetData();
        });
    },
    cancelPhoto() {
      this.resetData();
    },
    clickAction() {
      this.$router.push('photo');
    },
    resetData() {
      this.loading = false;
      this.files = [];
      this.uploadedImages = [];
      this.isCameraButtonShow = true;
    }
  }
}
</script>

<style lang="postcss">
  @import '../styles/main.css';

  .el-loading-spinner .path {
    stroke: #ff5555;
  }

  .el-message {
    top: 60px;
  }
</style>

<style lang="postcss" scoped>
  .screen {
    width: 100%;
    height: 100%;
  }

  main {
    padding-top: 60px;
  }

  .intro-area {
    margin-top: 70px;
    text-align: center;
  }

  .thumbnail {
    display: block;
    width: 70%;
    max-width: 600px;
    margin: 20px auto;
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
