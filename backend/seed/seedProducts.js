require("dotenv").config();

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const Product = require("../models/Product");
const connectDB = require("../config/db");

function loadFrontendProducts() {
  const filePath = path.join(
    __dirname,
    "../../frontend/src/data/products.js"
  );

  let source = fs.readFileSync(filePath, "utf8");

  source = source.replace(
    /export\s+default\s+products\s*;?\s*$/m,
    ""
  );

  source += "\nmodule.exports = products;";

  const sandbox = {
    module: {
      exports: {},
    },
    exports: {},
  };

  vm.runInNewContext(source, sandbox);

  return sandbox.module.exports;
}

async function seedProducts() {
  try {
    await connectDB();

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("ANÉVORA Product Seeder");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    const products = loadFrontendProducts();

    console.log(
      `📦 Products found in frontend: ${products.length}`
    );

    await Product.deleteMany({});

    console.log("🗑️ Existing MongoDB products removed.");

    const productsForDatabase = products.map((product) => ({
      productId: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory || "",
      price: product.price,
      oldPrice: product.oldPrice || null,
      badge: product.badge || "",
      image: product.image,
      description: product.description,
      sizes: product.sizes || [],
      colors: product.colors || [],
      material: product.material || "",
      rating: 5,
      reviews: 0,
      stock: 10,
      featured: product.featured || false,
      isActive: true,
    }));

    const insertedProducts = await Product.insertMany(
      productsForDatabase
    );

    console.log(
      `✅ ${insertedProducts.length} products added to MongoDB.`
    );

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎉 ANÉVORA products seeded successfully!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    process.exit(0);
  } catch (error) {
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.error("❌ Product seeding failed.");
    console.error("Error:", error.message);
    console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    process.exit(1);
  }
}

seedProducts();