import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_URL =
  import.meta.env.VITE_API_URL ||
"https://anevora-ecommerce-store-production-c300.up.railway.app/api"

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem("anevora_user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // ==========================================
  // SAVE USER
  // ==========================================

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "anevora_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("anevora_user");
    }
  }, [user]);

  // ==========================================
  // REGISTER
  // ==========================================

  async function register(name, email, password) {
    setLoading(true);

    // Remove any previous logged-in session.
    // This prevents an old admin session from
    // affecting the new account.

    setUser(null);
    localStorage.removeItem("anevora_token");
    localStorage.removeItem("anevora_user");

    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to create your account."
        );
      }

      // Backend registration must create
      // a CUSTOMER account.

      localStorage.setItem(
        "anevora_token",
        data.token
      );

      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOGIN
  // ==========================================

  async function login(email, password) {
    setLoading(true);

    // IMPORTANT:
    // Clear any previously logged-in account
    // before logging into another account.

    setUser(null);
    localStorage.removeItem("anevora_token");
    localStorage.removeItem("anevora_user");

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to sign in."
        );
      }

      if (!data.user) {
        throw new Error(
          "Login succeeded but user information was not returned."
        );
      }

      localStorage.setItem(
        "anevora_token",
        data.token
      );

      setUser(data.user);

      return {
        success: true,
        user: data.user,
      };
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOGOUT
  // ==========================================

  function logout() {
    localStorage.removeItem("anevora_token");
    localStorage.removeItem("anevora_user");

    setUser(null);
  }

  // ==========================================
  // RESTORE AUTHENTICATED USER
  // ==========================================

  useEffect(() => {
    async function restoreUser() {
      const token =
        localStorage.getItem("anevora_token");

      if (!token) {
        setAuthChecking(false);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Session expired."
          );
        }

        setUser(data.user);
      } catch {
        localStorage.removeItem(
          "anevora_token"
        );

        localStorage.removeItem(
          "anevora_user"
        );

        setUser(null);
      } finally {
        setAuthChecking(false);
      }
    }

    restoreUser();
  }, []);

  const value = {
    user,

    loading,

    authChecking,

    isAuthenticated: Boolean(user),

    isAdmin: user?.role === "admin",

    login,

    register,

    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}