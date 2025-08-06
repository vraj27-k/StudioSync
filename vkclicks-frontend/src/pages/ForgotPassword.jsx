import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setErr("");
    const email = e.target.email.value;
    try {
      const res = await fetch("http://localhost:8000/api/auth/forgot/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.reset_url) {
        // Automatic redirect to the reset step -- NOT RECOMMENDED without email!
        navigate(data.reset_url);
      } else if (res.ok) {
        setMsg("If the email exists, a reset link was sent to your inbox.");
      } else {
        setErr("Something went wrong. Please try again.");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="forgot-password-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#000000" }}>
        <section className="forgot-hero py-5" style={{ minHeight: "90vh" }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              
              {/* Left Side: Professional Photographer Image */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="image-container">
                  <img
                    src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
                    alt="Professional Photographer in Action"
                    className="forgot-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3 className="text-white mb-2">Secure Account Recovery</h3>
                      <p className="text-light">Reset your VK Clicks password safely and get back to growing your photography business</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Forgot Password Form */}
              <div className="col-lg-6">
                <div className="forgot-form-wrapper">
                  <div className="text-center mb-4">
                    <div className="forgot-icon mb-3">
                      <span className="icon-key">🔑</span>
                    </div>
                    <h1 className="forgot-title stylish-font text-white mb-2">Forgot Password</h1>
                    <p className="forgot-subtitle text-light">Enter your email to receive a password reset link</p>
                  </div>

                  <div className="forgot-card card border-0 shadow-lg">
                    <div className="card-body p-4">
                      {/* Message/Error Alerts */}
                      {msg && (
                        <div className="alert alert-success border-0 shadow-sm mb-4">
                          <div className="d-flex align-items-center">
                            <span className="me-2">✅</span>
                            <span>{msg}</span>
                          </div>
                        </div>
                      )}
                      
                      {err && (
                        <div className="alert alert-danger border-0 shadow-sm mb-4">
                          <div className="d-flex align-items-center">
                            <span className="me-2">⚠️</span>
                            <span>{err}</span>
                          </div>
                        </div>
                      )}

                      {/* Forgot Password Form */}
                      <form onSubmit={handleSubmit} className="forgot-form">
                        <div className="form-group mb-4">
                          <label className="form-label fw-bold small text-dark">
                            <span className="me-2">📧</span>
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Enter your registered email"
                            autoComplete="email"
                            required
                          />
                          <small className="text-muted">We'll send password reset instructions to this email</small>
                        </div>

                        <button
                          className="btn btn-dark btn-lg w-100 mb-3"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Sending...
                            </>
                          ) : (
                            <>
                              <span className="me-2">📤</span>
                              Send Reset Link
                            </>
                          )}
                        </button>
                      </form>

                      {/* Additional Links */}
                      <div className="forgot-links">
                        <div className="d-flex justify-content-between align-items-center">
                          <Link
                            className="link-secondary text-decoration-none small"
                            to="/login"
                          >
                            <span className="me-1">←</span>
                            Back to Login
                          </Link>
                          <Link
                            className="link-dark text-decoration-none small fw-bold"
                            to="/signup"
                          >
                            <span className="me-1">📝</span>
                            Create Account
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="card-footer bg-dark text-light text-center py-3">
                      <small>
                        <span className="me-2">🛡️</span>
                        Password reset links expire in 24 hours for security
                      </small>
                    </div>
                  </div>

                  {/* Help Information */}
                  <div className="help-info mt-4">
                    <div className="row g-3">
                      <div className="col-4">
                        <div className="info-card text-center p-3 bg-white rounded shadow-sm">
                          <div className="info-icon mb-2">📧</div>
                          <small className="text-muted">Check Email</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="info-card text-center p-3 bg-white rounded shadow-sm">
                          <div className="info-icon mb-2">🔒</div>
                          <small className="text-muted">Secure Reset</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="info-card text-center p-3 bg-white rounded shadow-sm">
                          <div className="info-icon mb-2">⚡</div>
                          <small className="text-muted">Quick Process</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support Link */}
                  <div className="support-link text-center mt-4">
                    <p className="text-light small mb-2">Still having trouble?</p>
                    <Link to="/contact" className="btn btn-outline-light btn-sm rounded-pill">
                      <span className="me-2">💬</span>
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Professional Forgot Password Page Styles - Black Theme */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Forgot Password Page Background */
        .forgot-password-page {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        }

        .forgot-hero {
          min-height: 90vh;
        }

        /* Left Side Professional Photographer Image */
        .image-container {
          position: relative;
          height: 600px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.5);
          background: linear-gradient(45deg, rgba(0,0,0,0.1), rgba(0,0,0,0.3));
        }

        .forgot-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          filter: brightness(0.9) contrast(1.1);
        }

        .image-container:hover .forgot-image {
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
        .forgot-form-wrapper {
          max-width: 450px;
          margin: 0 auto;
        }

        .forgot-title {
          font-size: 2.2rem;
          color: #ffffff;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .forgot-subtitle {
          font-size: 1rem;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.8);
        }

        .forgot-icon .icon-key {
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

        /* Forgot Password Card */
        .forgot-card {
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

        .form-group small {
          color: #6b7280;
          font-size: 0.8rem;
          margin-top: 0.25rem;
          display: block;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Submit Button - Black Theme */
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
        .forgot-links {
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

        /* Info Cards */
        .info-card {
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255,255,255,0.1) !important;
          border-color: #000000;
        }

        .info-icon {
          font-size: 1.5rem;
        }

        /* Support Link */
        .support-link {
          animation: fadeIn 1s ease 0.5s forwards;
          opacity: 0;
        }

        .support-link .btn-outline-light {
          border: 2px solid rgba(255, 255, 255, 0.8);
          color: white;
          font-weight: 500;
        }

        .support-link .btn-outline-light:hover {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          transform: translateY(-1px);
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        /* Alert Styling */
        .alert-success {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          border-radius: 12px;
        }

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
          .forgot-title {
            font-size: 1.8rem;
          }

          .forgot-form-wrapper {
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

          .info-card {
            padding: 0.75rem !important;
          }

          .info-icon {
            font-size: 1.2rem;
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
