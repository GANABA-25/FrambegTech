const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
});

module.exports = mongoose.model("AdminUser", AdminUserSchema);
