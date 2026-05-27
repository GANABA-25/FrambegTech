const Products = require("../models/products");

exports.getSingleProduct = (req, res, next) => {
  const productId = req.params.productId;
  Products.findById(productId)
    .then((product) => {
      if (!productId) {
        return res.status(404).json({
          message: "Product was not found",
        });
      }
      res.status(200).json({
        message: "fetched Products",
        product: product,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "product does not exit",
        error: error,
      });
    });
};

exports.getAllProducts = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 12;
  let totalProducts;

  Products.find()
    .countDocuments()
    .then((count) => {
      totalProducts = count;
      return Products.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        return res.status(404).json({
          message: "No Products are  Available",
        });
      }
      res.status(200).json({
        message: "Products Fetched successfully",
        products: products,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / perPage),
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Products Failed",
        error: error,
      });
    });
};

exports.getHomeApplianceProducts = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 12;
  let totalProducts;

  const category = req.params.category;
  Products.find({ category: category })
    .countDocuments()
    .then((count) => {
      totalProducts = count;
      return Products.find({ category: category })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        res.status(404).json({
          message: "No Products are Available",
        });
      }

      res.status(200).json({
        message: "HomeAppliance Products Fetched successfully",
        products: products,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / perPage),
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching HomeAppliance Products Failed",
        error: error,
      });
    });
};

exports.getAudionAndVideo = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 12;
  let totalProducts;

  const category = req.params.category;
  Products.find({ category: category })
    .countDocuments()
    .then((count) => {
      totalProducts = count;
      return Products.find({ category: category })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        res.status(404).json({
          message: "No Products are Available",
        });
      }

      res.status(200).json({
        message: "Audio&Video Products fetched successfully",
        products: products,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / perPage),
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Audio&Video Products Failed",
        error: error,
      });
    });
};

exports.getRefrigerator = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 12;
  let totalProducts;

  const category = req.params.category;
  Products.find({ category: category })
    .countDocuments()
    .then((count) => {
      totalProducts = count;
      return Products.find({ category: category })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        res.status(404).json({
          message: "No Products are Available",
        });
      }

      res.status(200).json({
        message: "Refrigerator Products fetched successfully",
        products: products,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / perPage),
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Refrigerator Products Failed",
        error: error,
      });
    });
};

exports.getNewArrivalProducts = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 12;
  let totalProducts;

  const category = req.params.category;

  Products.findOne({ category: category })
    .countDocuments()
    .then((count) => {
      totalProducts = count;
      return Products.find({ category: category })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        return res.status(401).json({
          message: "No Products are Available",
        });
      }

      res.status(200).json({
        message: "New Arrivals Products fetched successfully",
        products: products,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / perPage),
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching NewArrivals Products Failed",
        error: error,
      });
    });
};

exports.getBestDealsProducts = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 12;
  let totalProducts;

  const category = req.params.category;

  Products.findOne({ category: category })
    .countDocuments()
    .then((count) => {
      totalProducts = count;
      return Products.find({ category: category })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        return res.status(401).json({
          message: "No Products are Available",
        });
      }

      res.status(200).json({
        message: "Best Deals Products fetched successfully",
        products: products,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / perPage),
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Best Deals Products Failed",
        error: error,
      });
    });
};

exports.getRelatedProducts = (req, res, next) => {
  const category = req.params.category;

  Products.find({ category })
    .limit(3)
    .then((products) => {
      if (!products || products.length === 0) {
        return res.status(404).json({
          message: "No products found!",
        });
      }
      res.status(200).json({
        relatedProducts: products,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};

exports.getSearchedProducts = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 12;
  let totalProducts;
  const { searchedTerm } = req.query;

  Products.find({ productName: { $regex: searchedTerm, $options: "i" } })
    .countDocuments()
    .then((count) => {
      totalProducts = count;
      return Products.find({
        productName: { $regex: searchedTerm, $options: "i" },
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((products) => {
      if (!products) {
        return res.status(404).json({
          message: "No Products match the searchTerm",
          searchedTerm: searchedTerm,
        });
      }
      return res.status(200).json({
        products: products,
        totalProducts: totalProducts,
        totalPages: Math.ceil(totalProducts / perPage),
        currentPage: currentPage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Internal server error",
        error: error,
      });
    });
};
