import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer bg-dark text-white pt-5 pb-4">
        <div className="container">
          <div className="row">
            {/* Company Info Section */}
            <div className="col-lg-4 col-md-6 mb-4">
              <h5 className="footer-title mb-3">
                <span className="me-2">📸</span>
                VK Clicks
              </h5>
              <p className="footer-desc mb-3">
                India's most trusted photography platform connecting you with professional photographers for all your special moments.
              </p>
              
              <div className="contact-info">
                <div className="contact-item d-flex align-items-center mb-2">
                  <span className="me-2">📍</span>
                  <span>123 Photography Lane, Andheri West, Mumbai 400058</span>
                </div>
                <div className="contact-item d-flex align-items-center mb-2">
                  <span className="me-2">📞</span>
                  <a href="tel:+919876543210" className="footer-link">+91 98765 43210</a>
                </div>
                <div className="contact-item d-flex align-items-center mb-2">
                  <span className="me-2">✉️</span>
                  <a href="mailto:info@vkclicks.com" className="footer-link">info@vkclicks.com</a>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="footer-subtitle mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li><Link to="/" className="footer-link">Home</Link></li>
                <li><Link to="/discover" className="footer-link">Find Photographers</Link></li>
                <li><Link to="/gallery" className="footer-link">Gallery</Link></li>
                <li><Link to="/services" className="footer-link">Our Services</Link></li>
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/contact" className="footer-link">Contact</Link></li>
              </ul>
            </div>

            {/* Services Section */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="footer-subtitle mb-3">Photography Services</h6>
              <ul className="list-unstyled">
                <li><a href="#wedding" className="footer-link">Wedding Photography</a></li>
                <li><a href="#portrait" className="footer-link">Portrait Sessions</a></li>
                <li><a href="#event" className="footer-link">Event Coverage</a></li>
                <li><a href="#commercial" className="footer-link">Commercial Shoots</a></li>
                <li><a href="#maternity" className="footer-link">Maternity & Baby</a></li>
                <li><Link to="/pricing" className="footer-link">Pricing Plans</Link></li>
              </ul>
            </div>

            {/* Support & Social Section */}
            <div className="col-lg-4 col-md-6 mb-4">
              <h6 className="footer-subtitle mb-3">Connect With Us</h6>
              
              {/* Social Media Links */}
              <div className="social-icons mb-4">
                <a href="https://facebook.com/vkclicks" target="_blank" rel="noopener noreferrer" className="social-icon me-3" aria-label="Facebook">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/vkclicks" target="_blank" rel="noopener noreferrer" className="social-icon me-3" aria-label="Instagram">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/vkclicks" target="_blank" rel="noopener noreferrer" className="social-icon me-3" aria-label="Twitter">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/vkclicks" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>

              {/* Newsletter Signup */}
              <div className="newsletter-signup">
                <h6 className="footer-subtitle mb-2">Stay Updated</h6>
                <p className="small text-muted mb-3">Get photography tips and latest offers directly in your inbox.</p>
                <div className="d-flex">
                  <input 
                    type="email" 
                    className="form-control form-control-sm me-2" 
                    placeholder="Enter your email"
                    style={{ backgroundColor: '#374151', border: 'none', color: 'white' }}
                  />
                  <button className="btn btn-light btn-sm">Subscribe</button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <hr className="my-4" style={{ borderColor: '#374151' }} />
          
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 small text-muted">
                © {new Date().getFullYear()} VK Clicks. All rights reserved. | 
                <Link to="/privacy" className="footer-link ms-1">Privacy Policy</Link> | 
                <Link to="/terms" className="footer-link ms-1">Terms of Service</Link>
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="payment-methods">
                <span className="small text-muted me-3">We Accept:</span>
                <span className="payment-icon">💳</span>
                <span className="payment-icon">🏦</span>
                <span className="payment-icon">📱</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Professional Footer Styles - Black Background Theme */}
      <style>{`
        .footer {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #000000 0%, #1f1f1f 100%) !important;
          margin-top: auto;
        }

        .footer-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }

        .footer-subtitle {
          font-size: 1rem;
          font-weight: 600;
          color: #e5e7eb;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-desc {
          color: #9ca3af;
          line-height: 1.6;
          font-size: 0.9rem;
        }

        .contact-item {
          font-size: 0.9rem;
          color: #9ca3af;
        }

        .footer-link {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: block;
          padding: 0.25rem 0;
        }

        .footer-link:hover {
          color: #ffffff;
          text-decoration: none;
          transform: translateX(3px);
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          color: #9ca3af;
          transition: all 0.3s ease;
          padding: 0.5rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-icon:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .newsletter-signup .form-control {
          background-color: #374151;
          border: 1px solid #4b5563;
          color: #ffffff;
        }

        .newsletter-signup .form-control:focus {
          background-color: #4b5563 !important;
          border-color: #ffffff !important;
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.15) !important;
          color: #ffffff !important;
        }

        .newsletter-signup .form-control::placeholder {
          color: #9ca3af;
        }

        .newsletter-signup .btn-light {
          background-color: #ffffff;
          border-color: #ffffff;
          color: #000000;
          font-weight: 500;
        }

        .newsletter-signup .btn-light:hover {
          background-color: #f8f9fa;
          border-color: #f8f9fa;
          color: #000000;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
        }

        .payment-methods {
          display: flex;
          align-items: center;
        }

        .payment-icon {
          font-size: 1.2rem;
          margin-left: 0.5rem;
          opacity: 0.7;
        }

        hr {
          border-color: #374151 !important;
          opacity: 1;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .footer-title {
            font-size: 1.2rem;
          }
          
          .social-icons {
            justify-content: center;
            margin-bottom: 1rem;
          }
          
          .newsletter-signup .d-flex {
            flex-direction: column;
          }
          
          .newsletter-signup .form-control {
            margin-bottom: 0.5rem;
            margin-right: 0 !important;
          }
          
          .payment-methods {
            justify-content: center;
            margin-top: 1rem;
          }
        }

        /* Link hover animations */
        .list-unstyled li {
          transition: all 0.3s ease;
        }

        .list-unstyled li:hover {
          padding-left: 5px;
        }
      `}</style>
    </>
  );
}
