
import { Link } from "react-router-dom";

function Footer() {
  function handleNewsletterSubmit(event) {
    event.preventDefault();

    alert("Thank you for subscribing to ANÉVORA.");
  }

  return (
    <footer className="footer">

      <div className="footer-inner">

        {/* =====================================================
            FOOTER MAIN
            ===================================================== */}

        <div className="footer-main">

          {/* =================================================
              BRAND
              ================================================= */}

          <div className="footer-brand">

            <Link
              to="/"
              className="footer-logo"
            >
              ANÉVORA
            </Link>

            <p>
              Contemporary fashion for your
              individual sense of style.
            </p>


            {/* SOCIAL LINKS */}

            <div className="footer-socials">

              {/* Instagram */}

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="Instagram"
              >
                <span className="footer-icon instagram-icon">
                  ◎
                </span>
              </a>


              {/* GitHub */}

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <span className="footer-icon github-icon">
                  GH
                </span>
              </a>


              {/* Email */}

              <a
                href="mailto:hello@anevora.com"
                className="footer-social-link"
                aria-label="Email ANÉVORA"
              >
                <span className="footer-icon mail-icon">
                  @
                </span>
              </a>


              {/* Wishlist */}

              <Link
                to="/wishlist"
                className="footer-social-link"
                aria-label="Wishlist"
              >
                <span className="footer-icon heart-icon">
                  ♡
                </span>
              </Link>

            </div>

          </div>


          {/* =================================================
              SHOP
              ================================================= */}

          <div className="footer-column">

            <h3>
              SHOP
            </h3>

            <Link to="/clothes">
              Clothes
            </Link>

            <Link to="/bags">
              Bags
            </Link>

            <Link to="/jewelry">
              Jewelry
            </Link>

            <Link to="/abaya">
              Abaya
            </Link>

            <Link to="/shoes">
              Shoes
            </Link>

            <Link to="/shop">
              Shop All
            </Link>

          </div>


          {/* =================================================
              CUSTOMER CARE
              ================================================= */}

          <div className="footer-column">

            <h3>
              CUSTOMER CARE
            </h3>

            <Link to="/contact">
              Contact Us
            </Link>

            <Link to="/shipping">
              Shipping & Delivery
            </Link>

            <Link to="/returns">
              Returns & Exchanges
            </Link>

            <Link to="/faq">
              FAQ
            </Link>

          </div>


          {/* =================================================
              ABOUT
              ================================================= */}

          <div className="footer-column">

            <h3>
              ABOUT
            </h3>

            <Link to="/about">
              About ANÉVORA
            </Link>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>

            <Link to="/wishlist">
              Wishlist
            </Link>

          </div>

        </div>


        {/* =====================================================
            NEWSLETTER
            ===================================================== */}

        <div className="footer-newsletter">

          <div className="footer-newsletter-text">

            <span>
              STAY CONNECTED
            </span>

            <h3>
              Join the ANÉVORA circle.
            </h3>

            <p>
              Receive collection updates,
              new arrivals and exclusive edits.
            </p>

          </div>


          <form
            onSubmit={handleNewsletterSubmit}
            className="footer-newsletter-form"
          >

            <span className="newsletter-mail-icon">
              @
            </span>

            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              required
            />

            <button
              type="submit"
              aria-label="Subscribe to newsletter"
            >
              →
            </button>

          </form>

        </div>


        {/* =====================================================
            FOOTER BOTTOM
            ===================================================== */}

        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} ANÉVORA.
            All rights reserved.
          </span>

          <span>
            Designed with intention.
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;

