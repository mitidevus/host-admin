const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const accountController = require("./accountController");

router.get("/", auth, accountController.list_accounts);
router.get("/detail/:id", auth, accountController.view_account_detail);

module.exports = router;
