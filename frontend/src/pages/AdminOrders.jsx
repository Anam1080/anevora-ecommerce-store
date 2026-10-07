import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Package,
  Search,
  X,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://anevora-ecommerce-store-production.up.railway.app/api"
function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(
    price || 0
  );
}

const STATUS_OPTIONS = [
  "Processing",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrders() {
  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState("All");

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  // ===============================
  // FETCH ORDERS FROM BACKEND
  // ===============================

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem(
            "anevora_token"
          );

        const response = await fetch(
          `${API_URL}/admin/orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch orders."
          );
        }

        setOrders(
          data.orders || []
        );
      } catch (err) {
        console.error(
          "Admin orders error:",
          err
        );

        setError(
          err.message ||
            "Unable to load orders."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  // ===============================
  // FILTER ORDERS
  // ===============================

  const filteredOrders = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return orders.filter((order) => {
      const orderNumber =
        order.orderNumber
          ?.toLowerCase() || "";

      const customerName =
        `${order.customer?.firstName || ""} ${
          order.customer?.lastName || ""
        }`
          .trim()
          .toLowerCase();

      const customerEmail =
        order.customer?.email
          ?.toLowerCase() || "";

      const matchesSearch =
        !searchText ||
        orderNumber.includes(searchText) ||
        customerName.includes(searchText) ||
        customerEmail.includes(searchText);

      const orderStatus =
        order.status || "Processing";

      const matchesStatus =
        status === "All" ||
        orderStatus === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [orders, search, status]);

  // ===============================
  // VIEW ORDER
  // ===============================

  async function handleViewOrder(orderId) {
    try {
      const token =
        localStorage.getItem(
          "anevora_token"
        );

      const response = await fetch(
        `${API_URL}/admin/orders/${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to fetch order details."
        );
      }

      setSelectedOrder(
        data.order
      );
    } catch (err) {
      console.error(
        "Order details error:",
        err
      );

      setError(
        err.message ||
          "Unable to load order details."
      );
    }
  }

  // ===============================
  // UPDATE ORDER STATUS
  // ===============================

  async function handleStatusUpdate(
    orderId,
    newStatus
  ) {
    try {
      setUpdatingStatus(true);

      const token =
        localStorage.getItem(
          "anevora_token"
        );

      const response = await fetch(
        `${API_URL}/admin/orders/${orderId}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update order status."
        );
      }

      // Update order in list
      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );

      // Update currently opened order
      setSelectedOrder((currentOrder) =>
        currentOrder &&
        currentOrder._id === orderId
          ? {
              ...currentOrder,
              status: newStatus,
            }
          : currentOrder
      );
    } catch (err) {
      console.error(
        "Update order status error:",
        err
      );

      setError(
        err.message ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  }

  return (
    <div className="site-shell admin-orders-shell">
      <Navbar />

      <main className="admin-orders-page">
        {/* HEADER */}

        <section className="admin-orders-header">
          <div>
            <p className="eyebrow dark-eyebrow">
              SALES
            </p>

            <h1>Orders</h1>

            <p>
              Review and manage customer purchases
              across ANÉVORA.
            </p>
          </div>

          <div className="admin-orders-count">
            <span>
              {loading
                ? "..."
                : filteredOrders.length}
            </span>

            <small>
              {filteredOrders.length === 1
                ? "Order"
                : "Orders"}
            </small>
          </div>
        </section>

        {/* TOOLBAR */}

        <section className="admin-orders-toolbar">
          <div className="admin-orders-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search order ID or customer..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <div className="admin-orders-filters">
            {[
              "All",
              "Processing",
              "Confirmed",
              "Shipped",
              "Delivered",
              "Cancelled",
            ].map((item) => (
              <button
                type="button"
                key={item}
                className={
                  status === item
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setStatus(item)
                }
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <section className="admin-orders-empty">
            <div className="admin-orders-empty-icon">
              <Package
                size={36}
                strokeWidth={1.3}
              />
            </div>

            <p className="eyebrow dark-eyebrow">
              ERROR
            </p>

            <h2>
              Unable to load orders.
            </h2>

            <p>{error}</p>
          </section>
        )}

        {/* LOADING */}

        {!error && loading && (
          <section className="admin-orders-empty">
            <div className="admin-orders-empty-icon">
              <Package
                size={36}
                strokeWidth={1.3}
              />
            </div>

            <p className="eyebrow dark-eyebrow">
              ORDERS
            </p>

            <h2>
              Loading customer orders...
            </h2>

            <p>
              Fetching orders from MongoDB.
            </p>
          </section>
        )}

        {/* EMPTY */}

        {!error &&
          !loading &&
          filteredOrders.length === 0 && (
            <section className="admin-orders-empty">
              <div className="admin-orders-empty-icon">
                <Package
                  size={36}
                  strokeWidth={1.3}
                />
              </div>

              <p className="eyebrow dark-eyebrow">
                NO ORDERS
              </p>

              <h2>
                No orders to display.
              </h2>

              <p>
                Customer orders will appear here
                after checkout.
              </p>
            </section>
          )}

        {/* ORDERS */}

        {!error &&
          !loading &&
          filteredOrders.length > 0 && (
            <section className="admin-orders-list">
              {filteredOrders.map(
                (order) => {
                  const orderStatus =
                    order.status ||
                    "Processing";

                  const customerName =
                    `${order.customer?.firstName || ""} ${
                      order.customer?.lastName || ""
                    }`.trim();

                  return (
                    <article
                      className="admin-order-card"
                      key={order._id}
                    >
                      <div className="admin-order-main">
                        <div className="admin-order-customer">
                          <span className="admin-order-label">
                            ORDER
                          </span>

                          <h2>
                            {order.orderNumber}
                          </h2>

                          <p>
                            {customerName ||
                              "Customer"}
                          </p>

                          <small>
                            {
                              order.customer
                                ?.email
                            }
                          </small>
                        </div>

                        <div className="admin-order-summary">
                          <strong>
                            PKR{" "}
                            {formatPrice(
                              order.total
                            )}
                          </strong>

                          <span>
                            {order.paymentMethod ===
                            "cod"
                              ? "Cash on Delivery"
                              : "Card Payment"}
                          </span>

                          <span>
                            {order.items
                              ?.length || 0}{" "}
                            item
                            {order.items
                              ?.length === 1
                              ? ""
                              : "s"}
                          </span>
                        </div>
                      </div>

                      <div className="admin-order-footer">
                        <span
                          className={`admin-order-status status-${orderStatus
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            )}`}
                        >
                          {orderStatus}
                        </span>

                        <button
                          type="button"
                          className="admin-view-button"
                          onClick={() =>
                            handleViewOrder(
                              order._id
                            )
                          }
                        >
                          View order

                          <ArrowRight
                            size={15}
                          />
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
            </section>
          )}
      </main>

      {/* ===============================
          ORDER DETAILS MODAL
      =============================== */}

      {selectedOrder && (
        <div
          className="admin-order-modal-backdrop"
          onClick={() =>
            setSelectedOrder(null)
          }
        >
          <section
            className="admin-order-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* MODAL HEADER */}

            <div className="admin-order-modal-header">
              <div>
                <p className="eyebrow dark-eyebrow">
                  ORDER DETAILS
                </p>

                <h2>
                  {
                    selectedOrder.orderNumber
                  }
                </h2>
              </div>

              <button
                type="button"
                className="admin-order-modal-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
                aria-label="Close order details"
              >
                <X size={20} />
              </button>
            </div>

            {/* CUSTOMER */}

            <div className="admin-order-detail-section">
              <h3>
                Customer Information
              </h3>

              <div className="admin-order-detail-grid">
                <div>
                  <strong>
                    Name
                  </strong>

                  <span>
                    {
                      selectedOrder.customer
                        ?.firstName
                    }{" "}
                    {
                      selectedOrder.customer
                        ?.lastName
                    }
                  </span>
                </div>

                <div>
                  <strong>
                    <Mail size={14} />
                    Email
                  </strong>

                  <span>
                    {
                      selectedOrder.customer
                        ?.email
                    }
                  </span>
                </div>

                <div>
                  <strong>
                    <Phone size={14} />
                    Phone
                  </strong>

                  <span>
                    {
                      selectedOrder.customer
                        ?.phone
                    }
                  </span>
                </div>

                <div>
                  <strong>
                    <MapPin size={14} />
                    Address
                  </strong>

                  <span>
                    {
                      selectedOrder.customer
                        ?.address
                    }
                    ,{" "}
                    {
                      selectedOrder.customer
                        ?.city
                    }
                    ,{" "}
                    {
                      selectedOrder.customer
                        ?.province
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* ITEMS */}

            <div className="admin-order-detail-section">
              <h3>
                Order Items
              </h3>

              <div className="admin-order-items">
                {selectedOrder.items?.map(
                  (item, index) => (
                    <div
                      className="admin-order-item"
                      key={`${item.productId}-${index}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="admin-order-item-info">
                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          {item.category}
                        </span>

                        {item.selectedSize && (
                          <small>
                            Size:{" "}
                            {
                              item.selectedSize
                            }
                          </small>
                        )}

                        {item.selectedColor && (
                          <small>
                            Color:{" "}
                            {
                              item.selectedColor
                            }
                          </small>
                        )}
                      </div>

                      <div className="admin-order-item-price">
                        <strong>
                          PKR{" "}
                          {formatPrice(
                            item.price
                          )}
                        </strong>

                        <span>
                          Qty:{" "}
                          {item.quantity}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* PAYMENT */}

            <div className="admin-order-detail-section">
              <h3>
                Payment & Summary
              </h3>

              <div className="admin-order-summary-details">
                <div>
                  <span>
                    Payment Method
                  </span>

                  <strong>
                    {selectedOrder.paymentMethod ===
                    "cod"
                      ? "Cash on Delivery"
                      : "Card Payment"}
                  </strong>
                </div>

                <div>
                  <span>
                    Payment Status
                  </span>

                  <strong>
                    {
                      selectedOrder.paymentStatus
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Subtotal
                  </span>

                  <strong>
                    PKR{" "}
                    {formatPrice(
                      selectedOrder.subtotal
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Delivery
                  </span>

                  <strong>
                    PKR{" "}
                    {formatPrice(
                      selectedOrder.deliveryFee
                    )}
                  </strong>
                </div>

                <div className="total">
                  <span>
                    Total
                  </span>

                  <strong>
                    PKR{" "}
                    {formatPrice(
                      selectedOrder.total
                    )}
                  </strong>
                </div>
              </div>
            </div>

            {/* STATUS */}

            <div className="admin-order-detail-section">
              <h3>
                Update Order Status
              </h3>

              <select
                value={
                  selectedOrder.status ||
                  "Processing"
                }
                disabled={
                  updatingStatus
                }
                onChange={(event) =>
                  handleStatusUpdate(
                    selectedOrder._id,
                    event.target.value
                  )
                }
              >
                {STATUS_OPTIONS.map(
                  (item) => (
                    <option
                      value={item}
                      key={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              {updatingStatus && (
                <p>
                  Updating order status...
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}