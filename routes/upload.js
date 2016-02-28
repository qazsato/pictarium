'use strict';

const express = require('express');
const router = express.Router();

const config = require('config');
const mongoose = require('mongoose');
const con = mongoose.connect(config.mongo_uri);
const db = con.connection;

router.post('/', (req, res, next) => {
  let Schema = mongoose.Schema;
  let pictureSchema = new Schema({
    data:String,
    date:Date
  });
  let Picture = mongoose.model('Picture', pictureSchema);
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

module.exports = router;
