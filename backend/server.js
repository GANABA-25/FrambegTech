require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const mongodb_uri = process.env.MONGODB_URI;

const app = express();

const adminRoutes = require("./routes/adminRoutes");
const productsRoutes = require("./routes/productsRoutes");
const cartRoutes = require("./routes/cartRoutes");
const AdminUserRoutes = require("./routes/AdminUserRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(compression());
app.use(helmet());

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/adminUser", AdminUserRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);

mongoose
  .connect(mongodb_uri)
  .then((connect) => {
    app.listen(process.env.PORT || 8090);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
