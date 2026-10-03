import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const imageFiles = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function getProductImage(product) {
  // 1. Use the exact image saved when product was favourited
  if (product.imageUrl) {
    return product.imageUrl;
  }

  // 2. Try the normal category folder
  if (product.category && product.image) {
    const folder = product.category.toLowerCase();

    const categoryKey =
      `../assets/${folder}/${product.image}`;

    if (imageFiles[categoryKey]) {
      return imageFiles[categoryKey];
    }
  }

  // 3. Try the products folder
  // This also supports the images used by Home selected pieces
  if (product.image) {
    const productsKey =
      `../assets/products/${product.image}`;

    if (imageFiles[productsKey]) {
      return imageFiles[productsKey];
    }
  }

  return null;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  function handleMoveToBag(product) {
    addToCart(product);
    removeFromWishlist(product.id);
  }

  return (
    <div className="site-shell">
      <Navbar />

      <main className="wishlist-page">
        <section className="account-hero">
          <div>
            <p className="eyebrow dark-eyebrow">
              SAVED FOR YOU
            </p>

            <h1>Wishlist</h1>

            <p>
              Keep the pieces you love close until you are
              ready for them.
            </p>
          </div>
        </section>

        <section className="wishlist-content">
          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <div className="empty-icon">
                <Heart
                  size={32}
                  strokeWidth={1.4}
                />
              </div>

              <p className="eyebrow dark-eyebrow">
                YOUR WISHLIST
              </p>

              <h2>Nothing saved yet.</h2>

              <p>
                Explore ANÉVORA and save the pieces that
                catch your eye.
              </p>

              <Link
                to="/shop"
                className="dark-action-button"
              >
                Explore the collection
              </Link>
            </div>
          ) : (
            <>
              <div className="wishlist-toolbar">
                <span>
                  {wishlist.length}{" "}
                  {wishlist.length === 1
                    ? "piece"
                    : "pieces"}{" "}
                  saved
                </span>

                <button
                  type="button"
                  className="text-button"
                  onClick={clearWishlist}
                  style={{
                    backgroundColor: "#c8ad91",
                    color: "#241b15",
                    border: "1px solid #c8ad91",
                    padding: "10px 18px",
                    borderRadius: "4px",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Clear wishlist
                </button>
              </div>

              <div className="wishlist-grid">
                {wishlist.map((product) => {
                  const image = getProductImage(product);

                  return (
                    <article
                      className="wishlist-card"
                      key={product.id}
                    >
                      <div className="wishlist-image-wrap">
                        <Link
                          to={`/product/${product.id}`}
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={product.name}
                            />
                          ) : (
                            <div className="image-placeholder">
                              <span>ANÉVORA</span>
                            </div>
                          )}
                        </Link>

                        <button
                          type="button"
                          className="wishlist-remove"
                          onClick={() =>
                            removeFromWishlist(
                              product.id
                            )
                          }
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2
                            size={16}
                            strokeWidth={1.7}
                          />
                        </button>
                      </div>

                      <div className="wishlist-card-info">
                        <p>
                          {product.subcategory ||
                            product.category}
                        </p>

                        <Link
                          to={`/product/${product.id}`}
                        >
                          <h3>{product.name}</h3>
                        </Link>

                        <strong>
                          PKR{" "}
                          {formatPrice(
                            product.price
                          )}
                        </strong>

                        <button
                          type="button"
                          className="wishlist-add-button"
                          onClick={() =>
                            handleMoveToBag(product)
                          }
                        >
                          <ShoppingBag
                            size={16}
                            strokeWidth={1.7}
                          />
                          Move to bag
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}