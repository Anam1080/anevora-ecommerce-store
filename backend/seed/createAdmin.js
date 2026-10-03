require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const User = require("../models/User");

async function createAdmin() {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName =
      process.env.ADMIN_NAME || "ANÉVORA Admin";

    if (!adminEmail || !adminPassword) {
      console.error(
        "❌ ADMIN_EMAIL or ADMIN_PASSWORD is missing from .env"
      );

      process.exit(1);
    }

    if (adminPassword.length < 6) {
      console.error(
        "❌ ADMIN_PASSWORD must contain at least 6 characters."
      );

      process.exit(1);
    }

    const normalizedEmail =
      adminEmail.trim().toLowerCase();

    let user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

    if (user) {
      user.role = "admin";
      user.isActive = true;

      await user.save();

      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("✅ Existing user promoted to ADMIN");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      console.log("Email:", user.email);
      console.log("Role:", user.role);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

      await mongoose.connection.close();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    user = await User.create({
      name: adminName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("✅ ADMIN ACCOUNT CREATED");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("Name:", user.name);
    console.log("Email:", user.email);
    console.log("Role:", user.role);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ Admin setup failed.");
    console.error("Error:", error.message);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    try {
      await mongoose.connection.close();
    } catch {}

    process.exit(1);
  }
}

createAdmin();