const Order = require("../models/Order");

function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(1000 + Math.random() * 9000);

  return `AN-${timestamp}-${random}`;
}

// ==========================================
// CREATE ORDER
// ==========================================

const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
    } = req.body;

    if (
      !customer ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Customer information and order items are required.",
      });
    }

    if (
      subtotal === undefined ||
      deliveryFee === undefined ||
      total === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Order pricing information is required.",
      });
    }

    if (!["cod", "card"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method.",
      });
    }

    /*
      DEMO PAYMENT LOGIC

      COD:
      paymentStatus = pending

      CARD:
      Demo card payment is considered successful.
    */

    const paymentStatus =
      paymentMethod === "card"
        ? "paid"
        : "pending";

    const order = await Order.create({
      orderNumber: generateOrderNumber(),

      user: req.user.userId,

      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        province: customer.province,
        postalCode: customer.postalCode || "",
      },

      items,

      subtotal: Number(subtotal),
      deliveryFee: Number(deliveryFee),
      total: Number(total),

      paymentMethod,

      paymentStatus,

      status: "Processing",
    });

    return res.status(201).json({
      success: true,

      message:
        paymentMethod === "card"
          ? "Demo payment successful and order placed."
          : "Order placed successfully.",

      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        total: order.total,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to place order.",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY ORDERS
// ==========================================

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(
      "Get my orders error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your orders.",
      error: error.message,
    });
  }
};

// ==========================================
// GET MY SINGLE ORDER
// ==========================================

const getMyOrderById = async (
  req,
  res
) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "Get order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch order.",
      error: error.message,
    });
  }
};

// ==========================================
// CANCEL MY ORDER
// ==========================================

const cancelMyOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Customer can only cancel orders that
    // have not been shipped yet.

    if (
      !["Processing", "Confirmed"].includes(
        order.status
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This order can no longer be cancelled.",
      });
    }

    order.status = "Cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully.",
      order: {
        id: order._id,
        orderNumber: order.orderNumber,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        total: order.total,
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Cancel order error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to cancel order.",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getMyOrderById,
  cancelMyOrder,
};