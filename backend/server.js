
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

const { protect } = require("./middleware/authMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

// =====================================================
// CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",

  // ANÉVORA Production
  "https://anevora-ecommerce-store-frontend.vercel.app",

  // ANÉVORA Vercel Deployment
  "https://anevora-ecommerce-store-frontend-delvigiry-anam1080.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests without an Origin
    // Example: Postman, curl, server-to-server requests
    if (!origin) {
      return callback(null, true);
    }

    // Allow exact known origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow all Vercel deployments
    if (origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    console.log("CORS blocked origin:", origin);

    return callback(new Error("Not allowed by CORS"));
  },

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,

  optionsSuccessStatus: 204,
};

// Apply CORS
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options("*", cors(corsOptions));

// =====================================================
// BODY PARSER
// =====================================================

app.use(express.json());

// =====================================================
// DATABASE
// =====================================================

connectDB();

// =====================================================
// PUBLIC ROUTES
// =====================================================

app.use("/api/products", productRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/orders", orderRoutes);

// =====================================================
// ADMIN ROUTES
// =====================================================

app.use(
  "/api/admin/orders",
  adminOrderRoutes
);

app.use(
  "/api/admin/products",
  adminProductRoutes
);

app.use(
  "/api/admin/users",
  adminUserRoutes
);

// =====================================================
// ROOT ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ANÉVORA API is running.",
  });
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend and API are working.",
  });
});

// =====================================================
// PROTECTED AUTH TEST
// =====================================================

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

// =====================================================
// 404 HANDLER
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((error, req, res, next) => {
  console.error("Server error:", error);

  // Handle CORS errors
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS policy blocked this request.",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("ANÉVORA Backend");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  console.log(
    `Server: http://localhost:${PORT}`
  );

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

