<template>
  <div id="app" v-loading="loading">
    <img v-show="uploadedImage" :src="uploadedImage"/>
    <el-button id="camera-button" type="primary">
      <span>カメラ</span>
      <input type="file" @change="onFileChange">
    </el-button>
    <el-button @click="submitPhoto">送信</el-button>
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
      uploadedImage: '',
    };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0] || e.dataTransfer.files[0];
      this.createImage(this.file);
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
    }
  }
}
</script>

<style lang="postcss">
  html,
  body {
    height: 100%;
  }
</style>

<style lang="postcss" scoped>
  #app {
    height: 100%;
  }

  #camera-button {
    position: relative;
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
