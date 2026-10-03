import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export default function AdminUsers() {
  const [search, setSearch] = useState("");

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ===============================
  // FETCH USERS FROM BACKEND
  // ===============================

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError("");

        const token =
          localStorage.getItem(
            "anevora_token"
          );

        const response = await fetch(
          `${API_URL}/admin/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Unable to fetch users."
          );
        }

        setUsers(
          data.users || []
        );
      } catch (err) {
        console.error(
          "Admin users error:",
          err
        );

        setError(
          err.message ||
            "Unable to load users."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  // ===============================
  // SEARCH
  // ===============================

  const filteredUsers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(query) ||
        user.email
          ?.toLowerCase()
          .includes(query)
    );
  }, [search, users]);

  // ===============================
  // RENDER
  // ===============================

  return (
    <div className="site-shell admin-shell">
      <Navbar />

      <main className="admin-users-page">

        {/* =========================
            HEADER
        ========================== */}

        <section className="admin-users-header">
          <div className="admin-users-header-content">

            <p className="eyebrow dark-eyebrow">
              CUSTOMERS
            </p>

            <h1>Users</h1>

            <p>
              Manage customer and
              administrator accounts
              across ANÉVORA.
            </p>

          </div>

          <div className="admin-users-count">
            <span>
              {loading
                ? "..."
                : users.length}
            </span>

            <small>
              {users.length === 1
                ? "Registered User"
                : "Registered Users"}
            </small>
          </div>
        </section>

        {/* =========================
            SEARCH
        ========================== */}

        <section className="admin-users-toolbar">

          <div className="admin-users-search">
            <Search size={18} />

            <input
              type="search"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <div className="admin-users-result">
            {loading
              ? "Loading users..."
              : `${filteredUsers.length} ${
                  filteredUsers.length === 1
                    ? "user"
                    : "users"
                } found`}
          </div>

        </section>

        {/* =========================
            ERROR
        ========================== */}

        {error && (
          <section className="admin-users-empty">

            <div className="admin-users-empty-icon">
              <UserRound
                size={34}
                strokeWidth={1.3}
              />
            </div>

            <p className="eyebrow dark-eyebrow">
              ERROR
            </p>

            <h2>
              Unable to load users.
            </h2>

            <p>
              {error}
            </p>

          </section>
        )}

        {/* =========================
            LOADING
        ========================== */}

        {!error && loading && (
          <section className="admin-users-empty">

            <div className="admin-users-empty-icon">
              <UserRound
                size={34}
                strokeWidth={1.3}
              />
            </div>

            <p className="eyebrow dark-eyebrow">
              USERS
            </p>

            <h2>
              Loading registered users...
            </h2>

            <p>
              Fetching account information
              from MongoDB.
            </p>

          </section>
        )}

        {/* =========================
            EMPTY
        ========================== */}

        {!error &&
          !loading &&
          filteredUsers.length === 0 && (
            <section className="admin-users-empty">

              <div className="admin-users-empty-icon">
                <UserRound
                  size={34}
                  strokeWidth={1.3}
                />
              </div>

              <p className="eyebrow dark-eyebrow">
                NO USERS
              </p>

              <h2>
                No registered users found.
              </h2>

              <p>
                Users will appear here
                when accounts are created.
              </p>

            </section>
          )}

        {/* =========================
            USERS TABLE
        ========================== */}

        {!error &&
          !loading &&
          filteredUsers.length > 0 && (
            <section className="admin-users-table-wrap">

              <div className="admin-users-table-header">
                <span>User</span>
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
              </div>

              <div className="admin-users-table-body">

                {filteredUsers.map(
                  (user) => (
                    <div
                      className="admin-users-row"
                      key={user._id || user.id}
                    >

                      {/* USER */}

                      <div className="admin-users-name">

                        <div className="admin-users-avatar">
                          {user.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="admin-users-name-info">

                          <strong>
                            {user.name}
                          </strong>

                          <small>
                            ID:{" "}
                            {user._id ||
                              user.id}
                          </small>

                        </div>

                      </div>

                      {/* EMAIL */}

                      <div className="admin-users-email">
                        {user.email}
                      </div>

                      {/* ROLE */}

                      <div className="admin-users-role">

                        <span
                          className={
                            user.role ===
                            "admin"
                              ? "admin-users-role-badge admin-role"
                              : "admin-users-role-badge"
                          }
                        >

                          {user.role ===
                          "admin" ? (
                            <>
                              <ShieldCheck
                                size={14}
                              />
                              Admin
                            </>
                          ) : (
                            <>
                              <UserRound
                                size={14}
                              />
                              Customer
                            </>
                          )}

                        </span>

                      </div>

                      {/* STATUS */}

                      <div className="admin-users-status">

                        <span
                          className={`admin-users-status-dot ${
                            user.isActive
                              ? ""
                              : "inactive"
                          }`}
                        />

                        {user.isActive
                          ? "Active"
                          : "Inactive"}

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>
          )}

      </main>

      <Footer />
    </div>
  );
}