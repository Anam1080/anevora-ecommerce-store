import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loading, isAuthenticated, isAdmin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? "/admin" : "/", { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      await login(form.email, form.password);

      const from = location.state?.from?.pathname;

      if (from) {
        navigate(from, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (loginError) {
      setError(
        loginError?.message ||
          "Unable to sign in. Please check your details."
      );
    }
  }

  return (
    <div className="site-shell">
      <Navbar />

      <main className="login-page">

        <section className="login-shell">

          {/* LEFT SIDE */}

          <div className="login-brand-panel">
            <div className="login-brand-content">

              <p className="login-eyebrow">
                ANÉVORA MEMBERS
              </p>

              <h1>
                Your style,
                <br />
                <em>your space.</em>
              </h1>

              <div className="login-brand-line"></div>

              <p className="login-brand-description">
                Sign in to save your favourites, manage
                your orders and continue your ANÉVORA
                journey.
              </p>

              <Link
                to="/"
                className="login-home-button"
              >
                <ArrowLeft
                  size={15}
                  strokeWidth={1.6}
                />
                <span>Back to Home</span>
              </Link>

            </div>
          </div>


          {/* RIGHT SIDE */}

          <div className="login-form-panel">
            <div className="login-form-content">

              <div className="login-heading">

                <p className="login-eyebrow-dark">
                  WELCOME BACK
                </p>

                <h2>
                  Sign in
                </h2>

                <p>
                  Enter your details to access
                  your account.
                </p>

              </div>


              {error && (
                <div
                  className="login-error"
                  role="alert"
                >
                  {error}
                </div>
              )}


              <form
                className="login-form"
                onSubmit={handleSubmit}
              >

                <label className="login-field">

                  <span>
                    Email address
                  </span>

                  <div className="login-input">

                    <Mail
                      size={16}
                      strokeWidth={1.6}
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />

                  </div>

                </label>


                <label className="login-field">

                  <span>
                    Password
                  </span>

                  <div className="login-input">

                    <Lock
                      size={16}
                      strokeWidth={1.6}
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() =>
                        setShowPassword(
                          (previous) => !previous
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          size={16}
                          strokeWidth={1.6}
                        />
                      ) : (
                        <Eye
                          size={16}
                          strokeWidth={1.6}
                        />
                      )}
                    </button>

                  </div>

                </label>


                <div className="login-options">

                  <label className="login-remember">
                    <input type="checkbox" />
                    <span>
                      Remember me
                    </span>
                  </label>

                  <button
                    type="button"
                    className="login-forgot"
                    onClick={() =>
                      setError(
                        "Password recovery will be connected to the backend later."
                      )
                    }
                  >
                    Forgot password?
                  </button>

                </div>


                <button
                  type="submit"
                  className="login-submit"
                  disabled={loading}
                >
                  <span>
                    {loading
                      ? "Signing in..."
                      : "Sign in"}
                  </span>

                  <ArrowRight
                    size={17}
                    strokeWidth={1.6}
                  />
                </button>

              </form>


              <div className="login-divider">
                <span>OR</span>
              </div>


              <p className="login-register">
                New to ANÉVORA?
                <Link to="/register">
                  Create an account
                </Link>
              </p>


              <div className="login-demo">

                <div className="login-demo-title">
                  DEMO MODE
                </div>

                <p>
                  Any valid email and password can
                  be used while the backend is not
                  connected.
                </p>

              </div>

            </div>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
}