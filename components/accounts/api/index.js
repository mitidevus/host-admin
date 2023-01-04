const express = require("express");
const router = express.Router();

const accountController = require("../accountController");

router.get("/", accountController.get_accounts);
router.get("/ban/:id", accountController.ban_handle);

module.exports = router;
