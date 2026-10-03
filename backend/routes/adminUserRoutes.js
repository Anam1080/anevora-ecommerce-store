const express = require("express");

const {
  getAllUsers,
  getUserById,
  toggleUserStatus,
} = require("../controllers/adminUserController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(
  protect,
  adminOnly
);

router.get(
  "/",
  getAllUsers
);

router.get(
  "/:id",
  getUserById
);

router.patch(
  "/:id/status",
  toggleUserStatus
);

module.exports = router;