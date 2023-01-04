const express = require('express');
const router = express.Router();

const categoryApiController = require('./categoryApiController');

router.get('/', categoryApiController.getApiCategories);

module.exports = router;