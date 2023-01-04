const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const brandController = require("./brandController");

router.get("/", auth, brandController.list_brand);

router.get("/add", auth, brandController.show_add_brand);
router.post("/add", auth, brandController.add_brand);

router.get("/edit/:id", auth, brandController.show_edit_brand);
router.post("/edit", auth, brandController.edit_brand);


module.exports = router;
