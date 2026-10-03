import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  LogOut,
  Package,
  UserRound,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Profile() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase() || "A";

  return (
    <div className="site-shell">
      <Navbar />

      <main className="account-page">
        <section className="account-hero">
          <div>
            <p className="eyebrow dark-eyebrow">
              MY ACCOUNT
            </p>

            <h1>Welcome, {user?.name || "ANÉVORA member"}.</h1>

            <p>
              Manage your account, orders and saved pieces
              from one place.
            </p>
          </div>
        </section>

        <section className="account-content">
          <div className="profile-card">
            <div className="profile-avatar">
              {initials}
            </div>

            <div className="profile-main-info">
              <p className="profile-label">MEMBER</p>

              <h2>{user?.name}</h2>

              <p>{user?.email}</p>

              <span className="profile-role">
                {user?.role === "admin"
                  ? "Administrator"
                  : "Customer"}
              </span>
            </div>

            <button
              type="button"
              className="outline-action-button"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </div>

          <div className="account-grid">
            <Link
              to="/orders"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <Package size={22} strokeWidth={1.6} />
              </div>

              <div>
                <span>ORDERS</span>
                <h3>My orders</h3>
                <p>
                  Track your purchases and order history.
                </p>
              </div>

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/wishlist"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <Heart size={22} strokeWidth={1.6} />
              </div>

              <div>
                <span>WISHLIST</span>
                <h3>Saved pieces</h3>
                <p>
                  Revisit the pieces you love.
                </p>
              </div>

              <strong>{wishlistCount}</strong>
            </Link>

            <Link
              to="/cart"
              className="account-action-card"
            >
              <div className="account-action-icon">
                <UserRound
                  size={22}
                  strokeWidth={1.6}
                />
              </div>

              <div>
                <span>SHOPPING BAG</span>
                <h3>Current bag</h3>
                <p>
                  Continue with the pieces in your bag.
                </p>
              </div>

              <strong>{itemCount}</strong>
            </Link>
          </div>

          {user?.role === "admin" && (
            <div className="admin-profile-banner">
              <div>
                <p className="profile-label">
                  ADMIN ACCESS
                </p>

                <h3>ANÉVORA Administration</h3>

                <p>
                  Manage products, orders and customers.
                </p>
              </div>

              <Link
                to="/admin"
                className="dark-action-button"
              >
                Open dashboard
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}