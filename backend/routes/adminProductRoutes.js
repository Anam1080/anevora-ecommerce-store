const express = require("express");

const {
  getAllAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
} = require("../controllers/adminProductController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// All admin product routes require:
// 1. Valid JWT
// 2. Admin role
router.use(protect, adminOnly);

// Get all products
router.get(
  "/",
  getAllAdminProducts
);

// Get single product
router.get(
  "/:id",
  getAdminProductById
);

// Create product
router.post(
  "/",
  createProduct
);

// Update product
router.put(
  "/:id",
  updateProduct
);

// Delete product
router.delete(
  "/:id",
  deleteProduct
);

// Activate / deactivate product
router.patch(
  "/:id/status",
  toggleProductStatus
);

module.exports = router;