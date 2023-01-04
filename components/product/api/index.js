const express = require('express');
const router = express.Router();

const productApiController = require('./productApiController');

router.get('/', productApiController.getApiProducts);

module.exports = router;