import { useMemo, useState } from "react";
import {
  Edit3,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";

const imageFiles = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function getProductImage(product) {
  if (!product?.image) {
    return null;
  }

  const fileName = product.image.toLowerCase();

  // Exact filename match
  const exactPath = Object.keys(imageFiles).find(
    (path) =>
      path.toLowerCase().endsWith(`/${fileName}`)
  );

  if (exactPath) {
    return imageFiles[exactPath];
  }

  // Clothes:
  // products.js has clothes-01.jpg
  // actual file is clothes-1.jpg
  const clothesMatch = fileName.match(
    /^clothes-0+(\d+)\.jpg$/
  );

  if (clothesMatch) {
    const actualFileName =
      `clothes-${clothesMatch[1]}.jpg`;

    const clothesPath = Object.keys(imageFiles).find(
      (path) =>
        path
          .toLowerCase()
          .endsWith(
            `/categories/clothes/${actualFileName}`
          ) ||
        path
          .toLowerCase()
          .endsWith(
            `/clothes/${actualFileName}`
          )
    );

    if (clothesPath) {
      return imageFiles[clothesPath];
    }
  }

  return null;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function AdminProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category === category;

      const searchText = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        !searchText ||
        product.name
          .toLowerCase()
          .includes(searchText) ||
        product.id
          .toLowerCase()
          .includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <div className="site-shell admin-shell">
      <Navbar />

      <main className="admin-page">
        {/* ADMIN HEADER */}
        <section className="admin-header">
          <div>
            <p className="eyebrow dark-eyebrow">
              CATALOGUE
            </p>

            <h1>Products</h1>

            <p>
              Manage the ANÉVORA product collection.
            </p>
          </div>

          <button
            type="button"
            className="dark-action-button"
            onClick={() =>
              alert(
                "Product creation will be connected to the backend."
              )
            }
          >
            <Plus size={17} />
            Add product
          </button>
        </section>

        {/* TOOLBAR */}
        <section className="admin-toolbar">
          <div className="admin-search">
            <Search size={17} />

            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="admin-filter-buttons">
            {[
              "All",
              "Clothes",
              "Bags",
              "Jewelry",
              "Abaya",
              "Shoes",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className={
                  category === item
                    ? "active"
                    : ""
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCT TABLE */}
        <section className="admin-product-table-wrap">
          <div className="admin-table-top">
            <span>
              {filteredProducts.length} products
            </span>

            <span>
              {category === "All"
                ? "All collections"
                : category}
            </span>
          </div>

          <div className="admin-product-table">
            {/* TABLE HEADING */}
            <div className="admin-product-row table-heading">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {/* PRODUCTS */}
            {filteredProducts.map((product) => {
              const image =
                getProductImage(product);

              return (
                <div
                  className="admin-product-row"
                  key={product.id}
                >
                  {/* PRODUCT */}
                  <div className="admin-product-name">
                    <div className="admin-table-image">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                        />
                      ) : (
                        <span>ANÉVORA</span>
                      )}
                    </div>

                    <div>
                      <strong>
                        {product.name}
                      </strong>

                      <small>
                        {product.id}
                      </small>
                    </div>
                  </div>

                  {/* CATEGORY */}
                  <span>
                    {product.category}
                  </span>

                  {/* PRICE */}
                  <strong>
                    PKR {formatPrice(product.price)}
                  </strong>

                  {/* STATUS */}
                  <span className="table-status">
                    Active
                  </span>

                  {/* ACTIONS */}
                  <div className="table-actions">
                    <button
                      type="button"
                      aria-label={`Edit ${product.name}`}
                      onClick={() =>
                        alert(
                          "Product editing will be connected to the backend."
                        )
                      }
                    >
                      <Edit3 size={16} />
                    </button>

                    <button
                      type="button"
                      aria-label={`Delete ${product.name}`}
                      onClick={() =>
                        alert(
                          "Product deletion will be connected to the backend."
                        )
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}