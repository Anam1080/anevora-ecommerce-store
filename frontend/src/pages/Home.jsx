import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/productService";

import heroImage from "../assets/image-1.jpg";

// =========================
// CATEGORY COVER IMAGES
// =========================
import clothesCategoryImage from "../assets/categories/clothes-collection.jpg.jpg";
import bagsCategoryImage from "../assets/categories/bags-collection.jpg.jpg";
import jewelryCategoryImage from "../assets/categories/jewelry-collection.jpg.jpg";
import abayaCategoryImage from "../assets/categories/abaya-collection.jpg.jpg";
import shoesCategoryImage from "../assets/categories/shoes-collection.jpg.jpg";

// =========================
// SELECTED PIECES IMAGES
// =========================
import featuredClothes01 from "../assets/products/clothes-01.jpg";
import featuredClothes04 from "../assets/products/clothes-04.jpg";

import featuredBag01 from "../assets/products/bag-01.jpg";
import featuredBag15 from "../assets/products/bag-15.jpg";

import featuredJewelry01 from "../assets/products/jewelry-01.jpg";
import featuredJewelry15 from "../assets/products/jewelry-15.jpg";

import featuredAbaya11 from "../assets/products/abaya-11.jpg";
import featuredAbaya12 from "../assets/products/abaya-12.jpg";

import featuredShoes2 from "../assets/products/shoes-2.jpg";

// =========================
// SELECTED PIECES IMAGE MAP
// =========================
const featuredImages = {
  "clothes-01": featuredClothes01,
  "clothes-04": featuredClothes04,

  "bags-01": featuredBag01,
  "bags-15": featuredBag15,

  "jewelry-01": featuredJewelry01,
  "jewelry-15": featuredJewelry15,

  // Actual product IDs from MongoDB
  // Using separate images from assets/products/
  "abaya-06": featuredAbaya11,
  "abaya-10": featuredAbaya12,

  "shoes-02": featuredShoes2,
};

// =========================
// SELECTED PIECES ORDER
// =========================
const selectedPieceIds = [
  "clothes-01",
  "clothes-04",
  "bags-01",
  "bags-15",
  "jewelry-01",
  "jewelry-15",
  "abaya-06",
  "abaya-10",
  "shoes-02",
];

export default function Home() {
  // =========================
  // API PRODUCTS STATE
  // =========================
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");

  // =========================
  // FETCH PRODUCTS FROM API
  // =========================
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
        console.error("Home products error:", error);

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

  // =========================
  // SELECTED PIECES
  // =========================
  const displayedProducts = selectedPieceIds
    .map((id) =>
      products.find((product) => product.productId === id)
    )
    .filter(Boolean);

  return (
    <div className="home-page">

      {/* =========================
          HERO
      ========================= */}
      <section className="home-hero">

        <Navbar />

        <img
          src={heroImage}
          alt="ANÉVORA collection"
          className="home-hero-image"
        />

        <div className="home-hero-overlay"></div>

        <div className="home-hero-content">

          <p className="home-hero-kicker">
            THE NEW LANGUAGE OF STYLE
          </p>

          <h1>ANÉVORA</h1>

          <p className="home-hero-description">
            Contemporary clothing, bags, jewelry, abayas and shoes curated
            for an individual sense of elegance.
          </p>

          <div className="home-hero-buttons">

            <Link
              to="/shop"
              className="home-hero-button home-hero-button-light"
            >
              <span>SHOP COLLECTION</span>
              <span className="hero-button-arrow">→</span>
            </Link>

            <Link
              to="/shop?category=Abaya"
              className="home-hero-button home-hero-button-outline"
            >
              <span>EXPLORE ABAYA EDIT</span>
              <span className="hero-button-arrow">→</span>
            </Link>

          </div>

        </div>

        <div className="home-hero-bottom">
          <span>ANÉVORA</span>

          <div className="home-hero-line"></div>

          <span>EST. 2026</span>
        </div>

      </section>

      {/* =========================
          CATEGORIES
      ========================= */}
      <section className="home-categories section-padding">

        <div className="section-heading">

          <div>
            <p className="section-eyebrow">
              SHOP BY CATEGORY
            </p>

            <h2>
              Find your <em>signature.</em>
            </h2>
          </div>

          <Link
            to="/shop"
            className="section-heading-link"
          >
            VIEW ALL
            <ArrowRight size={15} />
          </Link>

        </div>

        <div className="category-grid">

          {/* CLOTHES */}
          <Link
            to="/clothes"
            className="category-card"
          >
            <div className="category-image-wrap">

              <img
                src={clothesCategoryImage}
                alt="ANÉVORA clothes collection"
                className="category-image"
              />

              <div className="category-overlay"></div>

            </div>

            <div className="category-content">

              <div>
                <span>01</span>
                <h3>CLOTHES</h3>
              </div>

              <ArrowUpRight size={20} />

            </div>
          </Link>

          {/* BAGS */}
          <Link
            to="/bags"
            className="category-card"
          >
            <div className="category-image-wrap">

              <img
                src={bagsCategoryImage}
                alt="ANÉVORA bags collection"
                className="category-image"
              />

              <div className="category-overlay"></div>

            </div>

            <div className="category-content">

              <div>
                <span>02</span>
                <h3>BAGS</h3>
              </div>

              <ArrowUpRight size={20} />

            </div>
          </Link>

          {/* JEWELRY */}
          <Link
            to="/jewelry"
            className="category-card"
          >
            <div className="category-image-wrap">

              <img
                src={jewelryCategoryImage}
                alt="ANÉVORA jewelry collection"
                className="category-image"
              />

              <div className="category-overlay"></div>

            </div>

            <div className="category-content">

              <div>
                <span>03</span>
                <h3>JEWELRY</h3>
              </div>

              <ArrowUpRight size={20} />

            </div>
          </Link>

          {/* ABAYA */}
          <Link
            to="/abaya"
            className="category-card"
          >
            <div className="category-image-wrap">

              <img
                src={abayaCategoryImage}
                alt="ANÉVORA abaya collection"
                className="category-image"
              />

              <div className="category-overlay"></div>

            </div>

            <div className="category-content">

              <div>
                <span>04</span>
                <h3>ABAYA</h3>
              </div>

              <ArrowUpRight size={20} />

            </div>
          </Link>

          {/* SHOES */}
          <Link
            to="/shoes"
            className="category-card"
          >
            <div className="category-image-wrap">

              <img
                src={shoesCategoryImage}
                alt="ANÉVORA shoes collection"
                className="category-image"
              />

              <div className="category-overlay"></div>

            </div>

            <div className="category-content">

              <div>
                <span>05</span>
                <h3>SHOES</h3>
              </div>

              <ArrowUpRight size={20} />

            </div>
          </Link>

        </div>

      </section>

      {/* =========================
          SELECTED PIECES
      ========================= */}
      <section className="home-featured section-padding">

        <div className="section-heading">

          <div>
            <p className="section-eyebrow">
              ANÉVORA EDIT
            </p>

            <h2>
              Selected <em>pieces.</em>
            </h2>
          </div>

          <Link
            to="/shop"
            className="section-heading-link"
          >
            SHOP ALL
            <ArrowRight size={15} />
          </Link>

        </div>

        <div className="home-products-grid">

          {/* LOADING */}
          {loadingProducts && (
            <div className="home-products-status">
              Loading selected pieces...
            </div>
          )}

          {/* ERROR */}
          {!loadingProducts && productsError && (
            <div className="home-products-status">
              {productsError}
            </div>
          )}

          {/* PRODUCTS */}
          {!loadingProducts &&
            !productsError &&
            displayedProducts.map((product) => (
              <ProductCard
                key={product.productId}
                product={{
                  ...product,
                  id: product.productId,
                }}
                imageOverride={
                  featuredImages[product.productId]
                }
              />
            ))}

          {/* EMPTY */}
          {!loadingProducts &&
            !productsError &&
            displayedProducts.length === 0 && (
              <div className="home-products-status">
                No selected products available.
              </div>
            )}

        </div>

      </section>

      {/* =========================
          EDITORIAL
      ========================= */}
      <section className="home-editorial">

        <div className="home-editorial-overlay"></div>

        <div className="home-editorial-content">

          <p className="section-eyebrow light-eyebrow">
            THE ANÉVORA EDIT
          </p>

          <h2>
            Elegance is not
            <br />
            about standing out.
            <br />
            <em>It is about being remembered.</em>
          </h2>

          <Link
            to="/shop"
            className="editorial-button"
          >
            EXPLORE THE EDIT
            <ArrowRight size={15} />
          </Link>

        </div>

      </section>

      {/* =========================
          STATEMENT
      ========================= */}
      <section className="home-statement section-padding">

        <div className="statement-content">

          <p className="section-eyebrow">
            DESIGNED FOR EVERYDAY EXPRESSION
          </p>

          <h2>
            Less noise.
            <br />
            More <em>you.</em>
          </h2>

          <p>
            Discover pieces that move effortlessly between everyday
            moments, celebrations and everything in between.
          </p>

          <Link
            to="/shop"
            className="text-link"
          >
            FIND YOUR STYLE
            <ArrowUpRight size={15} />
          </Link>

        </div>

      </section>

      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="home-final-cta">

        <div className="home-final-cta-content">

          <p className="section-eyebrow light-eyebrow">
            WELCOME TO ANÉVORA
          </p>

          <h2>
            Your style.
            <br />
            Your <em>signature.</em>
          </h2>

          <p>
            Explore our latest collection and discover something made
            to feel uniquely yours.
          </p>

          <Link
            to="/shop"
            className="home-final-button"
          >
            SHOP ANÉVORA
            <ArrowRight size={15} />
          </Link>

        </div>

      </section>

      <Footer />

    </div>
  );
}