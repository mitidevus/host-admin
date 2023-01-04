const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const categoryController = require("./categoryController");

router.get("/", auth, categoryController.list_category);

router.get("/add", auth, categoryController.show_add_category);
router.post("/add", auth, categoryController.add_category);

router.get("/edit/:id", auth, categoryController.show_edit_category);
router.post("/edit", auth, categoryController.edit_category);

module.exports = router;
