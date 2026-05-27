const { validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const sendEmail = require("../middleware/sendEmails");

exports.signUp = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists, please use another email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "User created successfully",
    });

    sendEmail(
      email,
      "Welcome to Frambeg-Tech!",
      "SIGNUP SUCCESSFUL",
      `<p>Hello ${fullName},</p>
       <p>Welcome to Frambeg-Tech</p>
       <p>Shop Anything Tech at Affordable Prices with huge Discounts.</p>
       <img src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1712436345/PORTFOLIO/project_2_lef2ro.png" alt="Welcome Image" />`
    ).catch((emailError) => {
      console.error("Failed to send email:", emailError);
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.Login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
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
        userId: loadedUser._id.toString(),
        token: token,
      });
    })
    .catch((error) => {
      return res.status(401).json({
        message: "Email does not match",
        error: error,
      });
    });
};

exports.resetPasswordEmailVerification = (req, res, next) => {
  const email = req.body.email;
  crypto.randomBytes(32, (error, buffer) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    const token = buffer.toString("hex");
    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            message: "Incorrect email User not found",
          });
        }
        user.resetToken = token;
        user.resetTokenExpirationDate = Date.now() + 300000;
        return user.save();
      })
      .then((result) => {
        res.status(200).json({
          message: result.email,
        });

        return sendEmail(
          email,
          "Reset your password",
          `Hello`,
          `<p>We received a request to reset the password for the Frambeg-Tech account associated with ${email}.</p>
          <p>The link is only valid for 5 minutes</p>
          <p><a href="http://localhost:3000/ResetPassword/${token}" style="display: inline-block; background-color: blue; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset your password</a></p>
          <p>If you didn't make this request or if you're having trouble signing in, <a href="#">contact us via our support site.</a> No changes have been made to your account.</p>
          <p>The Frambeg-Tech team</p>`
        );
      })
      .catch((error) => {
        if (!res.headersSent) {
          res.status(500).json({
            message: "Internal server error",
            error: error.message,
          });
        }
      });
  });
};

exports.tokenValidation = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    resetToken: token,
    resetTokenExpirationDate: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "Invalid or expired token",
        });
      }
      res.status(200).json({
        message: "token is valid",
        userId: user._id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    });
};

exports.resetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const token = req.params.token;
  const newPassword = req.body.newPassword;
  const userId = req.body.userId;
  let resetUser;

  User.findOne({
    resetToken: token,
    _id: userId,
    resetTokenExpirationDate: { $gt: Date.now() },
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpirationDate = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Reset password successful",
      });
    })
    .catch((error) => {
      console.error("Error in resetting password: ", error.message);
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};

exports.VerifyToken = (req, res, next) => {
  res.status(200).json({
    message: "Authorized",
  });
};
