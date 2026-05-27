const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    productImage: {
      type: String,
      required: true,
    },
    productImage2: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", productsSchema, "allProducts");

module.exports = Products;

// module.exports = mongoose.model("products", productsSchema);
