const User = require("../models/users");

exports.getCart = (req, res, next) => {
  const userId = req.params.userId;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user not found",
        });
      }
      return res.status(200).json({
        cart: user.cart,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error!!!",
        error: error,
      });
    });
};

exports.addToCart = (req, res, next) => {
  const userId = req.params.userId;
  const { productId, price, totalPrice, quantity, productImage, description } =
    req.body;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const existingItemIndex = user.cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (existingItemIndex >= 0) {
        user.cart.items[existingItemIndex].quantity += quantity;
        user.cart.items[existingItemIndex].totalPrice += price * quantity;
      } else {
        user.cart.items.push({
          productId,
          price,
          quantity,
          totalPrice,
          productImage,
          description,
        });
      }
      user.cart.subtotal += price * quantity;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "product added to cart",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "internal server error",
        error: error,
      });
    });
};

exports.removeProductFromCart = (req, res, next) => {
  const userId = req.params.userId;
  const { productId, price, quantity } = req.body;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const existingItemIndex = user.cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex >= 0) {
        const item = user.cart.items[existingItemIndex];
        item.quantity -= quantity;
        item.totalPrice -= price * quantity;
        user.cart.subtotal -= price * quantity;

        if (item.quantity <= 0) {
          user.cart.items.splice(existingItemIndex, 1);
        }

        return user.save().then(() => {
          res.status(200).json({
            message: "Product removed from cart",
          });
        });
      } else {
        return res.status(404).json({
          message: "Item not found in cart",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};

exports.removeItemCompletely = (req, res, next) => {
  const userId = req.params.userId;
  const { productId, price, quantity } = req.body;

  User.findOne({ _id: userId })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const existingItemIndex = user.cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex >= 0) {
        const item = user.cart.items[existingItemIndex];
        item.quantity -= quantity;
        item.totalPrice -= price * quantity;
        user.cart.subtotal -= price * quantity;

        if (item.quantity <= 0) {
          user.cart.items.splice(existingItemIndex, 1);
        }

        return user.save().then(() => {
          res.status(200).json({
            message: "Product removed from cart",
          });
        });
      } else {
        return res.status(404).json({
          message: "Item not found in cart",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};
