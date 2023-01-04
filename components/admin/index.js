const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const adminController = require("./adminController");

router.get("/", auth, adminController.account_profile);

router.get('/edit', auth, adminController.account_show_edit_profile);
router.post('/edit', auth, adminController.account_edit_profile);

module.exports = router;