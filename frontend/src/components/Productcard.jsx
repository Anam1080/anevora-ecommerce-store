import {
  Heart,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// =========================
// CLOTHES IMAGES
// =========================
import clothes1 from "../assets/clothes/clothes-1.jpg";
import clothes2 from "../assets/clothes/clothes-2.jpg";
import clothes3 from "../assets/clothes/clothes-3.jpg";
import clothes4 from "../assets/clothes/clothes-4.jpg";
import clothes5 from "../assets/clothes/clothes-5.jpg";
import clothes6 from "../assets/clothes/clothes-6.jpg";
import clothes7 from "../assets/clothes/clothes-7.jpg";
import clothes8 from "../assets/clothes/clothes-8.jpg";
import clothes9 from "../assets/clothes/clothes-9.jpg";
import clothes10 from "../assets/clothes/clothes-10.jpg";
import clothes11 from "../assets/clothes/clothes-11.jpg";
import clothes12 from "../assets/clothes/clothes-12.jpg";
import clothes13 from "../assets/clothes/clothes-13.jpg";
import clothes14 from "../assets/clothes/clothes-14.jpg";
import clothes15 from "../assets/clothes/clothes-15.jpg";

const clothesImages = {
  "clothes-01.jpg": clothes1,
  "clothes-02.jpg": clothes2,
  "clothes-03.jpg": clothes3,
  "clothes-04.jpg": clothes4,
  "clothes-05.jpg": clothes5,
  "clothes-06.jpg": clothes6,
  "clothes-07.jpg": clothes7,
  "clothes-08.jpg": clothes8,
  "clothes-09.jpg": clothes9,
  "clothes-10.jpg": clothes10,
  "clothes-11.jpg": clothes11,
  "clothes-12.jpg": clothes12,
  "clothes-13.jpg": clothes13,
  "clothes-14.jpg": clothes14,
  "clothes-15.jpg": clothes15,
};

// =========================
// BAGS
// =========================
const bagsImages = import.meta.glob(
  "../assets/bags/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// =========================
// JEWELRY
// =========================
const jewelryImages = import.meta.glob(
  "../assets/jewelry/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// =========================
// SHOES
// =========================
const shoesImages = import.meta.glob(
  "../assets/shoes/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// =========================
// ABAYA
// =========================
const abayaImages = import.meta.glob(
  "../assets/abaya/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function getProductImage(product) {
  const category = product.category?.toLowerCase();

  if (category === "clothes") {
    return clothesImages[product.image] || null;
  }

  if (category === "bags") {
    const key = `../assets/bags/${product.image}`;
    return bagsImages[key] || null;
  }

  if (category === "jewelry") {
    const key = `../assets/jewelry/${product.image}`;
    return jewelryImages[key] || null;
  }

  if (category === "shoes") {
    const key = `../assets/shoes/${product.image}`;
    return shoesImages[key] || null;
  }

  if (category === "abaya") {
    const key = `../assets/abaya/${product.image}`;
    return abayaImages[key] || null;
  }

  return null;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function ProductCard({
  product,
  imageOverride,
}) {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const image =
    imageOverride || getProductImage(product);

  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    addToCart(product);
  }

  function handleWishlist() {
  toggleWishlist({
    ...product,
    imageUrl: image,
  });
}

  return (
    <article className="product-card">

      <div className="product-image-wrap">

        <Link
          to={`/product/${product.id}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="product-image"
            />
          ) : (
            <div className="image-placeholder product-placeholder">
              <span>ANÉVORA</span>
              <small>{product.category}</small>
            </div>
          )}
        </Link>

        {product.badge && (
          <span className="product-badge">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          className={`wishlist-button ${
            wishlisted ? "is-wishlisted" : ""
          }`}
          onClick={handleWishlist}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
        >
          <Heart
            size={17}
            strokeWidth={1.7}
            fill={
              wishlisted
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <div className="product-quick-actions">

          <button
            type="button"
            className="quick-add-button"
            onClick={handleAddToCart}
          >
            <ShoppingBag
              size={16}
              strokeWidth={1.8}
            />
            Add to Bag
          </button>

          <Link
            to={`/product/${product.id}`}
            className="quick-view-button"
            aria-label={`View ${product.name}`}
          >
            <ArrowUpRight
              size={17}
              strokeWidth={1.8}
            />
          </Link>

        </div>
      </div>

      <div className="product-info">

        <div className="product-category">
          {product.subcategory || product.category}
        </div>

        <Link
          to={`/product/${product.id}`}
          className="product-name"
        >
          {product.name}
        </Link>

        <div className="product-price-row">

          <span className="product-price">
            PKR {formatPrice(product.price)}
          </span>

          {product.oldPrice && (
            <span className="product-old-price">
              PKR {formatPrice(product.oldPrice)}
            </span>
          )}

        </div>
      </div>

    </article>
  );
}