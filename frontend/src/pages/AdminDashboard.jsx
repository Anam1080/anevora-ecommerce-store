import {
  ArrowRight,
  Box,
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL ||
"https://anevora-ecommerce-store-production.up.railway.app/api";

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(
    Number(price) || 0
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

  const [loadingOrders, setLoadingOrders] =
    useState(true);

  const [productError, setProductError] =
    useState("");

  const [orderError, setOrderError] =
    useState("");

  // ===============================
  // FETCH ADMIN PRODUCTS
  // ===============================

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoadingProducts(true);
        setProductError("");

        const token =
          localStorage.getItem("anevora_token");

        const response = await fetch(
          `${API_URL}/admin/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch products."
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error(
          "Admin dashboard products error:",
          error
        );

        setProductError(
          error.message ||
            "Unable to load products."
        );
      } finally {
        setLoadingProducts(false);
      }
    }

    if (user) {
      fetchProducts();
    }
  }, [user]);

  // ===============================
  // FETCH ADMIN ORDERS
  // ===============================

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoadingOrders(true);
        setOrderError("");

        const token =
          localStorage.getItem("anevora_token");

        const response = await fetch(
          `${API_URL}/admin/orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch orders."
          );
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error(
          "Admin dashboard orders error:",
          error
        );

        setOrderError(
          error.message ||
            "Unable to load orders."
        );
      } finally {
        setLoadingOrders(false);
      }
    }

    if (user) {
      fetchOrders();
    }
  }, [user]);

  // ===============================
  // PRODUCT STATISTICS
  // ===============================

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.isActive
  ).length;

  const featuredCount = products.filter(
    (product) => product.featured
  ).length;

  const clothesCount = products.filter(
    (product) =>
      product.category === "Clothes"
  ).length;

  const bagsCount = products.filter(
    (product) =>
      product.category === "Bags"
  ).length;

  const jewelryCount = products.filter(
    (product) =>
      product.category === "Jewelry"
  ).length;

  // ===============================
  // ORDER STATISTICS
  // ===============================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Processing"
  ).length;

  const totalCustomers = useMemo(() => {
    const customerEmails = new Set();

    orders.forEach((order) => {
      if (order.customer?.email) {
        customerEmails.add(
          order.customer.email
        );
      }
    });

    return customerEmails.size;
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders
      .filter(
        (order) =>
          order.status !== "Cancelled"
      )
      .reduce(
        (total, order) =>
          total + Number(order.total || 0),
        0
      );
  }, [orders]);

  // ===============================
  // CATEGORY PERCENTAGES
  // ===============================

  const clothesPercentage =
    totalProducts > 0
      ? (clothesCount / totalProducts) *
        100
      : 0;

  const bagsPercentage =
    totalProducts > 0
      ? (bagsCount / totalProducts) *
        100
      : 0;

  const jewelryPercentage =
    totalProducts > 0
      ? (jewelryCount / totalProducts) *
        100
      : 0;

  // ===============================
  // LOADING
  // ===============================

  const isLoading =
    loadingProducts ||
    loadingOrders;

  return (
    <div className="site-shell admin-shell">
      <Navbar />

      <main className="admin-page">

        {/* =========================
            HEADER
        ========================== */}

        <section className="admin-header">
          <div>
            <p className="eyebrow dark-eyebrow">
              ANÉVORA ADMIN
            </p>

            <h1>Dashboard</h1>

            <p>
              Manage your store, products,
              orders and customers from one
              place.
            </p>
          </div>

          <Link
            to="/shop"
            className="dark-action-button"
          >
            View storefront
            <ArrowRight size={17} />
          </Link>
        </section>

        {/* =========================
            ERROR MESSAGE
        ========================== */}

        {(productError ||
          orderError) && (
          <div
            className="admin-note"
            style={{
              marginBottom: "24px",
            }}
          >
            {productError ||
              orderError}
          </div>
        )}

        {/* =========================
            MAIN STATS
        ========================== */}

        <section className="admin-stats">

          {/* TOTAL PRODUCTS */}

          <article className="admin-stat-card">
            <div className="admin-stat-icon">
              <Box size={21} />
            </div>

            <span>
              Total products
            </span>

            <strong>
              {loadingProducts
                ? "..."
                : totalProducts}
            </strong>

            <small>
              {activeProducts} active products
            </small>
          </article>

          {/* FEATURED PRODUCTS */}

          <article className="admin-stat-card">
            <div className="admin-stat-icon">
              <ShoppingBag size={21} />
            </div>

            <span>
              Featured products
            </span>

            <strong>
              {loadingProducts
                ? "..."
                : featuredCount}
            </strong>

            <small>
              Displayed on homepage
            </small>
          </article>

          {/* ORDERS */}

          <article className="admin-stat-card">
            <div className="admin-stat-icon">
              <Package size={21} />
            </div>

            <span>Orders</span>

            <strong>
              {loadingOrders
                ? "..."
                : totalOrders}
            </strong>

            <small>
              {pendingOrders} awaiting processing
            </small>
          </article>

          {/* CUSTOMERS */}

          <article className="admin-stat-card">
            <div className="admin-stat-icon">
              <Users size={21} />
            </div>

            <span>Customers</span>

            <strong>
              {loadingOrders
                ? "..."
                : totalCustomers}
            </strong>

            <small>
              Customers with orders
            </small>
          </article>
        </section>

        {/* =========================
            REVENUE SUMMARY
        ========================== */}

        <section className="admin-content-grid">

          <div className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <span>
                  STORE REVENUE
                </span>

                <h2>
                  ₨{" "}
                  {loadingOrders
                    ? "..."
                    : formatPrice(
                        totalRevenue
                      )}
                </h2>
              </div>

              <DollarSign size={22} />
            </div>

            <div className="admin-note">
              Revenue is calculated from
              non-cancelled customer orders.
            </div>
          </div>

          {/* STORE STATUS */}

          <div className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <span>
                  STORE STATUS
                </span>

                <h2>ANÉVORA</h2>
              </div>
            </div>

            <div className="admin-status-list">

              <div>
                <span className="status-dot active" />

                <span>
                  Storefront
                </span>

                <strong>
                  Live
                </strong>
              </div>

              <div>
                <span className="status-dot active" />

                <span>
                  Product catalogue
                </span>

                <strong>
                  Ready
                </strong>
              </div>

              <div>
                <span className="status-dot active" />

                <span>
                  MongoDB
                </span>

                <strong>
                  Connected
                </strong>
              </div>

              <div>
                <span className="status-dot pending" />

                <span>
                  Payment gateway
                </span>

                <strong>
                  Demo
                </strong>
              </div>

            </div>

            <div className="admin-note">
              Store data is now being loaded
              from the ANÉVORA backend and
              MongoDB database.
            </div>
          </div>
        </section>

        {/* =========================
            COLLECTIONS
        ========================== */}

        <section className="admin-content-grid">

          <div className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <span>
                  COLLECTIONS
                </span>

                <h2>
                  Product overview
                </h2>
              </div>

              <Link to="/admin/products">
                Manage products
                <ArrowRight size={15} />
              </Link>
            </div>

            {isLoading ? (
              <div className="admin-empty-row">
                Loading product data...
              </div>
            ) : (
              <div className="collection-overview">

                {/* CLOTHES */}

                <div className="collection-row">
                  <span>
                    Clothes
                  </span>

                  <strong>
                    {clothesCount}
                  </strong>

                  <div>
                    <span
                      style={{
                        width: `${clothesPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* BAGS */}

                <div className="collection-row">
                  <span>
                    Bags
                  </span>

                  <strong>
                    {bagsCount}
                  </strong>

                  <div>
                    <span
                      style={{
                        width: `${bagsPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* JEWELRY */}

                <div className="collection-row">
                  <span>
                    Jewelry
                  </span>

                  <strong>
                    {jewelryCount}
                  </strong>

                  <div>
                    <span
                      style={{
                        width: `${jewelryPercentage}%`,
                      }}
                    />
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <div className="admin-panel">
            <div className="admin-panel-heading">
              <div>
                <span>
                  ORDERS
                </span>

                <h2>
                  Recent activity
                </h2>
              </div>

              <Link to="/admin/orders">
                View orders
                <ArrowRight size={15} />
              </Link>
            </div>

            {loadingOrders ? (
              <div className="admin-empty-row">
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="admin-empty-row">
                No customer orders yet.
              </div>
            ) : (
              <div className="admin-status-list">

                {orders
                  .slice(0, 4)
                  .map((order) => (
                    <div
                      key={order._id}
                    >
                      <span
                        className={`status-dot ${
                          order.status ===
                          "Cancelled"
                            ? "pending"
                            : "active"
                        }`}
                      />

                      <span>
                        {order.orderNumber}
                      </span>

                      <strong>
                        ₨{" "}
                        {formatPrice(
                          order.total
                        )}
                      </strong>
                    </div>
                  ))}

              </div>
            )}
          </div>
        </section>

        {/* =========================
            QUICK LINKS
        ========================== */}

        <section className="admin-quick-links">

          <Link to="/admin/products">
            <Box size={20} />

            <span>
              <strong>
                Products
              </strong>

              <small>
                Manage catalogue
              </small>
            </span>

            <ArrowRight size={17} />
          </Link>

          <Link to="/admin/orders">
            <Package size={20} />

            <span>
              <strong>
                Orders
              </strong>

              <small>
                Process customer orders
              </small>
            </span>

            <ArrowRight size={17} />
          </Link>

          <Link to="/admin/users">
            <Users size={20} />

            <span>
              <strong>
                Users
              </strong>

              <small>
                Manage customers
              </small>
            </span>

            <ArrowRight size={17} />
          </Link>

        </section>

      </main>

      <Footer />
    </div>
  );
}