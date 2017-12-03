<template>
  <div id="app" v-loading="loading">
    <header>
      <h1>pictarium</h1>
    </header>
    <main>
      <section v-show="uploadedImage">
        <img class="thumbnail" :src="uploadedImage"/>
        <div class="button-container">
          <el-button class="submit-button" @click="submitPhoto">写真を送る</el-button>
          <el-button class="cancel-button" @click="cancelPhoto">キャンセル</el-button>
        </div>
      </section>
      <el-button id="camera-button" :class="{'slide-in-up':isCameraButtonShow === true, 'slide-in-down':isCameraButtonShow === false}">
        <div class="camera-text">撮影する</div>
        <i class="camera-icon material-icons">photo_camera</i>
        <input type="file" @change="onFileChange">
      </el-button>
    </main>
  </div>
</template>

<script>
import AWS from 'aws-sdk';
const ALBUM_BUCKET_NAME = 'pictarium-photos';
AWS.config.update({
  region: 'ap-northeast-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'ap-northeast-1:e961eef1-1852-4238-968f-322ce60b3c90'
  })
});
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: ALBUM_BUCKET_NAME}
});

export default {
  name: 'app',
  data() {
    return {
      loading: false,
      uploadedImage: null,
      isCameraButtonShow: true
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0] || e.dataTransfer.files[0];
      this.createImage(this.file);
      this.isCameraButtonShow = false;
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    submitPhoto() {
      this.loading = true;
      s3.upload({
        Key: this.file.name,
        Body: this.file,
        ACL: 'public-read'
      }, (err, data) => {
        this.loading = false;
        if (err) {
          return alert('There was an error uploading your photo: ', err.message);
        }
        alert('Successfully uploaded photo.');
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
  html,
  body {
    margin: 0;
    height: 100%;
  }

  .slide-in-up,
  .slide-in-down {
    animation-duration: .3s;
    animation-fill-mode: both;
  }

  @keyframes slide-in-up {
    from {
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }
  }

  .slide-in-up {
    animation-name: "slide-in-up";
  }

  @keyframes slide-in-down {
    from {
      transform: translate3d(0, 0, 0);
      visibility: visible;
    }

    to {
      transform: translate3d(0, 100%, 0);
      visibility: hidden;
    }
  }

  .slide-in-down {
    animation-name: "slide-in-down";
  }
</style>

<style lang="postcss" scoped>
  #app {
    height: 100%;
  }

  header {
    height: 60px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    margin: 20px;
  }

  h1 {
    margin: 0;
    color: #4c4c4c;
    font-size: 24px;
  }

  .thumbnail {
    width: 100%;
    margin-bottom: 15px;
  }

  .button-container {
    text-align: center;
  }

  .submit-button {
    color: #ff5555;
    border: 1px solid #ff5555;
    background-color: #fff;
  }

  .cancel-button {
    color: #2E2E2E;
    border: 1px solid #c0bebe;
    background-color: #fff;
  }

  #camera-button {
    position: absolute;
    bottom: 8px;
    right: 8px;
    height: 80px;
    width: 80px;
    padding: 0;
    border: none;
    border-radius: 50%;
    color: #fff;
    background-color: #ff5555;
  }

  #camera-button:hover {
    background-color: #ff2222;
  }

  .camera-text {
    margin: 10px 0 5px 0;
    font-size: 13px;
  }

  .camera-icon {
    font-size: 30px;
  }

  #camera-button input[type=file] {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    width:  100%;
    opacity: 0;
  }
</style>
