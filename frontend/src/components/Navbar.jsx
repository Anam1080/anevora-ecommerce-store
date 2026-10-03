
import { useState } from "react";
import {
  Search,
  ShoppingBag,
  UserRound,
  Heart,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user } = useAuth();

  const navigate = useNavigate();

  function handleSearchSubmit(event) {
    event.preventDefault();

    const value = searchValue.trim();

    if (!value) return;

    navigate(`/shop?search=${encodeURIComponent(value)}`);

    setSearchOpen(false);
    setSearchValue("");
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">
        <div className="navbar-inner">

          {/* LOGO */}

          <Link
            to="/"
            className="navbar-brand"
            onClick={closeMobileMenu}
          >
            ANÉVORA
          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav className="navbar-links">

            <NavLink to="/">
              Home
            </NavLink>

            <NavLink to="/clothes">
              Clothes
            </NavLink>

            <NavLink to="/bags">
              Bags
            </NavLink>

            <NavLink to="/jewelry">
              Jewelry
            </NavLink>

            <NavLink to="/abaya">
              Abaya
            </NavLink>

            <NavLink to="/shoes">
              Shoes
            </NavLink>

            <NavLink to="/shop">
              Shop All
            </NavLink>

          </nav>


          {/* RIGHT ACTIONS */}

          <div className="navbar-actions">

            {/* SEARCH */}

            <button
              type="button"
              className="navbar-icon-button"
              onClick={() => setSearchOpen((value) => !value)}
              aria-label="Search"
            >
              <Search
                size={17}
                strokeWidth={1.5}
              />
            </button>


            {/* WISHLIST */}

            <Link
              to="/wishlist"
              className="navbar-icon-button navbar-action-link"
              aria-label="Wishlist"
            >
              <Heart
                size={17}
                strokeWidth={1.5}
              />

              {wishlistCount > 0 && (
                <span className="navbar-count">
                  {wishlistCount}
                </span>
              )}
            </Link>


            {/* ACCOUNT */}

            <Link
              to={user ? "/profile" : "/login"}
              className="navbar-icon-button navbar-action-link"
              aria-label="Account"
            >
              <UserRound
                size={17}
                strokeWidth={1.5}
              />
            </Link>


            {/* CART */}

            <Link
              to="/cart"
              className="navbar-icon-button navbar-action-link"
              aria-label="Shopping bag"
            >
              <ShoppingBag
                size={17}
                strokeWidth={1.5}
              />

              {itemCount > 0 && (
                <span className="navbar-count">
                  {itemCount}
                </span>
              )}
            </Link>


            {/* MOBILE MENU */}

            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
            >
              {mobileOpen ? (
                <X
                  size={19}
                  strokeWidth={1.5}
                />
              ) : (
                <Menu
                  size={19}
                  strokeWidth={1.5}
                />
              )}
            </button>

          </div>

        </div>


        {/* ===================================================
            SEARCH PANEL
        =================================================== */}

        {searchOpen && (
          <div className="search-panel">

            <form
              className="search-panel-inner"
              onSubmit={handleSearchSubmit}
            >

              <Search
                size={18}
                strokeWidth={1.5}
              />

              <input
                type="text"
                value={searchValue}
                onChange={(event) =>
                  setSearchValue(event.target.value)
                }
                placeholder="Search clothes, bags, jewelry, abayas, shoes..."
                autoFocus
              />

              <button
                type="submit"
                className="search-submit"
              >
                SEARCH

                <ArrowRight
                  size={15}
                />
              </button>

            </form>

          </div>
        )}


        {/* ===================================================
            MOBILE MENU
        =================================================== */}

        {mobileOpen && (
          <div className="mobile-menu">

            <div className="mobile-menu-inner">

              <p className="mobile-menu-label">
                ANÉVORA COLLECTION
              </p>


              <nav className="mobile-menu-links">

                <Link
                  to="/"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>

                <Link
                  to="/clothes"
                  onClick={closeMobileMenu}
                >
                  Clothes
                </Link>

                <Link
                  to="/bags"
                  onClick={closeMobileMenu}
                >
                  Bags
                </Link>

                <Link
                  to="/jewelry"
                  onClick={closeMobileMenu}
                >
                  Jewelry
                </Link>

                <Link
                  to="/abaya"
                  onClick={closeMobileMenu}
                >
                  Abaya
                </Link>

                <Link
                  to="/shoes"
                  onClick={closeMobileMenu}
                >
                  Shoes
                </Link>

                <Link
                  to="/shop"
                  onClick={closeMobileMenu}
                >
                  Shop All
                </Link>

              </nav>


              <div className="mobile-menu-bottom">

                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                >
                  Wishlist
                </Link>

                <Link
                  to={user ? "/profile" : "/login"}
                  onClick={closeMobileMenu}
                >
                  {user ? "My Account" : "Login"}
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                >
                  Shopping Bag

                  {itemCount > 0 &&
                    ` (${itemCount})`}
                </Link>

              </div>

            </div>

          </div>
        )}

      </header>
    </>
  );
}

