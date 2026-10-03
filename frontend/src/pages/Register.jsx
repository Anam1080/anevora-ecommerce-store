import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  UserRound,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    loading,
    isAuthenticated,
    authChecking,
  } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (authChecking) {
      return;
    }

    if (isAuthenticated) {
      navigate("/", {
        replace: true,
      });
    }
  }, [
    authChecking,
    isAuthenticated,
    navigate,
  ]);

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

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await register(
        form.name,
        form.email,
        form.password
      );

      const registeredUser = result?.user;

      if (!registeredUser) {
        throw new Error(
          "Account was created but user information was not returned."
        );
      }

      // Normal registration creates a CUSTOMER account.
      navigate("/", {
        replace: true,
      });
    } catch (registerError) {
      setError(
        registerError?.message ||
          "Unable to create your account."
      );
    }
  }

  return (
    <div className="site-shell">
      <Navbar />

      <main className="auth-page">
        <section className="auth-layout auth-layout-reverse">

          <div className="auth-visual auth-register-visual">
            <div className="auth-visual-overlay">

              <p className="eyebrow light-eyebrow">
                JOIN ANÉVORA
              </p>

              <h1>
                Discover
                <br />
                your signature.
              </h1>

              <p>
                Create your account and make every
                ANÉVORA discovery yours.
              </p>

            </div>
          </div>


          <div className="auth-panel">
            <div className="auth-panel-inner">

              <div className="auth-heading">

                <p className="eyebrow dark-eyebrow">
                  CREATE ACCOUNT
                </p>

                <h2>Join ANÉVORA</h2>

                <p>
                  Create an account to save and manage
                  your favourite pieces.
                </p>

              </div>


              {error && (
                <div
                  className="auth-error"
                  role="alert"
                >
                  {error}
                </div>
              )}


              <form
                className="auth-form"
                onSubmit={handleSubmit}
              >

                <label className="form-field">
                  <span>Full name</span>

                  <div className="input-with-icon">

                    <UserRound
                      size={17}
                      strokeWidth={1.7}
                    />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      autoComplete="name"
                      required
                    />

                  </div>
                </label>


                <label className="form-field">
                  <span>Email address</span>

                  <div className="input-with-icon">

                    <Mail
                      size={17}
                      strokeWidth={1.7}
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


                <label className="form-field">
                  <span>Password</span>

                  <div className="input-with-icon">

                    <Lock
                      size={17}
                      strokeWidth={1.7}
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
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
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
                          size={17}
                          strokeWidth={1.7}
                        />
                      ) : (
                        <Eye
                          size={17}
                          strokeWidth={1.7}
                        />
                      )}
                    </button>

                  </div>
                </label>


                <label className="form-field">
                  <span>Confirm password</span>

                  <div className="input-with-icon">

                    <Lock
                      size={17}
                      strokeWidth={1.7}
                    />

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(
                          (previous) => !previous
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff
                          size={17}
                          strokeWidth={1.7}
                        />
                      ) : (
                        <Eye
                          size={17}
                          strokeWidth={1.7}
                        />
                      )}
                    </button>

                  </div>
                </label>


                <label className="terms-option">
                  <input
                    type="checkbox"
                    required
                  />

                  <span>
                    I agree to the ANÉVORA terms and
                    privacy policy.
                  </span>
                </label>


                <button
                  type="submit"
                  className="auth-submit-button"
                  disabled={loading}
                >
                  {loading
                    ? "Creating account..."
                    : "Create account"}

                  <ArrowRight
                    size={18}
                    strokeWidth={1.7}
                  />
                </button>

              </form>


              <div className="auth-divider">
                <span>OR</span>
              </div>


              <p className="auth-switch">
                Already have an account?{" "}
                <Link to="/login">
                  Sign in
                </Link>
              </p>


              <div className="demo-note">
                <strong>ANÉVORA ACCOUNT</strong>

                <span>
                  Your account is securely connected
                  to the ANÉVORA backend with JWT
                  authentication.
                </span>
              </div>

            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}