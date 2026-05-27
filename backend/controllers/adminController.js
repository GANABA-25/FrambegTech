const { validationResult } = require("express-validator");

const Products = require("../models/products");
const AdminUser = require("../models/adminUsers");

exports.postSingleProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const {
    productImage,
    productImage2,
    productName,
    description,
    price,
    category,
  } = req.body;
  let creator;
  const product = new Products({
    productImage,
    productImage2,
    productName,
    description,
    price,
    category,
    creator: req.userId,
  });

  product
    .save()
    .then((result) => {
      return AdminUser.findById(req.userId);
    })
    .then((user) => {
      creator = user;
      user.products.push(product);
      return user.save();
    })
    .then((result) => {
      console.log("Product created successfully");
      res.status(201).json({
        message: "Product created successfully",
      });
    })
    .catch((error) => {
      console.log("error from server", error);
      res.status(500).json({
        message: "Failed to save the product",
        error: error.message,
      });
    });
};

// exports.multipleProducts = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({
//       errors: errors.array(),
//     });
//   }
//   const productsArray = req.body;
//   let creator;
//   Promise.all(
//     productsArray.map((productData) => {
//       const { productImage, productImage2, productName, description, price } =
//         productData;

//       const product = new Products({
//         productImage,
//         productImage2,
//         productName,
//         description,
//         price,
//         creator: req.userId,
//       });
//       return product.save();
//     })
//   )
//     .then((result) => {
//       return User.findById(req.userId);
//     })
//     .then((user) => {
//       creator = user;
//       user.products.push(product);
//       return user.save();
//     })
//     .then((results) => {
//       console.log("ProductsArray created successfully");
//       res.status(201).json({
//         message: "ProductsArray created successfully",
//         products: results,
//       });
//     })
//     .catch((error) => {
//       console.error("Failed to save productsArray", error);
//       res.status(500).json({
//         message: "Failed to save the productsArray",
//         error: error.message,
//       });
//     });
// };
exports.multipleProducts = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  const productsArray = req.body;

  // Array to hold saved products
  let savedProducts = [];

  Promise.all(
    productsArray.map((productData) => {
      const {
        productImage,
        productImage2,
        productName,
        description,
        price,
        category,
      } = productData;
      const product = new Products({
        productImage,
        productImage2,
        productName,
        description,
        price,
        category,
        creator: req.userId,
      });
      return product.save().then((savedProduct) => {
        savedProducts.push(savedProduct);
        return savedProduct;
      });
    })
  )
    .then(() => {
      return AdminUser.findById(req.userId);
    })
    .then((user) => {
      user.products.push(...savedProducts.map((product) => product._id)); // Assuming products is an array of product IDs
      return user.save();
    })
    .then(() => {
      console.log("ProductsArray created successfully");
      res.status(201).json({
        message: "ProductsArray created successfully",
        products: savedProducts,
      });
    })
    .catch((error) => {
      console.error("Failed to save productsArray", error);
      res.status(500).json({
        message: "Failed to save the productsArray",
        error: error.message,
      });
    });
};

exports.updateProduct = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "No Product found",
      });
    }

    if (product.creator.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    const {
      productImage,
      productImage2,
      productName,
      description,
      price,
      category,
    } = req.body;

    product.productImage = productImage;
    product.productImage2 = productImage2;
    product.productName = productName;
    product.description = description;
    product.price = price;
    product.category = category;

    console.log("updatedProduct", product);
    const updatedProduct = await product.save();

    return res.status(200).json({
      message: "Product updated successfully",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Products.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.creator.toString() !== req.userId) {
        return res.status(403).json({
          message: "Not Authorized",
        });
      }

      return Products.findByIdAndDelete(productId);
    })
    .then((result) => {
      return AdminUser.findById(req.userId);
    })
    .then((user) => {
      user.products.pull(productId);
      return user.save();
    })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json({
        message: "Product Deleted Successfully",
      });
    })
    .catch((error) => {
      if (!res.headersSent) {
        res.status(500).json({
          message: "Internal server error",
          error: err,
        });
      }
    });
};
