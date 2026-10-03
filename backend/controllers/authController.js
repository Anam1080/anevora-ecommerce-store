const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

// ==========================================
// REGISTER
// ==========================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters.",
      });
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // ==========================================
    // IMPORTANT:
    // EVERY NEW ACCOUNT IS CUSTOMER
    // ==========================================

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
      role: "customer",
      isActive: true,
    });

    const token = generateToken(user);

    console.log(
      `✅ New customer registered: ${user.email} | role=${user.role}`
    );

    return res.status(201).json({
      success: true,
      message: "Customer account created successfully.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account.",
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account has been deactivated.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);

    console.log(
      `🔐 Login: ${user.email} | role=${user.role}`
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to sign in.",
    });
  }
};

// ==========================================
// CURRENT USER
// ==========================================

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    );

    if (!user || !user.isActive) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Get current user error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user profile.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};