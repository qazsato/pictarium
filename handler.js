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
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const fileName = srcKey.split('/')[srcKey.split('/').length - 1];
  const imageType = srcKey.match(/\.([^.]*)$/)[0];
  const dstKey = `small/${fileName}`;
  co(function *() {
    const photo = yield s3.getObject({Bucket, Key: srcKey}).promise();
    const resizedBuffer = yield resizePhoto(photo, imageType);
    yield s3.putObject({Bucket, Key: dstKey, Body: resizedBuffer, ContentType: photo.ContentType}).promise();
    callback(null, 'success');
  })
  .catch((e) => callback(e));
}

function resizePhoto(data, imageType) {
  const MAX_WIDTH  = 240;
  const MAX_HEIGHT = 240;
  return new Promise((resolve, reject) => {
    gm(data.Body)
      .autoOrient()
      .resize(MAX_WIDTH, MAX_HEIGHT)
      .toBuffer(imageType, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
  });
}
