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

<style>
  html,body {
    color: white;
    background-color: rgb(63,81,181);
  }

  .none {
    display: none;
  }

  .mdl-button--raised {
    background: white;
  }

  #intro-area {
    padding: 20px 0;
    text-align: center;
  }

  #intro-area h3 {
    margin: 24px 20px;
  }

  #intro-area .material-icons {
    font-size: 300px;
  }

  #picture-area {
    padding: 20px 0;
    text-align: center;
  }

  #picture-area .picture-background {
    padding: 20px 0 10px 0;
  }

  #picture-area .spinner {
    visibility: hidden;
  }

  #picture-area .mdl-button {
    width: 120px;
    margin: 10px 15px 60px 15px;
  }

  #thanks-area {
    padding: 20px 0;
    text-align: center;
  }

  #thanks-area h3 {
    margin: 24px 20px;
  }

  #thanks-area .material-icons {
    font-size: 300px;
  }

  #camera-area {
    width: 100%;
    position: absolute;
    bottom: 5%;
    text-align: center;
  }

  #camera-btn {
    position: relative;
  }

  #image-file {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    height: 100%;
    width:  100%;
    opacity: 0;
  }

  @-webkit-keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes fadeOutUp {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }

  .fadeOutUp {
    -webkit-animation-name: fadeOutUp;
    animation-name: fadeOutUp;
  }
</style>
