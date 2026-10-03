const Product = require("../models/Product");

// Get all products for admin
const getAllAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get admin products error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch products.",
      error: error.message,
    });
  }
};

// Get single product for admin
const getAdminProductById = async (
  req,
  res
) => {
  try {
    const product = await Product.findOne({
      productId: req.params.id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "Get admin product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch product.",
      error: error.message,
    });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      category,
      subcategory,
      price,
      oldPrice,
      badge,
      image,
      description,
      sizes,
      colors,
      material,
      rating,
      reviews,
      stock,
      featured,
      isActive,
    } = req.body;

    if (
      !productId ||
      !name ||
      !category ||
      price === undefined ||
      !image ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Product ID, name, category, price, image and description are required.",
      });
    }

    const existingProduct =
      await Product.findOne({
        productId: productId.trim(),
      });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message:
          "A product with this Product ID already exists.",
      });
    }

    const product = await Product.create({
      productId: productId.trim(),
      name: name.trim(),
      category,
      subcategory:
        subcategory?.trim() || "",
      price: Number(price),

      oldPrice:
        oldPrice === "" ||
        oldPrice === null ||
        oldPrice === undefined
          ? null
          : Number(oldPrice),

      badge: badge?.trim() || "",
      image: image.trim(),
      description: description.trim(),

      sizes: Array.isArray(sizes)
        ? sizes
        : [],

      colors: Array.isArray(colors)
        ? colors
        : [],

      material:
        material?.trim() || "",

      rating:
        rating === undefined
          ? 5
          : Number(rating),

      reviews:
        reviews === undefined
          ? 0
          : Number(reviews),

      stock:
        stock === undefined
          ? 10
          : Number(stock),

      featured:
        featured === undefined
          ? false
          : Boolean(featured),

      isActive:
        isActive === undefined
          ? true
          : Boolean(isActive),
    });

    return res.status(201).json({
      success: true,
      message:
        "Product created successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Create product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to create product.",
      error: error.message,
    });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const product =
      await Product.findOne({
        productId: req.params.id,
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const {
      productId,
      name,
      category,
      subcategory,
      price,
      oldPrice,
      badge,
      image,
      description,
      sizes,
      colors,
      material,
      rating,
      reviews,
      stock,
      featured,
      isActive,
    } = req.body;

    if (
      productId !== undefined &&
      productId.trim() !==
        product.productId
    ) {
      const duplicate =
        await Product.findOne({
          productId: productId.trim(),
          _id: {
            $ne: product._id,
          },
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Another product already uses this Product ID.",
        });
      }

      product.productId =
        productId.trim();
    }

    if (name !== undefined) {
      product.name = name.trim();
    }

    if (category !== undefined) {
      product.category = category;
    }

    if (subcategory !== undefined) {
      product.subcategory =
        subcategory.trim();
    }

    if (price !== undefined) {
      product.price = Number(price);
    }

    if (oldPrice !== undefined) {
      product.oldPrice =
        oldPrice === "" ||
        oldPrice === null
          ? null
          : Number(oldPrice);
    }

    if (badge !== undefined) {
      product.badge = badge.trim();
    }

    if (image !== undefined) {
      product.image = image.trim();
    }

    if (description !== undefined) {
      product.description =
        description.trim();
    }

    if (Array.isArray(sizes)) {
      product.sizes = sizes;
    }

    if (Array.isArray(colors)) {
      product.colors = colors;
    }

    if (material !== undefined) {
      product.material =
        material.trim();
    }

    if (rating !== undefined) {
      product.rating = Number(rating);
    }

    if (reviews !== undefined) {
      product.reviews =
        Number(reviews);
    }

    if (stock !== undefined) {
      product.stock = Number(stock);
    }

    if (featured !== undefined) {
      product.featured =
        Boolean(featured);
    }

    if (isActive !== undefined) {
      product.isActive =
        Boolean(isActive);
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message:
        "Product updated successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Update product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update product.",
      error: error.message,
    });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product =
      await Product.findOne({
        productId: req.params.id,
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await Product.deleteOne({
      _id: product._id,
    });

    return res.status(200).json({
      success: true,
      message:
        "Product deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete product error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to delete product.",
      error: error.message,
    });
  }
};

// Activate / deactivate product
const toggleProductStatus = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findOne({
        productId: req.params.id,
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    product.isActive =
      !product.isActive;

    await product.save();

    return res.status(200).json({
      success: true,
      message: product.isActive
        ? "Product activated successfully."
        : "Product deactivated successfully.",
      product,
    });
  } catch (error) {
    console.error(
      "Toggle product status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to update product status.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
};