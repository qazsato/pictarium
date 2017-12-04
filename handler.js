'use strict';

const fs = require('fs');

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
