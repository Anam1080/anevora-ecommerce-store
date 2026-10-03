const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Get all products
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products.");
  }

  const data = await response.json();

  return data.products || [];
}

// Get products by category
export async function getProductsByCategory(category) {
  const response = await fetch(
    `${API_URL}/products/category/${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products.");
  }

  const data = await response.json();

  return data.products || [];
}

// Get single product
export async function getProductById(productId) {
  const response = await fetch(
    `${API_URL}/products/${encodeURIComponent(productId)}`
  );

  if (!response.ok) {
    throw new Error("Product not found.");
  }

  const data = await response.json();

  return data.product;
}