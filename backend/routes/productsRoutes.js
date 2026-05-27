const express = require("express");

const router = express.Router();

const productsController = require("../controllers/productsController");

router.get("/singleProducts", productsController.getSingleProduct);

router.get("/allProducts", productsController.getAllProducts);

router.get(
  "/homeApplianceProducts/:category",
  productsController.getHomeApplianceProducts
);

router.get(
  "/Audio&VideoProducts/:category",
  productsController.getAudionAndVideo
);

router.get(
  "/RefrigeratorProducts/:category",
  productsController.getRefrigerator
);

router.get(
  "/NewArrivalProducts/:category",
  productsController.getNewArrivalProducts
);

router.get(
  "/BestDealsProducts/:category",
  productsController.getBestDealsProducts
);

router.get("/relatedProducts/:category", productsController.getRelatedProducts);

router.get("/searchedProducts", productsController.getSearchedProducts);

module.exports = router;
