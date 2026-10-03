const express = require("express");

const {
  getProducts,
  getProductById,
  getProductsByCategory,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/:id", getProductById);

module.exports = router;