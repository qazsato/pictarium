const config = require('../../../config/aws.json');
const AWS = require('aws-sdk');

class Photo {
  constructor() {
    AWS.config.update({
      region: config.region,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.cognito.identify_pool_id
      })
    });
    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: {Bucket: config.s3.alubum_bucket}
    });
  }
  upload(file) {
    return new Promise((resolve, reject) => {
      this.s3.upload({
        Key: `original/${Date.now()}${file.name}`,
        Body: file,
        ACL: 'public-read'
      }, (err) => {
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
        const bucketUrl = href + config.s3.alubum_bucket + '/';
        data.Contents.map((photo) => {
          if (photo.Size > 0) {
            const photoUrl = bucketUrl + photo.Key;
            photoUrls.push(photoUrl);
          }
        });
        resolve(photoUrls);
      });
    });
  }
}

module.exports = Photo;
