import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      phone_number: e.target.phone_number.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:8000/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.token) {
        setMsg({ type: "success", text: "Signup successful! Redirecting to login..." });
        localStorage.setItem("photographerToken", result.token);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const err =
          result.username?.[0] ||
          result.email?.[0] ||
          result.phone_number?.[0] ||
          result.password?.[0] ||
          result.detail ||
          "Signup failed. Please try again.";
        setMsg({ type: "danger", text: err });
      }
    } catch (error) {
      setMsg({ type: "danger", text: "Network error – is backend running?" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="signup-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#000000" }}>
        <section className="signup-hero py-5" style={{ minHeight: "90vh" }}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              
              {/* Left Side: Professional Photographer Image */}
              <div className="col-lg-6 d-none d-lg-block">
                <div className="image-container">
                  <img
                    src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80"
                    alt="Professional Photographer in Action"
                    className="signup-image"
                  />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <h3 className="text-white mb-2">Start Your Photography Journey</h3>
                      <p className="text-light">Join thousands of photographers building their careers with VK Clicks</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Signup Form */}
              <div className="col-lg-6">
                <div className="signup-form-wrapper">
                  <div className="text-center mb-4">
                    <div className="signup-icon mb-3">
                      <span className="icon-camera">📸</span>
                    </div>
                    <h1 className="signup-title stylish-font text-white mb-2">Join VK Clicks</h1>
                    <p className="signup-subtitle text-light">Create your photographer account and start your journey</p>
                  </div>

                  <div className="signup-card card border-0 shadow-lg">
                    <div className="card-body p-4">
                      {/* Message Alert */}
                      {msg.text && (
                        <div className={`alert alert-${msg.type} border-0 shadow-sm mb-4`}>
                          <div className="d-flex align-items-center">
                            <span className="me-2">
                              {msg.type === 'success' ? '✅' : '⚠️'}
                            </span>
                            <span>{msg.text}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Signup Form */}
                      <form onSubmit={handleSubmit} className="signup-form">
                        <div className="form-group mb-3">
                          <label className="form-label fw-bold small text-dark">
                            <span className="me-2">👤</span>
                            Username
                          </label>
                          <input 
                            name="username" 
                            className="form-control form-control-lg" 
                            placeholder="Choose a unique username"
                            value={formData.username}
                            onChange={handleInputChange}
                            autoComplete="username"
                            required 
                          />
                          <small className="text-muted">This will be your public photographer name</small>
                        </div>
                        
                        <div className="form-group mb-3">
                          <label className="form-label fw-bold small text-dark">
                            <span className="me-2">📧</span>
                            Email Address
                          </label>
                          <input 
                            name="email" 
                            className="form-control form-control-lg" 
                            placeholder="Enter your email address"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            autoComplete="email"
                            required 
                          />
                          <small className="text-muted">We'll use this to contact you about bookings</small>
                        </div>
                        
                        <div className="form-group mb-3">
                          <label className="form-label fw-bold small text-dark">
                            <span className="me-2">📱</span>
                            Phone Number
                          </label>
                          <input 
                            name="phone_number" 
                            className="form-control form-control-lg" 
                            placeholder="Enter your phone number"
                            type="tel"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            autoComplete="tel"
                            required 
                          />
                          <small className="text-muted">Clients will use this to contact you directly</small>
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
                              placeholder="Create a secure password"
                              type={showPassword ? "text" : "password"}
                              value={formData.password}
                              onChange={handleInputChange}
                              autoComplete="new-password"
                              minLength={6}
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
                          <small className="text-muted">Must be at least 6 characters long</small>
                        </div>
                        
                        <button 
                          className="btn btn-dark btn-lg w-100 mb-3" 
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Creating Account...
                            </>
                          ) : (
                            <>
                              <span className="me-2">🚀</span>
                              Create Account
                            </>
                          )}
                        </button>
                      </form>
                      
                      {/* Terms and Login Link */}
                      <div className="signup-links">
                        <div className="text-center mb-3">
                          <small className="text-muted">
                            By creating an account, you agree to our{' '}
                            <Link to="/terms" className="text-dark text-decoration-none">
                              Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link to="/privacy" className="text-dark text-decoration-none">
                              Privacy Policy
                            </Link>
                          </small>
                        </div>
                        
                        <div className="text-center">
                          <span className="text-muted">Already have an account? </span>
                          <Link 
                            className="link-dark text-decoration-none fw-bold" 
                            to="/login"
                          >
                            <span className="me-1">🔑</span>
                            Sign In
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    {/* Card Footer */}
                    <div className="card-footer bg-dark text-light text-center py-3">
                      <small>
                        <span className="me-2">🛡️</span>
                        Your information is secure and encrypted
                      </small>
                    </div>
                  </div>

                  {/* Benefits Information */}
                  <div className="signup-benefits mt-4">
                    <h6 className="text-center mb-3 stylish-font text-light">Why Join VK Clicks?</h6>
                    <div className="row g-3">
                      <div className="col-4">
                        <div className="benefit-card text-center p-3 bg-white rounded shadow-sm">
                          <div className="benefit-icon mb-2">📈</div>
                          <small className="text-muted">Grow Your Business</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="benefit-card text-center p-3 bg-white rounded shadow-sm">
                          <div className="benefit-icon mb-2">💼</div>
                          <small className="text-muted">Find Clients</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="benefit-card text-center p-3 bg-white rounded shadow-sm">
                          <div className="benefit-icon mb-2">⭐</div>
                          <small className="text-muted">Build Reputation</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Support Link */}
                  <div className="support-link text-center mt-4">
                    <p className="text-light small mb-2">Need help getting started?</p>
                    <Link to="/contact" className="btn btn-outline-light btn-sm rounded-pill">
                      <span className="me-2">💬</span>
                      Get Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Professional Signup Page Styles - Black Theme */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Signup Page Background */
        .signup-page {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        }

        .signup-hero {
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

        .signup-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          filter: brightness(0.9) contrast(1.1);
        }

        .image-container:hover .signup-image {
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
        .signup-form-wrapper {
          max-width: 500px;
          margin: 0 auto;
        }

        .signup-title {
          font-size: 2.2rem;
          color: #ffffff;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .signup-subtitle {
          font-size: 1rem;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.8);
        }

        .signup-icon .icon-camera {
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

        /* Signup Card */
        .signup-card {
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
        .signup-links {
          padding-top: 1rem;
          border-top: 1px solid #f1f5f9;
        }

        .link-dark {
          color: #000000 !important;
          transition: color 0.3s ease;
        }

        .link-dark:hover {
          color: #333333 !important;
        }

        .text-dark {
          color: #000000 !important;
        }

        /* Card Footer */
        .card-footer {
          background: linear-gradient(135deg, #000000 0%, #333333 100%) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Benefit Cards */
        .benefit-card {
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }

        .benefit-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(255,255,255,0.1) !important;
          border-color: #000000;
        }

        .benefit-icon {
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
          .signup-title {
            font-size: 1.8rem;
          }

          .signup-form-wrapper {
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

          .benefit-card {
            padding: 0.75rem !important;
          }

          .benefit-icon {
            font-size: 1.2rem;
          }

          .form-group small {
            font-size: 0.75rem;
          }
        }

        /* Text Colors */
        .text-light {
          color: rgba(255, 255, 255, 0.8) !important;
        }

        .text-white {
          color: #ffffff !important;
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
