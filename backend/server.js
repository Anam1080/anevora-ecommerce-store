require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const adminOrderRoutes = require("./routes/adminOrderRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");

const {
  protect,
} = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// ================================
// CORS
// ================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);

// ================================
// BODY PARSER
// ================================

app.use(express.json());

// ================================
// DATABASE
// ================================

connectDB();

// ================================
// PUBLIC ROUTES
// ================================

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

// ================================
// ADMIN ROUTES
// ================================

app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/admin/products", adminProductRoutes);

app.use("/api/admin/users", adminUserRoutes);

// ================================
// ROOT
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ANÉVORA API is running.",
  });
});

// ================================
// HEALTH CHECK
// ================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend and API are working.",
  });
});

// ================================
// PROTECTED AUTH TEST
// ================================

app.get(
  "/api/auth/protected-test",
  protect,
  (req, res) => {
    res.json({
      success: true,
      message: "JWT authentication is working.",
      user: req.user,
    });
  }
);

// ================================
// 404 HANDLER
// ================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// ================================
// ERROR HANDLER
// ================================

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// ================================
// START SERVER
// ================================

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("ANÉVORA Backend");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`Server: http://localhost:${PORT}`);
  console.log(
    `Products: http://localhost:${PORT}/api/products`
  );
  console.log(
    `Auth: http://localhost:${PORT}/api/auth`
  );
  console.log(
    `Orders: http://localhost:${PORT}/api/orders`
  );
  console.log(
    `Admin Orders: http://localhost:${PORT}/api/admin/orders`
  );
  console.log(
    `Admin Products: http://localhost:${PORT}/api/admin/products`
  );
  console.log(
    `Admin Users: http://localhost:${PORT}/api/admin/users`
  );
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
});