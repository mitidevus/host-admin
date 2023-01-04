const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const orderController = require("./orderController");

router.get("/", auth, orderController.list_orders);

router.get("/:id", auth, orderController.detail_order);

router.get("/accept/:id", auth, orderController.accept_order);

router.get("/pending/:id", auth, orderController.pending_order);

router.get("/cancel/:id", auth, orderController.cancel_order);

module.exports = router;
