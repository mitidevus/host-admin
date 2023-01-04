const express = require('express');
const router = express.Router();

const brandApiController = require('./brandApiController');

router.get('/', brandApiController.getApiBrands);

module.exports = router;