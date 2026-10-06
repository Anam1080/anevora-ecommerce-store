import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const imageFiles = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://anevora-ecommerce-store-production-c300.up.railway.app/api"

function formatPrice(price) {
  return new Intl.NumberFormat("en-PK").format(
    Number(price) || 0
  );
}

export default function Checkout() {
  const {
    cart,
    subtotal,
    clearCart,
  } = useCart();

  const {
    user,
    isAuthenticated,
  } = useAuth();

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [orderPlaced, setOrderPlaced] =
    useState(false);

  const [orderNumber, setOrderNumber] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] = useState({
    firstName:
      user?.name?.split(" ")[0] || "",

    lastName:
      user?.name
        ?.split(" ")
        .slice(1)
        .join(" ") || "",

    email:
      user?.email || "",

    phone: "",

    address: "",

    city: "Lahore",

    province: "Punjab",

    postalCode: "",
  });

  const [cardForm, setCardForm] =
    useState({
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });

  const deliveryFee =
    subtotal >= 5000
      ? 0
      : 250;

  const total =
    subtotal + deliveryFee;

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  function handleCardChange(event) {
    const {
      name,
      value,
    } = event.target;

    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(
          /(.{4})/g,
          "$1 "
        )
        .trim();
    }

    if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4);

      if (
        formattedValue.length >= 3
      ) {
        formattedValue =
          formattedValue.slice(
            0,
            2
          ) +
          "/" +
          formattedValue.slice(
            2
          );
      }
    }

    if (name === "cvv") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 3);
    }

    setCardForm((current) => ({
      ...current,
      [name]: formattedValue,
    }));

    if (error) {
      setError("");
    }
  }

  function validateCardPayment() {
    if (
      !cardForm.cardName.trim()
    ) {
      return "Please enter the cardholder name.";
    }

    const cardNumber =
      cardForm.cardNumber.replace(
        /\s/g,
        ""
      );

    if (
      cardNumber.length !== 16
    ) {
      return "Please enter a valid 16-digit demo card number.";
    }

    if (
      !/^\d{2}\/\d{2}$/.test(
        cardForm.expiry
      )
    ) {
      return "Please enter expiry date in MM/YY format.";
    }

    if (
      cardForm.cvv.length !== 3
    ) {
      return "Please enter a valid 3-digit demo CVV.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");

    if (!isAuthenticated) {
      setError(
        "Please sign in before placing your order."
      );

      return;
    }

    if (!cart.length) {
      setError(
        "Your shopping bag is empty."
      );

      return;
    }

    const token =
      localStorage.getItem(
        "anevora_token"
      );

    if (!token) {
      setError(
        "Your login session has expired. Please sign in again."
      );

      return;
    }

    if (
      paymentMethod === "card"
    ) {
      const cardError =
        validateCardPayment();

      if (cardError) {
        setError(cardError);
        return;
      }
    }

    const orderItems =
      cart.map((item) => ({
        productId:
          item.productId ||
          item.id,

        name:
          item.name,

        category:
          item.category,

        subcategory:
          item.subcategory ||
          "",

        image:
          item.image,

        price:
          Number(item.price) ||
          0,

        quantity:
          Number(item.quantity) ||
          1,

        selectedSize:
          item.selectedSize ||
          null,

        selectedColor:
          item.selectedColor ||
          null,

        cartKey:
          item.cartKey ||
          "",
      }));

    const orderData = {
      customer: {
        firstName:
          form.firstName.trim(),

        lastName:
          form.lastName.trim(),

        email:
          form.email
            .trim()
            .toLowerCase(),

        phone:
          form.phone.trim(),

        address:
          form.address.trim(),

        city:
          form.city.trim(),

        province:
          form.province,

        postalCode:
          form.postalCode.trim(),
      },

      items:
        orderItems,

      subtotal:
        Number(subtotal),

      deliveryFee:
        Number(deliveryFee),

      total:
        Number(total),

      paymentMethod,
    };

    try {
      setSubmitting(true);

      /*
        Demo card payment simulation.
        No real payment gateway is connected.
      */

      if (
        paymentMethod === "card"
      ) {
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1200
            )
        );
      }

      const response =
        await fetch(
          `${API_URL}/orders`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body:
              JSON.stringify(
                orderData
              ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to place your order."
        );
      }

      setOrderNumber(
        data.order
          ?.orderNumber || ""
      );

      clearCart();

      setOrderPlaced(true);
    } catch (submitError) {
      console.error(
        "Checkout error:",
        submitError
      );

      setError(
        submitError.message ||
          "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (
    cart.length === 0 &&
    !orderPlaced
  ) {
    return (
      <div className="site-shell">
        <Navbar />

        <main className="empty-page">
          <p className="eyebrow dark-eyebrow">
            CHECKOUT
          </p>

          <h1>
            Your bag is empty.
          </h1>

          <p>
            Add some pieces before
            continuing to checkout.
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

  if (orderPlaced) {
    return (
      <div className="site-shell">
        <Navbar />

        <main className="order-success-page">
          <div className="order-success-icon">
            <CheckCircle2
              size={48}
              strokeWidth={1.2}
            />
          </div>

          <p className="eyebrow dark-eyebrow">
            ORDER CONFIRMED
          </p>

          <h1>
            Thank you for choosing
            ANÉVORA.
          </h1>

          <p>
            Your order has been
            received and is now
            being prepared.
          </p>

          {orderNumber && (
            <p>
              Order number:{" "}
              <strong>
                {orderNumber}
              </strong>
            </p>
          )}

          <div className="order-success-actions">
            <Link
              to="/orders"
              className="dark-button"
            >
              View My Orders

              <ArrowRight
                size={17}
                strokeWidth={1.6}
              />
            </Link>

            <Link
              to="/shop"
              className="outline-button"
            >
              Continue Shopping
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="checkout-hero">
          <div className="checkout-container">
            <p className="eyebrow dark-eyebrow">
              ANÉVORA / CHECKOUT
            </p>

            <h1>
              Complete your order.
            </h1>

            <p>
              A few details and your
              selected pieces will be
              on their way.
            </p>
          </div>
        </section>

        <section className="checkout-section">
          <div className="checkout-container">
            <form
              className="checkout-layout"
              onSubmit={handleSubmit}
            >
              <div className="checkout-main">
                <div className="checkout-card">
                  <div className="checkout-card-heading">
                    <div>
                      <span className="checkout-step">
                        01
                      </span>

                      <div>
                        <p className="eyebrow dark-eyebrow">
                          CUSTOMER
                        </p>

                        <h2>
                          Contact information
                        </h2>
                      </div>
                    </div>
                  </div>

                  {!isAuthenticated && (
                    <p className="checkout-login-note">
                      Already have an
                      ANÉVORA account?{" "}
                      <Link to="/login">
                        Sign in
                      </Link>
                    </p>
                  )}

                  <div className="checkout-fields">
                    <div className="checkout-field-row">
                      <label>
                        First name

                        <input
                          type="text"
                          name="firstName"
                          value={
                            form.firstName
                          }
                          onChange={
                            handleChange
                          }
                          required
                          placeholder="First name"
                        />
                      </label>

                      <label>
                        Last name

                        <input
                          type="text"
                          name="lastName"
                          value={
                            form.lastName
                          }
                          onChange={
                            handleChange
                          }
                          required
                          placeholder="Last name"
                        />
                      </label>
                    </div>

                    <div className="checkout-field-row">
                      <label>
                        Email address

                        <input
                          type="email"
                          name="email"
                          value={
                            form.email
                          }
                          onChange={
                            handleChange
                          }
                          required
                          placeholder="you@example.com"
                        />
                      </label>

                      <label>
                        Phone number

                        <input
                          type="tel"
                          name="phone"
                          value={
                            form.phone
                          }
                          onChange={
                            handleChange
                          }
                          required
                          placeholder="03XX XXXXXXX"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="checkout-card">
                  <div className="checkout-card-heading">
                    <div>
                      <span className="checkout-step">
                        02
                      </span>

                      <div>
                        <p className="eyebrow dark-eyebrow">
                          DELIVERY
                        </p>

                        <h2>
                          Shipping address
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-fields">
                    <label>
                      Complete address

                      <textarea
                        name="address"
                        value={
                          form.address
                        }
                        onChange={
                          handleChange
                        }
                        required
                        rows="4"
                        placeholder="House / apartment, street, area"
                      />
                    </label>

                    <div className="checkout-field-row">
                      <label>
                        City

                        <input
                          type="text"
                          name="city"
                          value={
                            form.city
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />
                      </label>

                      <label>
                        Province

                        <select
                          name="province"
                          value={
                            form.province
                          }
                          onChange={
                            handleChange
                          }
                        >
                          <option>
                            Punjab
                          </option>

                          <option>
                            Sindh
                          </option>

                          <option>
                            Khyber Pakhtunkhwa
                          </option>

                          <option>
                            Balochistan
                          </option>

                          <option>
                            Islamabad Capital Territory
                          </option>

                          <option>
                            Gilgit-Baltistan
                          </option>

                          <option>
                            Azad Jammu & Kashmir
                          </option>
                        </select>
                      </label>

                      <label>
                        Postal code

                        <input
                          type="text"
                          name="postalCode"
                          value={
                            form.postalCode
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="54000"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="checkout-card">
                  <div className="checkout-card-heading">
                    <div>
                      <span className="checkout-step">
                        03
                      </span>

                      <div>
                        <p className="eyebrow dark-eyebrow">
                          PAYMENT
                        </p>

                        <h2>
                          Choose payment
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="payment-options">
                    <button
                      type="button"
                      className={`payment-option ${
                        paymentMethod ===
                        "cod"
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setPaymentMethod(
                          "cod"
                        );
                        setError("");
                      }}
                    >
                      <Banknote
                        size={22}
                        strokeWidth={1.5}
                      />

                      <div>
                        <strong>
                          Cash on Delivery
                        </strong>

                        <span>
                          Pay when your
                          order arrives.
                        </span>
                      </div>

                      <span className="payment-radio" />
                    </button>

                    <button
                      type="button"
                      className={`payment-option ${
                        paymentMethod ===
                        "card"
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setPaymentMethod(
                          "card"
                        );
                        setError("");
                      }}
                    >
                      <CreditCard
                        size={22}
                        strokeWidth={1.5}
                      />

                      <div>
                        <strong>
                          Card Payment
                        </strong>

                        <span>
                          Secure demo card
                          payment.
                        </span>
                      </div>

                      <span className="payment-radio" />
                    </button>
                  </div>

                  {paymentMethod ===
                    "card" && (
                    <div className="demo-card-payment">
                      <div className="demo-card-header">
                        <div>
                          <p className="eyebrow dark-eyebrow">
                            DEMO PAYMENT
                          </p>

                          <h3>
                            Card details
                          </h3>
                        </div>

                        <CreditCard
                          size={24}
                          strokeWidth={1.4}
                        />
                      </div>

                      <div className="test-payment-notice">
                        <ShieldCheck
                          size={18}
                          strokeWidth={1.5}
                        />

                        <span>
                          Demo mode only. No
                          real payment will be
                          processed.
                        </span>
                      </div>

                      <div className="checkout-fields">
                        <label>
                          Cardholder name

                          <input
                            type="text"
                            name="cardName"
                            value={
                              cardForm.cardName
                            }
                            onChange={
                              handleCardChange
                            }
                            placeholder="Demo Cardholder"
                            autoComplete="off"
                          />
                        </label>

                        <label>
                          Card number

                          <input
                            type="text"
                            name="cardNumber"
                            value={
                              cardForm.cardNumber
                            }
                            onChange={
                              handleCardChange
                            }
                            placeholder="4242 4242 4242 4242"
                            inputMode="numeric"
                            autoComplete="off"
                          />
                        </label>

                        <div className="checkout-field-row">
                          <label>
                            Expiry date

                            <input
                              type="text"
                              name="expiry"
                              value={
                                cardForm.expiry
                              }
                              onChange={
                                handleCardChange
                              }
                              placeholder="MM/YY"
                              inputMode="numeric"
                              autoComplete="off"
                            />
                          </label>

                          <label>
                            CVV

                            <input
                              type="text"
                              name="cvv"
                              value={
                                cardForm.cvv
                              }
                              onChange={
                                handleCardChange
                              }
                              placeholder="123"
                              inputMode="numeric"
                              autoComplete="off"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="checkout-error">
                    {error}
                  </div>
                )}
              </div>

              <aside className="checkout-summary">
                <div className="checkout-summary-inner">
                  <p className="eyebrow dark-eyebrow">
                    YOUR ORDER
                  </p>

                  <h2>
                    Order summary
                  </h2>

                  <div className="checkout-products">
                    {cart.map(
                      (item) => (
                        <div
                          key={
                            item.cartKey
                          }
                          className="checkout-product"
                        >
                          <div className="checkout-product-image">
                            <ProductImage
                              product={
                                item
                              }
                            />

                            <span>
                              {
                                item.quantity
                              }
                            </span>
                          </div>

                          <div className="checkout-product-info">
                            <strong>
                              {
                                item.name
                              }
                            </strong>

                            <span>
                              {item.selectedSize
                                ? `Size: ${item.selectedSize}`
                                : item.category}
                            </span>

                            {item.selectedColor && (
                              <span>
                                Color:{" "}
                                {
                                  item.selectedColor
                                }
                              </span>
                            )}
                          </div>

                          <strong>
                            PKR{" "}
                            {formatPrice(
                              item.price *
                                item.quantity
                            )}
                          </strong>
                        </div>
                      )
                    )}
                  </div>

                  <div className="checkout-summary-lines">
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
                        {deliveryFee ===
                        0
                          ? "FREE"
                          : `PKR ${formatPrice(
                              deliveryFee
                            )}`}
                      </strong>
                    </div>
                  </div>

                  <div className="checkout-total">
                    <span>
                      Total
                    </span>

                    <strong>
                      PKR{" "}
                      {formatPrice(
                        total
                      )}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    className="checkout-place-order"
                    disabled={
                      submitting
                    }
                  >
                    {submitting
                      ? paymentMethod ===
                        "card"
                        ? "Processing Demo Payment..."
                        : "Placing Order..."
                      : paymentMethod ===
                        "card"
                      ? "Pay & Place Order"
                      : "Place Order"}

                    {!submitting && (
                      <ArrowRight
                        size={17}
                        strokeWidth={1.6}
                      />
                    )}
                  </button>

                  <div className="checkout-security">
                    <ShieldCheck
                      size={17}
                      strokeWidth={1.5}
                    />

                    <span>
                      Your information is
                      handled securely.
                    </span>
                  </div>
                </div>
              </aside>
            </form>

            <Link
              to="/cart"
              className="checkout-back-link"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.5}
              />

              <span>
                Back to shopping bag
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProductImage({
  product,
}) {
  if (!product) {
    return (
      <div className="image-placeholder">
        ANÉVORA
      </div>
    );
  }

  const folder =
    product.category?.toLowerCase();

  if (
    !folder ||
    !product.image
  ) {
    return (
      <div className="image-placeholder">
        ANÉVORA
      </div>
    );
  }

  const key =
    `../assets/${folder}/${product.image}`;

  const image =
    imageFiles[key];

  if (!image) {
    return (
      <div className="image-placeholder">
        ANÉVORA
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={
        product.name ||
        "ANÉVORA product"
      }
    />
  );
}