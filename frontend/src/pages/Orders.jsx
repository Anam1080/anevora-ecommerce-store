import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  XCircle,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const imageFiles = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(
    Number(price) || 0
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getProductImage(product) {
  if (!product?.category || !product?.image) {
    return null;
  }

  const folder =
    product.category.toLowerCase();

  const key = `../assets/${folder}/${product.image}`;

  return imageFiles[key] || null;
}

export default function Orders() {
  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  const [cancellingOrderId, setCancellingOrderId] =
    useState(null);

  useEffect(() => {
    async function fetchOrders() {
      if (!isAuthenticated) {
        setLoading(false);

        navigate("/login", {
          replace: true,
        });

        return;
      }

      const token =
        localStorage.getItem(
          "anevora_token"
        );

      if (!token) {
        setLoading(false);

        navigate("/login", {
          replace: true,
        });

        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/orders/my-orders`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch your orders."
          );
        }

        setOrders(
          Array.isArray(data.orders)
            ? data.orders
            : []
        );
      } catch (fetchError) {
        console.error(
          "Orders fetch error:",
          fetchError
        );

        setError(
          fetchError.message ||
            "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [isAuthenticated, navigate]);

  // ==========================================
  // CANCEL ORDER
  // ==========================================

  async function handleCancelOrder(orderId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    const token =
      localStorage.getItem(
        "anevora_token"
      );

    if (!token) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    try {
      setCancellingOrderId(orderId);

      const response = await fetch(
        `${API_URL}/orders/${orderId}/cancel`,
        {
          method: "PATCH",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to cancel this order."
        );
      }

      // Update the order immediately
      // without refreshing the whole page.

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: "Cancelled",
              }
            : order
        )
      );
    } catch (cancelError) {
      console.error(
        "Cancel order error:",
        cancelError
      );

      window.alert(
        cancelError.message ||
          "Unable to cancel this order."
      );
    } finally {
      setCancellingOrderId(null);
    }
  }

  return (
    <div className="site-shell">
      <Navbar />

      <main className="orders-page">

        <section className="account-hero">
          <div>
            <p className="eyebrow dark-eyebrow">
              ACCOUNT
            </p>

            <h1>My orders</h1>

            <p>
              View your ANÉVORA purchases and
              order details.
            </p>
          </div>
        </section>


        <section className="orders-content">

          <Link
            to="/profile"
            className="back-link"
          >
            <ArrowLeft size={16} />
            Back to account
          </Link>


          {/* LOADING */}

          {loading ? (
            <div className="orders-empty">

              <div className="empty-icon">
                <Package
                  size={32}
                  strokeWidth={1.4}
                />
              </div>

              <p className="eyebrow dark-eyebrow">
                PLEASE WAIT
              </p>

              <h2>
                Loading your orders...
              </h2>

              <p>
                We are retrieving your order
                history.
              </p>

            </div>

          ) : error ? (

            /* ERROR */

            <div className="orders-empty">

              <div className="empty-icon">
                <Package
                  size={32}
                  strokeWidth={1.4}
                />
              </div>

              <p className="eyebrow dark-eyebrow">
                SOMETHING WENT WRONG
              </p>

              <h2>
                Unable to load orders.
              </h2>

              <p>
                {error}
              </p>

              <button
                type="button"
                className="dark-action-button"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try again
                <ArrowRight size={17} />
              </button>

            </div>

          ) : orders.length === 0 ? (

            /* EMPTY */

            <div className="orders-empty">

              <div className="empty-icon">
                <Package
                  size={32}
                  strokeWidth={1.4}
                />
              </div>

              <p className="eyebrow dark-eyebrow">
                NO ORDERS YET
              </p>

              <h2>
                Your order history is empty.
              </h2>

              <p>
                When you place an order, it will
                appear here.
              </p>

              <Link
                to="/shop"
                className="dark-action-button"
              >
                Explore the collection
                <ArrowRight size={17} />
              </Link>

            </div>

          ) : (

            /* ORDERS */

            <div className="orders-list">

              {orders.map((order) => (

                <article
                  className="order-card"
                  key={order._id}
                >

                  <div className="order-header">

                    <div>

                      <span className="order-label">
                        ORDER
                      </span>

                      <h2>
                        {order.orderNumber}
                      </h2>

                    </div>


                    <div className="order-meta">

                      <span className="order-status">
                        {order.status ||
                          "Processing"}
                      </span>

                      <span>
                        {formatDate(
                          order.createdAt
                        )}
                      </span>

                    </div>

                  </div>


                  <div className="order-items">

                    {order.items?.map(
                      (item, index) => {

                        const productImage =
                          getProductImage(
                            item
                          );

                        return (
                          <div
                            className="order-item"
                            key={
                              item.cartKey ||
                              `${order._id}-${item.productId}-${index}`
                            }
                          >

                            <div className="order-item-image">

                              {productImage ? (

                                <img
                                  src={
                                    productImage
                                  }
                                  alt={
                                    item.name ||
                                    "ANÉVORA product"
                                  }
                                />

                              ) : (

                                <div className="image-placeholder">
                                  <span>
                                    ANÉVORA
                                  </span>
                                </div>

                              )}

                            </div>


                            <div className="order-item-info">

                              <h3>
                                {item.name}
                              </h3>

                              <p>
                                {item.category}

                                {item.selectedSize
                                  ? ` · Size ${item.selectedSize}`
                                  : ""}

                                {item.selectedColor
                                  ? ` · ${item.selectedColor}`
                                  : ""}
                              </p>

                              <span>
                                Qty:{" "}
                                {item.quantity}
                              </span>

                            </div>


                            <strong>
                              PKR{" "}
                              {formatPrice(
                                Number(
                                  item.price
                                ) *
                                  Number(
                                    item.quantity
                                  )
                              )}
                            </strong>

                          </div>
                        );
                      }
                    )}

                  </div>


                  <div className="order-footer">

                    <span>
                      {order.paymentMethod ===
                      "cod"
                        ? "Cash on Delivery"
                        : "Card Payment"}
                    </span>


                    <div>
                      <span>
                        Total
                      </span>

                      <strong>
                        PKR{" "}
                        {formatPrice(
                          order.total
                        )}
                      </strong>
                    </div>

                  </div>


                  {/* CANCEL ORDER */}

                  {[
                    "Processing",
                    "Confirmed",
                  ].includes(order.status) && (

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "flex-end",
                        marginTop: "18px",
                        paddingTop: "18px",
                        borderTop:
                          "1px solid rgba(0,0,0,0.08)",
                      }}
                    >

                      <button
                        type="button"
                        onClick={() =>
                          handleCancelOrder(
                            order._id
                          )
                        }
                        disabled={
                          cancellingOrderId ===
                          order._id
                        }
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding:
                            "10px 16px",
                          border:
                            "1px solid rgba(150,0,0,0.25)",
                          background:
                            "transparent",
                          color:
                            "#8b1e1e",
                          cursor:
                            cancellingOrderId ===
                            order._id
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            cancellingOrderId ===
                            order._id
                              ? 0.6
                              : 1,
                          fontSize:
                            "13px",
                          fontWeight: 600,
                          letterSpacing:
                            "0.02em",
                        }}
                      >

                        <XCircle
                          size={16}
                          strokeWidth={1.6}
                        />

                        {cancellingOrderId ===
                        order._id
                          ? "Cancelling..."
                          : "Cancel Order"}

                      </button>

                    </div>

                  )}

                </article>

              ))}

            </div>

          )}

        </section>

      </main>

      <Footer />
    </div>
  );
}