const express = require("express");

const { productValidationRules } = require("../middleware/validator");
const isAuthenticated = require("../middleware/is-Authenticated");

const router = express.Router();

const adminController = require("../controllers/adminController");

router.post(
  "/singleProducts",
  isAuthenticated,
  productValidationRules,
  adminController.postSingleProduct
);

router.post(
  "/multipleProducts",
  isAuthenticated,
  adminController.multipleProducts
);

router.put(
  "/updateProduct/:productId",
  isAuthenticated,
  productValidationRules,
  adminController.updateProduct
);

router.delete(
  "/deleteProduct/:productId",
  isAuthenticated,
  adminController.deleteProduct
);

module.exports = router;
