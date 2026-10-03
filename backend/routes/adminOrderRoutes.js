const express = require("express");

const {
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
} = require("../controllers/adminOrderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// All admin order routes require:
// 1. Valid JWT
// 2. Admin role
router.use(protect, adminOnly);

// Get all orders
router.get("/", getAllOrders);

// Get single order
router.get("/:id", getAdminOrderById);

// Update order status
router.patch(
  "/:id/status",
  updateOrderStatus
);

module.exports = router;