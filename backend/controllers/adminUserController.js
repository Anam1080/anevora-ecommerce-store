const User = require("../models/User");

// ===============================
// GET ALL USERS
// ===============================

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(
      "Get all users error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch users.",
      error: error.message,
    });
  }
};

// ===============================
// GET SINGLE USER
// ===============================

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "Get user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user.",
      error: error.message,
    });
  }
};

// ===============================
// UPDATE USER STATUS
// ===============================

const toggleUserStatus = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Prevent admin from deactivating
    // their own account
    if (
      user._id.toString() ===
      req.user.userId
    ) {
      return res.status(400).json({
        success: false,
        message:
          "You cannot deactivate your own account.",
      });
    }

    user.isActive =
      !user.isActive;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.isActive
        ? "User activated successfully."
        : "User deactivated successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error(
      "Toggle user status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update user status.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  toggleUserStatus,
};