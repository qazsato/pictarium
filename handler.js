'use strict';

const fs = require('fs');

module.exports.user = (event, context, callback) => {
  const html = fs.readFileSync('./views/user.html', 'utf-8')
  callback(null, {
    statusCode: 200,
    headers: {
      "content-type" : "text/html"
    },
    body: html
  });
}

module.exports.list = (event, context, callback) => {
  const html = fs.readFileSync('./views/list.html', 'utf-8')
  callback(null, {
    statusCode: 200,
    headers: {
      "content-type" : "text/html"
    },
    body: html
  });
}

module.exports.projector = (event, context, callback) => {
  const html = fs.readFileSync('./views/projector.html', 'utf-8')
  callback(null, {
    statusCode: 200,
    headers: {
      "content-type" : "text/html"
    },
    body: html
  });
}
