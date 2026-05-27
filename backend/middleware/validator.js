const { body } = require("express-validator");

const productValidationRules = [
  body("productImage")
    .trim()
    .isURL()
    .withMessage("Product image URL is invalid")
    .custom((value) => {
      if (!/\.(jpg|jpeg|png|gif)$/i.test(value)) {
        throw new Error(
          "URL must point to an image file (jpg, jpeg, png, gif)"
        );
      }
      return true;
    }),
  body("productImage2")
    .trim()
    .isURL()
    .withMessage("Second product image URL is invalid")
    .custom((value) => {
      if (!/\.(jpg|jpeg|png|gif)$/i.test(value)) {
        throw new Error(
          "URL must point to an image file (jpg, jpeg, png, gif)"
        );
      }
      return true;
    }),
  body("productName")
    .trim()
    .isLength({ max: 40 })
    .withMessage("Product name length must not exceed 40 characters"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Product description is required"),
  body("price")
    .trim()
    .isFloat({ gt: 0 })
    .withMessage("Product price must be a positive number"),
  body("category")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Product category is required"),
];

module.exports = { productValidationRules };
