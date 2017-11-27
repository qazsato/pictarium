<template>
  <div id="app">
    <img v-show="uploadedImage" :src="uploadedImage"/>
    <input type="file" @change="onFileChange">
    <button @click="submitPhoto">送信</button>
  </div>
</template>

<script>
import AWS from 'aws-sdk';
import EXIF from 'exif-js';
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
      s3.upload({
        Key: this.file.name,
        Body: this.file,
        ACL: 'public-read'
      }, (err, data) => {
        if (err) {
          return alert('There was an error uploading your photo: ', err.message);
        }
        alert('Successfully uploaded photo.');
      });
    }
  }
}
</script>

<style scoped>

</style>


