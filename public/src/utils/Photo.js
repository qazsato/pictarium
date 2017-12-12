const AWS = require('aws-sdk');
const REGION = 'ap-northeast-1';
const ALBUM_BUCKET_NAME = 'pictarium-photos';
const IDENTITY_POOL_ID = 'ap-northeast-1:e961eef1-1852-4238-968f-322ce60b3c90';

class Photo {
  constructor() {
    AWS.config.update({
      region: REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IDENTITY_POOL_ID
      })
    });
    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: ALBUM_BUCKET_NAME}
    });
  }
  upload(file) {
    return new Promise((resolve, reject) => {
      this.s3.upload({
        Key: `original/${Date.now()}${file.name}`,
        Body: file,
        ACL: 'public-read'
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
  get(albumPhotosKey = '') {
    return new Promise((resolve, reject) => {
      this.s3.listObjects({Prefix: albumPhotosKey}, function (err, data) {
        if (err) {
          reject(err);
        }
        const photoUrls = [];
        const href = this.request.httpRequest.endpoint.href;
        const bucketUrl = href + ALBUM_BUCKET_NAME + '/';
        data.Contents.map((photo) => {
          if (photo.Size > 0) {
            const photoUrl = bucketUrl + photo.Key;
            photoUrls.push(photoUrl);
          }
        });
        photoUrls.reverse();  // 新しい順にソート
        resolve(photoUrls);
      });
    });
  }
}

module.exports = Photo;
