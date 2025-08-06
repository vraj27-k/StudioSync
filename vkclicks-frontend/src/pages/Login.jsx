import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const f = new FormData(e.target);

    try {
      const r = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: f.get("username"),
          password: f.get("password")
        })
      });

      const d = await r.json();

      if (r.ok && d.token) {
        localStorage.setItem("photographerToken", d.token);

        if (setIsAuthenticated && typeof setIsAuthenticated === "function") {
          setIsAuthenticated(true);
        }

        nav("/dashboard");
      } else {
        setErr(d.detail || d.message || "Invalid credentials");
      }
    } catch (error) {
      setErr("Network error. Please check your connection.");
      console.error("Login error:", error);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="login-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#000000" }}>
        <section className="login-hero py-5" style={{ minHeight: "90vh" }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              
              {/* Left Side: Active Photographer Image */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="image-container">
                  <img
                    src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
                    alt="Professional Photographer in Action"
                    className="login-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3 className="text-white mb-2">Turn Your Passion Into Profit</h3>
                      <p className="text-light">Join VK Clicks - where passionate photographers build successful careers</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Login Form */}
              <div className="col-lg-6">
                <div className="login-form-wrapper">
                  <div className="text-center mb-4">
                    <div className="login-icon mb-3">
                      <span className="icon-camera">📸</span>
                    </div>
                    <h1 className="login-title stylish-font text-white mb-2">Welcome Back</h1>
                    <p className="login-subtitle text-light">Sign in to your VK Clicks photographer account</p>
                  </div>

                  <div className="login-card card border-0 shadow-lg">
                    <div className="card-body p-4">
                      {/* Error Alert */}
                      {err && (
                        <div className="alert alert-danger border-0 shadow-sm mb-4">
                          <div className="d-flex align-items-center">
                            <span className="me-2">⚠️</span>
                            <span>{err}</span>
                          </div>
                        </div>
                      )}

                      {/* Login Form */}
                      <form onSubmit={submit} className="login-form">
                        <div className="form-group mb-3">
                          <label className="form-label fw-bold small text-dark">
                            <span className="me-2">👤</span>
                            Username
                          </label>
                          <input
                            name="username"
                            className="form-control form-control-lg"
                            placeholder="Enter your username"
                            autoComplete="username"
                            required
                          />
                        </div>

                        <div className="form-group mb-4">
                          <label className="form-label fw-bold small text-dark">
                            <span className="me-2">🔒</span>
                            Password
                          </label>
                          <div className="password-field position-relative">
                            <input
                              name="password"
                              className="form-control form-control-lg pe-5"
                              placeholder="Enter your password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              required
                            />
                            <button
                              type="button"
                              className="password-toggle btn btn-link position-absolute end-0 top-0 h-100 px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <span>{showPassword ? "🙈" : "👁️"}</span>
                            </button>
                          </div>
                        </div>

                        <button
                          className="btn btn-dark btn-lg w-100 mb-3"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Logging in...
                            </>
                          ) : (
                            <>
                              <span className="me-2">🚀</span>
                              Sign In
                            </>
                          )}
                        </button>
                      </form>

                      {/* Additional Links */}
                      <div className="login-links">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link
                            className="link-secondary text-decoration-none small"
                            to="/forgot-password"
                          >
                            <span className="me-1">🔑</span>
                            Forgot password?
                          </Link>
                          <Link
                            className="link-dark text-decoration-none small fw-bold"
                            to="/signup"
                          >
                            <span className="me-1">📝</span>
                            Create account
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="card-footer bg-dark text-light text-center py-3">
                      <small>
                        <span className="me-2">🛡️</span>
                        Your data is secure with VK Clicks
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Professional Login Page Styles - Black Theme with Active Photographer */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Login Page Background */
        .login-page {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        }

        .login-hero {
          min-height: 90vh;
        }

        /* Left Side Active Photographer Image */
        .image-container {
          position: relative;
          height: 600px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
        }

        .login-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          filter: brightness(0.9) contrast(1.1);
        }

        .image-container:hover .login-image {
          transform: scale(1.05);
          filter: brightness(1) contrast(1.2);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.85));
          padding: 2.5rem;
        }

        .overlay-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 600;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
        }

        .overlay-content p {
          font-family: 'Source Sans Pro', sans-serif;
          margin-bottom: 0;
          font-size: 1rem;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
        }

        /* Right Side Form */
        .login-form-wrapper {
          max-width: 450px;
          margin: 0 auto;
        }

        .login-title {
          font-size: 2.2rem;
          color: #ffffff;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .login-subtitle {
          font-size: 1rem;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.8);
        }

        .login-icon .icon-camera {
          font-size: 3rem;
          display: inline-block;
          animation: bounce 2s infinite;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        /* Login Card */
        .login-card {
          border-radius: 20px;
          overflow: hidden;
          animation: slideUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(30px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Form Styling */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-label {
          color: #000000;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }

        .form-control {
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-family: 'Source Sans Pro', sans-serif;
          transition: all 0.3s ease;
          font-size: 1rem;
          background-color: #ffffff;
        }

        .form-control:focus {
          border-color: #000000;
          box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.15);
        }

        .form-control-lg {
          padding: 0.75rem 1rem;
          font-size: 1rem;
        }

        /* Password Field */
        .password-field {
          position: relative;
        }

        .password-toggle {
          border: none;
          background: none;
          color: #6b7280;
          padding: 0;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #000000;
        }

        .password-toggle:focus {
          box-shadow: none;
        }

        /* Submit Button */
        .btn-dark {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          border: none;
          border-radius: 12px;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 600;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .btn-dark:hover {
          background: linear-gradient(135deg, #333333 0%, #000000 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .btn-dark:disabled {
          background: #9ca3af;
          transform: none;
          box-shadow: none;
        }

        /* Links */
        .login-links {
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }

        .link-secondary {
          color: #6b7280 !important;
          transition: color 0.3s ease;
        }

        .link-secondary:hover {
          color: #374151 !important;
        }

        .link-dark {
          color: #000000 !important;
          transition: color 0.3s ease;
        }

        .link-dark:hover {
          color: #333333 !important;
        }

        /* Card Footer */
        .card-footer {
          background: linear-gradient(135deg, #000000 0%, #333333 100%) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Alert Styling */
        .alert-danger {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          border-radius: 12px;
        }

        /* Spinner */
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .login-title {
            font-size: 1.8rem;
          }

          .login-form-wrapper {
            padding: 2rem 1rem;
          }

          .image-container {
            height: 400px;
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 768px) {
          .form-control-lg {
            padding: 0.6rem 0.9rem;
            font-size: 0.95rem;
          }

          .btn-lg {
            padding: 0.6rem 1rem;
            font-size: 0.95rem;
          }
        }

        /* Text Colors */
        .text-light {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .text-white {
          color: #ffffff !important;
        }

        .text-dark {
          color: #000000 !important;
        }

        /* Utilities */
        .border-0 {
          border: none !important;
        }

        .shadow-lg {
          box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
        }
      `}</style>
    </>
  );
}
