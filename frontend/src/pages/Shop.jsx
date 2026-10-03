import { useEffect, useMemo, useState } from "react";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import products from "../data/products";

function Shop() {
  const [searchParams] = useSearchParams();

  const initialSearch =
    searchParams.get("search") || "";

  const initialCategory =
    searchParams.get("category") || "All";

  const [search, setSearch] =
    useState(initialSearch);

  const [category, setCategory] =
    useState(initialCategory);

  const [sort, setSort] =
    useState("featured");

  const [mobileFilters, setMobileFilters] =
    useState(false);

  useEffect(() => {
    setSearch(
      searchParams.get("search") || ""
    );

    setCategory(
      searchParams.get("category") || "All"
    );
  }, [searchParams]);

  const categories = [
    "All",
    "Clothes",
    "Bags",
    "Jewelry",
    "Abaya",
    "Shoes",
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (search.trim()) {
      const keyword =
        search.toLowerCase().trim();

      result = result.filter((product) =>
        `${product.name} ${product.category} ${
          product.subcategory || ""
        } ${product.description || ""}`
          .toLowerCase()
          .includes(keyword)
      );
    }

    if (sort === "featured") {
      result.sort(
        (a, b) =>
          Number(Boolean(b.featured)) -
          Number(Boolean(a.featured))
      );
    }

    if (sort === "price-low") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return result;
  }, [category, search, sort]);

  return (
    <>
      <Navbar />

      <main className="anevora-shop">

        {/* =========================
            SHOP HERO
        ========================= */}

        <section className="shop-hero">

          <div className="shop-hero-content">

            <span className="small-label">
              ANÉVORA COLLECTION
            </span>

            <h1>
              The art of
              <br />
              <em>everyday elegance.</em>
            </h1>

            <p>
              Discover thoughtfully selected
              clothing, bags, jewelry, abayas
              and shoes created for your
              individual expression.
            </p>

          </div>

        </section>

        {/* =========================
            SHOP CONTENT
        ========================= */}

        <section className="shop-content">

          <div className="shop-topbar">

            <div>

              <span className="small-label">
                THE ANÉVORA EDIT
              </span>

              <h2>
                Shop the collection
              </h2>

            </div>

            <span className="product-count">
              {filteredProducts.length} products
            </span>

          </div>

          {/* TOOLBAR */}

          <div className="shop-toolbar">

            <div className="shop-search">

              <Search size={18} />

              <input
                type="text"
                placeholder="Search clothes, bags, abayas..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}

            </div>

            <div className="category-tabs">

              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    category === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>
              ))}

            </div>

            <div className="shop-sort">

              <label htmlFor="sort">
                Sort
              </label>

              <select
                id="sort"
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option value="featured">
                  Featured
                </option>

                <option value="name">
                  Name A-Z
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>
              </select>

            </div>

            <button
              type="button"
              className="mobile-filter-button"
              onClick={() =>
                setMobileFilters(
                  !mobileFilters
                )
              }
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

          </div>

          {/* MOBILE FILTERS */}

          <div
            className={`shop-mobile-panel ${
              mobileFilters
                ? "shop-mobile-panel-open"
                : ""
            }`}
          >

            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setMobileFilters(false);
                }}
              >
                {item === "All"
                  ? "All Products"
                  : item}
              </button>
            ))}

          </div>

          {/* PRODUCTS */}

          {filteredProducts.length > 0 ? (

            <div className="modern-product-grid">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}

            </div>

          ) : (

            <div className="shop-empty">

              <h2>
                Nothing found
              </h2>

              <p>
                Try another search or browse
                our complete collection.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                View All Products
              </button>

            </div>

          )}

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Shop;