import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

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

  // Save/remove user from localStorage
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

  // Register
  async function register(name, email, password) {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
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

  // Login
  async function login(email, password) {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
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

  // Logout
  function logout() {
    localStorage.removeItem("anevora_token");
    localStorage.removeItem("anevora_user");

    setUser(null);
  }

  // Restore authenticated user
  // when the application starts
  useEffect(() => {
    async function restoreUser() {
      const token =
        localStorage.getItem("anevora_token");

      if (!token) {
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
      }
    }

    restoreUser();
  }, []);

  const value = {
    user,

    loading,

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