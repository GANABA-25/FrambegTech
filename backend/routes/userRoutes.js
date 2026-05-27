const express = require("express");
const { body } = require("express-validator");
const isAuthenticated = require("../middleware/is-Authenticated");

const router = express.Router();

const userController = require("../controllers/userController");

router.post(
  "/signup",
  [
    body("fullName").trim().notEmpty().withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is required and must be valid"),

    body("password")
      .trim()
      .isLength({ min: 7 })
      .withMessage("Password Length should More than Seven")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[\W_]/)
      .withMessage("Password must contain at least one special character"),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  userController.signUp
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is required and must be valid"),

    body("password").trim().isEmpty().withMessage("Password is Required"),
  ],
  userController.Login
);

router.get("/tokenValidation/:token", userController.tokenValidation);

router.post(
  "/resetPasswordEmailValidation",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is required and must be valid"),
  ],
  userController.resetPasswordEmailVerification
);

router.post(
  "/resetPassword/:token",
  [
    body("newPassword")
      .trim()
      .isLength({ min: 7 })
      .withMessage("Password Length should More than Seven")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[\W_]/)
      .withMessage("Password must contain at least one special character"),

    body("confirmPassword")
      .trim()
      .isLength({ min: 7 })
      .withMessage("Password Length should More than Seven")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[\W_]/)
      .withMessage("Password must contain at least one special character"),
  ],
  userController.resetPassword
);

router.post("/Authentication", isAuthenticated, userController.VerifyToken);

module.exports = router;
