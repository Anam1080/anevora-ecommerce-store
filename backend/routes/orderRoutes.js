const express = require("express");

const {
  createOrder,
  getMyOrders,
  getMyOrderById,
  cancelMyOrder,
} = require("../controllers/orderController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Create order
router.post(
  "/",
  protect,
  createOrder
);

// Get logged-in customer's orders
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

// Cancel customer's own order
router.patch(
  "/:id/cancel",
  protect,
  cancelMyOrder
);

// Get customer's single order
router.get(
  "/:id",
  protect,
  getMyOrderById
);

module.exports = router;