const express = require("express");
const isAuthenticated = require("../middleware/is-Authenticated");

const router = express.Router();

const cartController = require("../controllers/cartController");

router.get("/getCart/:userId", isAuthenticated, cartController.getCart);

router.post("/addToCart/:userId", isAuthenticated, cartController.addToCart);

router.post(
  "/removeProductFromCart/:userId",
  isAuthenticated,
  cartController.removeProductFromCart
);

router.post(
  "/removeProductFromCartCompletely/:userId",
  cartController.removeItemCompletely
);

module.exports = router;
