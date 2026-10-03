
import { Route, Routes } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import Wishlist from "../pages/Wishlist";

import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminOrders from "../pages/AdminOrders";
import AdminUsers from "../pages/AdminUsers";

function NotFound() {
  return (
    <>
      <Navbar />

      <main className="empty-page">
        <p className="eyebrow dark-eyebrow">
          404
        </p>

        <h1>
          Page not found.
        </h1>

        <p>
          The page you are looking for does not exist.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* =========================
            AUTH
        ========================== */}

        {/* Login is public */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register is public */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* =========================
            PROTECTED CUSTOMER WEBSITE
        ========================== */}

        <Route element={<ProtectedRoute />}>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* SHOP */}
          <Route
            path="/shop"
            element={
              <CategoryPage category="All" />
            }
          />

          {/* CATEGORIES */}
          <Route
            path="/clothes"
            element={
              <CategoryPage category="Clothes" />
            }
          />

          <Route
            path="/bags"
            element={
              <CategoryPage category="Bags" />
            }
          />

          <Route
            path="/jewelry"
            element={
              <CategoryPage category="Jewelry" />
            }
          />

          <Route
            path="/abaya"
            element={
              <CategoryPage category="Abaya" />
            }
          />

          <Route
            path="/shoes"
            element={
              <CategoryPage category="Shoes" />
            }
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          {/* CART */}
          <Route
            path="/cart"
            element={<Cart />}
          />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={<Checkout />}
          />

          {/* WISHLIST */}
          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          {/* CUSTOMER ACCOUNT */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

        </Route>

        {/* =========================
            ADMIN
        ========================== */}

        <Route
          element={
            <ProtectedRoute adminOnly />
          }
        >

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/orders/*"
            element={<AdminOrders />}
          />

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

        </Route>

        {/* =========================
            404
        ========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </>
  );
}
