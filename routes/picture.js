'use strict';

const express = require('express');
const router = express.Router();

const config = require('config');
const mongoose = require('mongoose');
const con = mongoose.connect(config.mongo_uri);
const db = con.connection;

const Schema = mongoose.Schema;
const pictureSchema = new Schema({data:String, date:Date});
const Picture = mongoose.model('Picture', pictureSchema);

/**
 * DBに写真を登録します。
 */
router.post('/regist', (req, res, next) => {
  let picture = new Picture();
  picture.data = req.body.src;
  picture.date = new Date();
  picture.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send("OK");
    }
  });
});

/**
 * DBに登録されている写真を取得します。
 */
router.get('/get', function (req, res) {
  Picture.find(function (err, pictures) {
    if (err) return console.error(err);
    var array = [];
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].data) {
        array.push(pictures[i].data);
      }
    }
    res.send(array);
  });
});

module.exports = router;
