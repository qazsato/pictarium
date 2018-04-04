'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const gm = require('gm').subClass({imageMagick: true});

module.exports.resize = (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name;
  const Key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const fileName = Key.split('/')[Key.split('/').length - 1];
  const imageType = Key.match(/\.([^.]*)$/)[0];
  (async () => {
    const photo = await s3.getObject({Bucket, Key}).promise();
    const smallBuffer = await resizePhoto(240, 240, photo, imageType);
    const largeBuffer = await resizePhoto(1000, 1000, photo, imageType);
    await s3.putObject({Bucket, Key: `small/${fileName}`, Body: smallBuffer, ContentType: photo.ContentType}).promise();
    await s3.putObject({Bucket, Key: `large/${fileName}`, Body: largeBuffer, ContentType: photo.ContentType}).promise();
    callback(null, 'success');
  })()
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
