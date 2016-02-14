'use strict';

const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  // TODO 取得した画像データをmongodbに保存
  let data = req.body.data;
  res.send("OK");
});

module.exports = router;
