'use strict';

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const co = require('co');
const gm = require('gm').subClass({imageMagick: true});

module.exports.app = (event, context, callback) => {
  const html = fs.readFileSync('./views/index.html', 'utf-8')
  callback(null, {
    statusCode: 200,
    headers: {
      'content-type' : 'text/html'
    },
    body: html
  });
}

module.exports.resize = (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const fileName = Key.split('/')[Key.split('/').length - 1];
  const imageType = Key.match(/\.([^.]*)$/)[0];
  co(function *() {
    const photo = yield s3.getObject({Bucket, Key}).promise();
    const smallBuffer = yield resizePhoto(240, 240, photo, imageType);
    const largeBuffer = yield resizePhoto(1000, 1000, photo, imageType);
    yield s3.putObject({Bucket, Key: `small/${fileName}`, Body: smallBuffer, ContentType: photo.ContentType}).promise();
    yield s3.putObject({Bucket, Key: `large/${fileName}`, Body: largeBuffer, ContentType: photo.ContentType}).promise();
    callback(null, 'success');
  })
  .catch((e) => callback(e));
}

function resizePhoto(width, height, data, imageType) {
  return new Promise((resolve, reject) => {
    gm(data.Body)
      .autoOrient()
      .resize(width, height)
      .toBuffer(imageType, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
  });
}
