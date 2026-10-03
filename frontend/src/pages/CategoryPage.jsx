import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SlidersHorizontal,
  ArrowDownUp,
  Search,
  ArrowRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

const categoryContent = {
  All: {
    eyebrow: "The ANÉVORA Collection",
    title: "Everything, beautifully considered.",
    description:
      "Discover refined clothes, bags, jewelry, abayas and shoes designed to bring effortless elegance to everyday style.",
  },

  Clothes: {
    eyebrow: "ANÉVORA / Clothes",
    title: "Clothes with quiet confidence.",
    description:
      "Explore eastern silhouettes, embroidered suits, lawn essentials and refined occasion wear.",
  },

  Bags: {
    eyebrow: "ANÉVORA / Bags",
    title: "Designed to carry beautifully.",
    description:
      "Discover structured handbags, everyday totes, shoulder bags and occasion pieces.",
  },

  Jewelry: {
    eyebrow: "ANÉVORA / Jewelry",
    title: "Quiet brilliance.",
    description:
      "Delicate necklaces, earrings, bracelets and signature sets made to complete the look.",
  },

  Abaya: {
    eyebrow: "ANÉVORA / Abaya",
    title: "Grace in every silhouette.",
    description:
      "Discover refined abayas designed with elegant silhouettes, thoughtful details and effortless modest style.",
  },

  Shoes: {
    eyebrow: "ANÉVORA / Shoes",
    title: "Step into your signature.",
    description:
      "Explore refined footwear designed to complete every look, from everyday elegance to occasion-ready style.",
  },
};

export default function CategoryPage({
  category = "All",
}) {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] =
    useState(initialSearch);

  const [sort, setSort] =
    useState("featured");

  const [subcategory, setSubcategory] =
    useState("All");

  // =====================================================
  // API PRODUCTS
  // =====================================================

  const [products, setProducts] =
    useState([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [productsError, setProductsError] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoadingProducts(true);
        setProductsError("");

        const data = await getProducts();

        if (isMounted) {
          setProducts(data);
        }
      } catch (error) {
        console.error(
          "Category products error:",
          error
        );

        if (isMounted) {
          setProductsError(
            "Unable to load products. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoadingProducts(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const content =
    categoryContent[category] ||
    categoryContent.All;

  // =====================================================
  // SUBCATEGORIES
  // =====================================================

  const subcategories = useMemo(() => {
    const categoryProducts =
      category === "All"
        ? products
        : products.filter(
            (product) =>
              product.category === category
          );

    return [
      "All",
      ...new Set(
        categoryProducts
          .map(
            (product) =>
              product.subcategory
          )
          .filter(Boolean)
      ),
    ];
  }, [category, products]);

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredProducts = useMemo(() => {
    let result =
      category === "All"
        ? [...products]
        : products.filter(
            (product) =>
              product.category === category
          );

    if (subcategory !== "All") {
      result = result.filter(
        (product) =>
          product.subcategory ===
          subcategory
      );
    }

    if (search.trim()) {
      const query =
        search.toLowerCase().trim();

      result = result.filter((product) => {
        return (
          product.name
            ?.toLowerCase()
            .includes(query) ||
          product.category
            ?.toLowerCase()
            .includes(query) ||
          product.subcategory
            ?.toLowerCase()
            .includes(query) ||
          product.description
            ?.toLowerCase()
            .includes(query) ||
          product.material
            ?.toLowerCase()
            .includes(query)
        );
      });
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

    if (sort === "featured") {
      result.sort((a, b) => {
        if (a.featured === b.featured) {
          return 0;
        }

        return a.featured ? -1 : 1;
      });
    }

    return result;
  }, [
    category,
    products,
    search,
    sort,
    subcategory,
  ]);

  // =====================================================
  // SEARCH
  // =====================================================

  function handleSearch(event) {
    event.preventDefault();

    const trimmedSearch =
      search.trim();

    if (trimmedSearch) {
      setSearchParams({
        search: trimmedSearch,
      });
    } else {
      setSearchParams({});
    }
  }

  function clearSearch() {
    setSearch("");
    setSearchParams({});
  }

  // =====================================================
  // RESET
  // =====================================================

  function resetFilters() {
    setSearch("");
    setSubcategory("All");
    setSort("featured");
    setSearchParams({});
  }

  const isCategoryPage =
    category !== "All";

  const isJewelry =
    category === "Jewelry";

  return (
    <div
      className={`site-shell ${
        isCategoryPage
          ? "category-page"
          : ""
      }`}
    >
      <Navbar />

      <main>

        {/* =================================================
            COLLECTION HERO
        ================================================= */}

        <section
          className={`collection-hero ${
            isJewelry
              ? "jewelry-collection-hero"
              : ""
          }`}
        >
          <div className="collection-hero-inner">

            <p className="eyebrow dark-eyebrow">
              {content.eyebrow}
            </p>

            <h1 className="jewelry-main-heading">
              {content.title}
            </h1>

            <p className="collection-description">
              {content.description}
            </p>

            {/* =========================================
                PAGE NAVIGATION BUTTONS
            ========================================= */}

            <div className="collection-navigation">

              <Link
                to="/"
                className="collection-nav-button"
              >
                <span>
                  HOME
                </span>

                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                />
              </Link>

              <Link
                to="/shop"
                className={`collection-nav-button ${
                  category === "All"
                    ? "active"
                    : ""
                }`}
              >
                <span>
                  SHOP ALL
                </span>

                <ArrowRight
                  size={15}
                  strokeWidth={1.7}
                />
              </Link>

            </div>

            {/* =========================================
                CATEGORY BREADCRUMB
            ========================================= */}

            {category !== "All" && (
              <div className="collection-breadcrumb">

                <span>
                  SHOP ALL
                </span>

                <span>
                  /
                </span>

                <span>
                  {category}
                </span>

              </div>
            )}

          </div>
        </section>

        {/* =================================================
            SHOP SECTION
        ================================================= */}

        <section className="shop-section">

          <div className="shop-container">

            {/* =============================================
                SHOP TOOLBAR
            ============================================= */}

            <div className="shop-toolbar">

              <div className="shop-result-count">
                <span>
                  {loadingProducts
                    ? "—"
                    : filteredProducts.length}
                </span>{" "}

                {filteredProducts.length === 1
                  ? "piece"
                  : "pieces"}
              </div>

              <div className="shop-controls">

                {/* SEARCH */}

                <form
                  className="shop-search"
                  onSubmit={handleSearch}
                >

                  <Search
                    size={17}
                    strokeWidth={1.7}
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(
                        event.target.value
                      )
                    }
                    placeholder="Search collection..."
                    aria-label="Search products"
                  />

                  {search && (
                    <button
                      type="button"
                      className="search-clear"
                      onClick={clearSearch}
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}

                </form>

                {/* SORT */}

                <div className="sort-control">

                  <ArrowDownUp
                    size={16}
                    strokeWidth={1.7}
                  />

                  <select
                    value={sort}
                    onChange={(event) =>
                      setSort(
                        event.target.value
                      )
                    }
                    aria-label="Sort products"
                  >

                    <option value="featured">
                      Featured
                    </option>

                    <option value="price-low">
                      Price: Low to High
                    </option>

                    <option value="price-high">
                      Price: High to Low
                    </option>

                    <option value="name">
                      Name: A to Z
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* =============================================
                CATEGORY FILTER
            ============================================= */}

            <div className="category-filter-row">

              {/* FILTER LABEL */}

              <div className="filter-label">

                <SlidersHorizontal
                  size={16}
                  strokeWidth={1.7}
                />

                <span>
                  FILTER
                </span>

              </div>

              {/* FILTER BUTTONS */}

              <div className="category-filters">

                {subcategories.map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      className={
                        subcategory === item
                          ? "filter-button active"
                          : "filter-button"
                      }
                      onClick={() =>
                        setSubcategory(
                          item
                        )
                      }
                    >
                      {item}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* =============================================
                SEARCH STATUS
            ============================================= */}

            {search.trim() && (
              <div className="search-status">

                <span>
                  Showing results for{" "}
                  <strong>
                    "{search}"
                  </strong>
                </span>

                <button
                  type="button"
                  onClick={clearSearch}
                >
                  Clear search
                </button>

              </div>
            )}

            {/* =============================================
                LOADING
            ============================================= */}

            {loadingProducts && (
              <div className="empty-shop-state">

                <div className="empty-shop-icon">
                  <Search
                    size={28}
                    strokeWidth={1.4}
                  />
                </div>

                <p className="eyebrow dark-eyebrow">
                  ANÉVORA
                </p>

                <h2>
                  Loading the collection.
                </h2>

                <p>
                  Preparing the latest pieces
                  for you.
                </p>

              </div>
            )}

            {/* =============================================
                API ERROR
            ============================================= */}

            {!loadingProducts &&
              productsError && (
                <div className="empty-shop-state">

                  <div className="empty-shop-icon">

                    <Search
                      size={28}
                      strokeWidth={1.4}
                    />

                  </div>

                  <p className="eyebrow dark-eyebrow">
                    Collection unavailable
                  </p>

                  <h2>
                    Something went wrong.
                  </h2>

                  <p>
                    {productsError}
                  </p>

                  <button
                    type="button"
                    className="dark-button"
                    onClick={() =>
                      window.location.reload()
                    }
                  >
                    Try Again
                  </button>

                </div>
              )}

            {/* =============================================
                PRODUCTS
            ============================================= */}

            {!loadingProducts &&
              !productsError &&
              filteredProducts.length > 0 && (

                <div className="product-grid collection-product-grid">

                  {filteredProducts.map(
                    (product) => (
                      <ProductCard
                        key={product.productId}
                        product={{
                          ...product,
                          id: product.productId,
                        }}
                      />
                    )
                  )}

                </div>

              )}

            {/* =============================================
                EMPTY SEARCH/FILTER STATE
            ============================================= */}

            {!loadingProducts &&
              !productsError &&
              filteredProducts.length === 0 && (

                <div className="empty-shop-state">

                  <div className="empty-shop-icon">

                    <Search
                      size={28}
                      strokeWidth={1.4}
                    />

                  </div>

                  <p className="eyebrow dark-eyebrow">
                    Nothing found
                  </p>

                  <h2>
                    No pieces match your
                    search.
                  </h2>

                  <p>
                    Try another search or
                    explore the complete
                    collection.
                  </p>

                  <button
                    type="button"
                    className="dark-button"
                    onClick={
                      resetFilters
                    }
                  >
                    View All Pieces
                  </button>

                </div>

              )}

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}