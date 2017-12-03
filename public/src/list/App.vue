<template>
  <div id="app">
    <header>
      <h1>pictarium</h1>
    </header>
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
  body {
    margin: 0;
    font-family: Avenir, "Helvetica Neue", Helvetica, Arial, Verdana, Roboto, "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "Meiryo UI", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif;
    background-color: #f9f7f7;
  }
</style>

<style lang="postcss" scoped>
  header {
    height: 60px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  h1 {
    margin: 0;
    color: #4c4c4c;
    font-size: 24px;
  }

  main {
    margin: 2px 0;
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
