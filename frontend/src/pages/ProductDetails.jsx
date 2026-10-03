import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

import { getProductById, getProducts } from "../services/productService";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const imageFiles = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function getProductImage(product) {
  if (!product?.category || !product?.image) {
    return null;
  }

  const category = product.category.toLowerCase();
  const imageName = product.image;

  const exactKey = `../assets/${category}/${imageName}`;

  if (imageFiles[exactKey]) {
    return imageFiles[exactKey];
  }

  const targetName = imageName.toLowerCase();

  const matchingKey = Object.keys(imageFiles).find(
    (key) => {
      const fileName = key
        .split("/")
        .pop()
        .toLowerCase();

      return (
        key
          .toLowerCase()
          .includes(`/assets/${category}/`) &&
        fileName === targetName
      );
    }
  );

  if (matchingKey) {
    return imageFiles[matchingKey];
  }

  const targetWithoutExtension =
    targetName.replace(/\.[^/.]+$/, "");

  const normalizedTarget =
    targetWithoutExtension.replace(
      /-0+(\d+)$/,
      "-$1"
    );

  const normalizedMatch = Object.keys(
    imageFiles
  ).find((key) => {
    const fileName = key
      .split("/")
      .pop()
      .toLowerCase();

    const fileWithoutExtension =
      fileName.replace(/\.[^/.]+$/, "");

    const normalizedFile =
      fileWithoutExtension.replace(
        /-0+(\d+)$/,
        "-$1"
      );

    return (
      key
        .toLowerCase()
        .includes(`/assets/${category}/`) &&
      normalizedFile === normalizedTarget
    );
  });

  return normalizedMatch
    ? imageFiles[normalizedMatch]
    : null;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(
    price
  );
}

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  // =====================================================
  // PRODUCT API STATE
  // =====================================================

  const [product, setProduct] = useState(null);

  const [allProducts, setAllProducts] =
    useState([]);

  const [loadingProduct, setLoadingProduct] =
    useState(true);

  const [productsError, setProductsError] =
    useState("");

  // =====================================================
  // PRODUCT OPTIONS
  // =====================================================

  const [quantity, setQuantity] = useState(1);

  const [selectedSize, setSelectedSize] =
    useState(null);

  const [selectedColor, setSelectedColor] =
    useState(null);

  const [added, setAdded] = useState(false);

  // =====================================================
  // LOAD SINGLE PRODUCT
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      try {
        setLoadingProduct(true);
        setProductsError("");

        const data =
          await getProductById(id);

        if (isMounted) {
          setProduct(data);
        }
      } catch (error) {
        console.error(
          "Product details error:",
          error
        );

        if (isMounted) {
          setProduct(null);

          setProductsError(
            "Unable to load this product."
          );
        }
      } finally {
        if (isMounted) {
          setLoadingProduct(false);
        }
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // =====================================================
  // LOAD PRODUCTS FOR RELATED PRODUCTS
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    async function loadRelatedProducts() {
      try {
        const data = await getProducts();

        if (isMounted) {
          setAllProducts(data);
        }
      } catch (error) {
        console.error(
          "Related products error:",
          error
        );
      }
    }

    loadRelatedProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // =====================================================
  // RESET OPTIONS WHEN PRODUCT CHANGES
  // =====================================================

  useEffect(() => {
    if (!product) {
      setSelectedSize(null);
      setSelectedColor(null);
      setQuantity(1);
      return;
    }

    setSelectedSize(
      product.sizes?.[0] || null
    );

    setSelectedColor(
      product.colors?.[0] || null
    );

    setQuantity(1);
    setAdded(false);
  }, [product]);

  // =====================================================
  // RELATED PRODUCTS
  // =====================================================

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return allProducts
      .filter(
        (item) =>
          item.category === product.category &&
          item.productId !== product.productId
      )
      .slice(0, 4);
  }, [product, allProducts]);

  // =====================================================
  // LOADING STATE
  // =====================================================

  if (loadingProduct) {
    return (
      <div className="site-shell">
        <Navbar />

        <main className="empty-page">
          <p className="eyebrow dark-eyebrow">
            ANÉVORA
          </p>

          <h1>
            Loading product...
          </h1>

          <p>
            Preparing your selected piece.
          </p>
        </main>

        <Footer />
      </div>
    );
  }

  // =====================================================
  // PRODUCT NOT FOUND / API ERROR
  // =====================================================

  if (!product) {
    return (
      <div className="site-shell">
        <Navbar />

        <main className="empty-page">
          <p className="eyebrow dark-eyebrow">
            ANÉVORA
          </p>

          <h1>
            Product not found.
          </h1>

          <p>
            {productsError ||
              "The piece you're looking for is no longer available."}
          </p>

          <Link
            to="/shop"
            className="dark-button"
          >
            Back to Shop

            <ArrowRight
              size={17}
              strokeWidth={1.6}
            />
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  // =====================================================
  // PRODUCT IMAGE
  // =====================================================

  const image =
    getProductImage(product);

  const wishlisted =
    isWishlisted(product.productId);

  // =====================================================
  // QUANTITY
  // =====================================================

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  }

  function increaseQuantity() {
    setQuantity((current) => {
      const stock = Number(product.stock);

      if (
        Number.isFinite(stock) &&
        stock > 0
      ) {
        return Math.min(
          stock,
          current + 1
        );
      }

      return current + 1;
    });
  }

  // =====================================================
  // ADD TO CART
  // =====================================================

  function handleAddToCart() {
    addToCart(
      {
        ...product,
        id: product.productId,
      },
      quantity,
      selectedSize
    );

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2200);
  }

  // =====================================================
  // WISHLIST
  // =====================================================

  function handleWishlist() {
    toggleWishlist({
      ...product,
      id: product.productId,
    });
  }

  // =====================================================
  // STOCK STATUS
  // =====================================================

  const stock =
    Number(product.stock) || 0;

  const isOutOfStock = stock <= 0;

  return (
    <div className="site-shell">
      <Navbar />

      <main>

        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="product-breadcrumb-wrap">

          <div className="product-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              /
            </span>

            <Link
              to={`/${product.category.toLowerCase()}`}
            >
              {product.category}
            </Link>

            <span>
              /
            </span>

            <span>
              {product.name}
            </span>

          </div>

        </div>

        {/* =================================================
            PRODUCT DETAILS
        ================================================= */}

        <section className="product-details-section">

          <div className="product-details-container">

            {/* =============================================
                PRODUCT IMAGE
            ============================================= */}

            <div className="product-details-image">

              {image ? (
                <img
                  src={image}
                  alt={product.name}
                />
              ) : (
                <div className="image-placeholder product-details-placeholder">

                  <span>
                    ANÉVORA
                  </span>

                  <small>
                    {product.category}
                  </small>

                </div>
              )}

              {product.badge && (
                <span className="product-details-badge">
                  {product.badge}
                </span>
              )}

            </div>

            {/* =============================================
                PRODUCT INFORMATION
            ============================================= */}

            <div className="product-details-info">

              <p className="eyebrow dark-eyebrow">
                {product.subcategory ||
                  product.category}
              </p>

              <h1>
                {product.name}
              </h1>

              {/* PRICE */}

              <div className="product-details-price">

                <span>
                  PKR{" "}
                  {formatPrice(
                    product.price
                  )}
                </span>

                {product.oldPrice && (
                  <del>
                    PKR{" "}
                    {formatPrice(
                      product.oldPrice
                    )}
                  </del>
                )}

              </div>

              {/* DESCRIPTION */}

              <p className="product-details-description">
                {product.description}
              </p>

              {/* =========================================
                  COLOR
              ========================================= */}

              {product.colors?.length > 0 && (
                <div className="product-option">

                  <div className="product-option-header">

                    <span>
                      Color
                    </span>

                    <strong>
                      {selectedColor}
                    </strong>

                  </div>

                  <div className="color-options">

                    {product.colors.map(
                      (color) => (
                        <button
                          key={color}
                          type="button"
                          className={
                            selectedColor ===
                            color
                              ? "color-option active"
                              : "color-option"
                          }
                          onClick={() =>
                            setSelectedColor(
                              color
                            )
                          }
                        >
                          {color}
                        </button>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* =========================================
                  SIZE
              ========================================= */}

              {product.sizes?.length > 0 && (
                <div className="product-option">

                  <div className="product-option-header">

                    <span>
                      Size
                    </span>

                    <span>
                      {selectedSize ||
                        "Select size"}
                    </span>

                  </div>

                  <div className="size-options">

                    {product.sizes.map(
                      (size) => (
                        <button
                          key={size}
                          type="button"
                          className={
                            selectedSize ===
                            size
                              ? "size-option active"
                              : "size-option"
                          }
                          onClick={() =>
                            setSelectedSize(
                              size
                            )
                          }
                        >
                          {size}
                        </button>
                      )
                    )}

                  </div>

                </div>
              )}

              {/* =========================================
                  STOCK
              ========================================= */}

              <div className="product-stock-status">

                {isOutOfStock
                  ? "Out of stock"
                  : stock <= 5
                  ? `Only ${stock} left in stock`
                  : "In stock"}

              </div>

              {/* =========================================
                  BUY ROW
              ========================================= */}

              <div className="product-buy-row">

                <div className="quantity-control">

                  <button
                    type="button"
                    onClick={
                      decreaseQuantity
                    }
                    disabled={
                      isOutOfStock ||
                      quantity <= 1
                    }
                    aria-label="Decrease quantity"
                  >
                    <Minus
                      size={16}
                      strokeWidth={1.7}
                    />
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={
                      increaseQuantity
                    }
                    disabled={
                      isOutOfStock ||
                      quantity >= stock
                    }
                    aria-label="Increase quantity"
                  >
                    <Plus
                      size={16}
                      strokeWidth={1.7}
                    />
                  </button>

                </div>

                <button
                  type="button"
                  className={`product-add-button ${
                    added ? "added" : ""
                  }`}
                  onClick={
                    handleAddToCart
                  }
                  disabled={isOutOfStock}
                >

                  <ShoppingBag
                    size={18}
                    strokeWidth={1.6}
                  />

                  {isOutOfStock
                    ? "Out of Stock"
                    : added
                    ? "Added to Bag"
                    : "Add to Bag"}

                </button>

                <button
                  type="button"
                  className={`product-wishlist-button ${
                    wishlisted
                      ? "is-wishlisted"
                      : ""
                  }`}
                  onClick={
                    handleWishlist
                  }
                  aria-label={
                    wishlisted
                      ? "Remove from wishlist"
                      : "Add to wishlist"
                  }
                >

                  <Heart
                    size={20}
                    strokeWidth={1.6}
                    fill={
                      wishlisted
                        ? "currentColor"
                        : "none"
                    }
                  />

                </button>

              </div>

              {/* =========================================
                  SERVICES
              ========================================= */}

              <div className="product-service-list">

                <div className="product-service-item">

                  <Truck
                    size={20}
                    strokeWidth={1.5}
                  />

                  <div>

                    <strong>
                      Nationwide Delivery
                    </strong>

                    <span>
                      Delivery available
                      across Pakistan.
                    </span>

                  </div>

                </div>

                <div className="product-service-item">

                  <RotateCcw
                    size={20}
                    strokeWidth={1.5}
                  />

                  <div>

                    <strong>
                      Easy Returns
                    </strong>

                    <span>
                      Simple return process
                      for eligible pieces.
                    </span>

                  </div>

                </div>

                <div className="product-service-item">

                  <ShieldCheck
                    size={20}
                    strokeWidth={1.5}
                  />

                  <div>

                    <strong>
                      Secure Checkout
                    </strong>

                    <span>
                      Your order information
                      stays protected.
                    </span>

                  </div>

                </div>

              </div>

              {/* =========================================
                  PRODUCT INFORMATION
              ========================================= */}

              <div className="product-information">

                <div>

                  <span>
                    Material
                  </span>

                  <strong>
                    {product.material ||
                      "Premium quality"}
                  </strong>

                </div>

                <div>

                  <span>
                    Category
                  </span>

                  <strong>
                    {product.category}
                  </strong>

                </div>

                <div>

                  <span>
                    Style
                  </span>

                  <strong>
                    {product.subcategory ||
                      "Signature"}
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            RELATED PRODUCTS
        ================================================= */}

        {relatedProducts.length > 0 && (
          <section className="related-products-section section-padding">

            <div className="section-heading">

              <div>

                <p className="eyebrow dark-eyebrow">
                  YOU MAY ALSO LIKE
                </p>

                <h2>
                  Complete the look.
                </h2>

              </div>

              <Link
                to={`/${product.category.toLowerCase()}`}
                className="section-link"
              >
                View collection

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.5}
                />

              </Link>

            </div>

            <div className="product-grid">

              {relatedProducts.map(
                (relatedProduct) => (
                  <ProductCard
                    key={
                      relatedProduct.productId
                    }
                    product={{
                      ...relatedProduct,
                      id: relatedProduct.productId,
                    }}
                  />
                )
              )}

            </div>

          </section>
        )}

        {/* =================================================
            BACK TO COLLECTION
        ================================================= */}

        <section className="product-back-section">

          <Link
            to="/shop"
            className="underline-link"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.5}
            />

            Back to collection
          </Link>

        </section>

      </main>

      <Footer />

    </div>
  );
}