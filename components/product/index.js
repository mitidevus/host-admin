const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const productController = require("./productController");

router.get("/", auth, productController.list_product);

router.get("/add", auth, productController.add_product_get);

router.post("/add", auth, productController.add_product_post);

router.get("/update/:id", auth, productController.update_product_get);

router.post("/update/:id", auth, productController.update_product_post);

router.get("/delete/:id", auth, productController.delete_product);

module.exports = router;

