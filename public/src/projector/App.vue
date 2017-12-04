<template>
  <div id="app">
    <el-carousel trigger="click">
      <el-carousel-item v-for="photo in photos" :key="photo">
        <div class="photo-area">
          <img :src="photo" alt="">
        </div>
      </el-carousel-item>
    </el-carousel>
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
      photos: []
    };
  },
  mounted() {
    const self = this;
    const albumPhotosKey = '';
    s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
      if (err) {
        return alert('There was an error viewing your album: ' + err.message);
      }
      const href = this.request.httpRequest.endpoint.href;
      const bucketUrl = href + ALBUM_BUCKET_NAME + '/';
      data.Contents.map((photo) => {
        if (photo.Size > 0) {
          const photoKey = photo.Key;
          const photoUrl = bucketUrl + encodeURIComponent(photoKey);
          self.photos.push(photoUrl);
        }
      });
    });
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

  .el-carousel__container {
    height: 100%;
  }
</style>

<style lang="postcss" scoped>
  #app {
    height: 100%;
  }

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
