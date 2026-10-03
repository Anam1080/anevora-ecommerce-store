import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  const folder = product.category.toLowerCase();

  const key = `../assets/${folder}/${product.image}`;

  return imageFiles[key] || null;
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export default function Cart() {
  const {
    cart,
    itemCount,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const deliveryFee =
    subtotal >= 5000 || subtotal === 0
      ? 0
      : 250;

  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="site-shell">
        <Navbar />

        <main className="empty-cart-page">
          <div className="empty-cart-icon">
            <ShoppingBag
              size={34}
              strokeWidth={1.3}
            />
          </div>

          <p className="eyebrow dark-eyebrow">
            YOUR ANÉVORA BAG
          </p>

          <h1>
            Your bag is waiting.
          </h1>

          <p>
            Discover something beautiful and
            add it to your collection.
          </p>

          <Link
            to="/shop"
            className="dark-button"
          >
            Explore Collection

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

  return (
    <div className="site-shell">
      <Navbar />

      <main>
        {/* HEADER */}
        <section className="cart-hero">
          <div className="cart-container">
            <p className="eyebrow dark-eyebrow">
              ANÉVORA / SHOPPING BAG
            </p>

            <h1>
              Your selected pieces.
            </h1>

            <p>
              {itemCount}{" "}
              {itemCount === 1
                ? "piece"
                : "pieces"}{" "}
              ready for checkout.
            </p>
          </div>
        </section>

        {/* CART */}
        <section className="cart-section">
          <div className="cart-container">
            <div className="cart-layout">

              {/* ITEMS */}
              <div className="cart-items-column">
                <div className="cart-items-header">
                  <span>
                    Your Bag
                  </span>

                  <span>
                    {itemCount} items
                  </span>
                </div>

                <div className="cart-items">
                  {cart.map((item) => {
                    const image =
                      getProductImage(item);

                    const stock =
                      typeof item.stock ===
                      "number"
                        ? item.stock
                        : null;

                    const isAtStockLimit =
                      stock !== null &&
                      item.quantity >= stock;

                    return (
                      <article
                        key={item.cartKey}
                        className="cart-item"
                      >
                        {/* PRODUCT IMAGE */}
                        <Link
                          to={`/product/${item.id}`}
                          className="cart-item-image"
                        >
                          {image ? (
                            <img
                              src={image}
                              alt={item.name}
                            />
                          ) : (
                            <div className="image-placeholder">
                              ANÉVORA
                            </div>
                          )}
                        </Link>

                        {/* PRODUCT INFO */}
                        <div className="cart-item-info">

                          <div className="cart-item-top">
                            <div>
                              <p className="cart-item-category">
                                {item.subcategory ||
                                  item.category}
                              </p>

                              <Link
                                to={`/product/${item.id}`}
                                className="cart-item-name"
                              >
                                {item.name}
                              </Link>
                            </div>

                            <button
                              type="button"
                              className="cart-remove-button"
                              onClick={() =>
                                removeFromCart(
                                  item.cartKey
                                )
                              }
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2
                                size={17}
                                strokeWidth={1.5}
                              />
                            </button>
                          </div>

                          {/* SELECTED OPTIONS */}
                          <div className="cart-item-options">

                            {item.selectedSize && (
                              <span>
                                Size:{" "}
                                <strong>
                                  {
                                    item.selectedSize
                                  }
                                </strong>
                              </span>
                            )}

                            {item.selectedColor ? (
                              <span>
                                Color:{" "}
                                <strong>
                                  {
                                    item.selectedColor
                                  }
                                </strong>
                              </span>
                            ) : item.colors?.[0] ? (
                              <span>
                                Color:{" "}
                                <strong>
                                  {
                                    item.colors[0]
                                  }
                                </strong>
                              </span>
                            ) : null}

                          </div>

                          {/* QUANTITY + PRICE */}
                          <div className="cart-item-bottom">

                            <div className="cart-quantity">
                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(
                                    item.cartKey
                                  )
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus
                                  size={14}
                                  strokeWidth={1.7}
                                />
                              </button>

                              <span>
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(
                                    item.cartKey
                                  )
                                }
                                aria-label="Increase quantity"
                                disabled={
                                  isAtStockLimit
                                }
                                title={
                                  isAtStockLimit
                                    ? "Maximum available stock reached"
                                    : "Increase quantity"
                                }
                              >
                                <Plus
                                  size={14}
                                  strokeWidth={1.7}
                                />
                              </button>
                            </div>

                            <div className="cart-item-price">
                              PKR{" "}
                              {formatPrice(
                                item.price *
                                  item.quantity
                              )}
                            </div>

                          </div>

                          {/* STOCK MESSAGE */}
                          {isAtStockLimit && (
                            <p
                              style={{
                                marginTop: "8px",
                                fontSize: "11px",
                                color: "#777",
                              }}
                            >
                              Maximum available stock reached.
                            </p>
                          )}

                        </div>
                      </article>
                    );
                  })}
                </div>

                {/* CONTINUE SHOPPING BUTTON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "28px",
                  }}
                >
                  <Link
                    to="/shop"
                    className="cart-continue-shopping"
                    style={{
                      backgroundColor: "#000000",
                      color: "#ffffff",
                      border: "1px solid #000000",
                      padding: "12px 22px",
                      borderRadius: "4px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: "600",
                      width: "fit-content",
                    }}
                  >
                    <ArrowLeft
                      size={16}
                      strokeWidth={1.5}
                    />

                    Continue shopping
                  </Link>
                </div>
              </div>

              {/* SUMMARY */}
              <aside className="cart-summary">
                <div className="cart-summary-inner">

                  <p className="eyebrow dark-eyebrow">
                    ORDER SUMMARY
                  </p>

                  <h2>
                    Your total
                  </h2>

                  <div className="cart-summary-lines">

                    <div>
                      <span>
                        Subtotal
                      </span>

                      <strong>
                        PKR{" "}
                        {formatPrice(
                          subtotal
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Delivery
                      </span>

                      <strong>
                        {deliveryFee === 0
                          ? "FREE"
                          : `PKR ${formatPrice(
                              deliveryFee
                            )}`}
                      </strong>
                    </div>

                  </div>

                  {subtotal > 0 &&
                    subtotal < 5000 && (
                      <p className="cart-delivery-note">
                        Add PKR{" "}
                        {formatPrice(
                          5000 - subtotal
                        )}{" "}
                        more for free
                        delivery.
                      </p>
                    )}

                  <div className="cart-total">
                    <span>
                      Total
                    </span>

                    <strong>
                      PKR{" "}
                      {formatPrice(total)}
                    </strong>
                  </div>

                  <Link
                    to="/checkout"
                    className="cart-checkout-button"
                  >
                    Proceed to Checkout

                    <ArrowRight
                      size={17}
                      strokeWidth={1.6}
                    />
                  </Link>

                  <div className="cart-trust-list">

                    <div>
                      <Truck
                        size={18}
                        strokeWidth={1.5}
                      />

                      <span>
                        Nationwide
                        delivery
                      </span>
                    </div>

                    <div>
                      <ShieldCheck
                        size={18}
                        strokeWidth={1.5}
                      />

                      <span>
                        Secure checkout
                      </span>
                    </div>

                  </div>

                </div>
              </aside>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}