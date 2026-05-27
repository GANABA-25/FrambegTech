const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminUsers = require("../models/adminUsers");

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const { name, email, password, phoneNumber, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Password does not match",
    });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const adminUsers = new AdminUsers({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
      });

      return adminUsers.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "User created Successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};

exports.Login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  AdminUsers.findOne({ email: email })
    .then((user) => {
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passwordMatch) => {
      if (!passwordMatch) {
        return res.status(401).json({
          message: "Incorrect Password",
        });
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "thisismyseretekayforjwt",
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token: token,
        userId: loadedUser._id.toString(),
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: "Email does not match",
        error: error,
      });
    });
};
