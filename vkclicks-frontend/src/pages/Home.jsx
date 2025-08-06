import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {/* Hero Section - Compact Typography */}
      <section
        className="hero-section position-relative d-flex align-items-center text-white"
        style={{
          minHeight: "80vh",
          background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1920&q=80') center/cover",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title fw-bold mb-3 text-white">
                Find Perfect Photographers <br />
                <span className="text-primary">For Your Moments</span>
              </h1>
              <p className="hero-subtitle mb-3">
                Connect with professional photographers in your city. Browse portfolios, compare packages, and book your perfect session in minutes.
              </p>
              <div className="d-flex gap-2 flex-column flex-sm-row">
                <Link to="/discover" className="btn btn-primary btn-md px-4 py-2 rounded-pill">
                  <span className="me-1">🔍</span>
                  Browse Photographers
                </Link>
                <Link to="/gallery" className="btn btn-outline-light btn-md px-4 py-2 rounded-pill">
                  <span className="me-1">📸</span>
                  View Gallery
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80"
                alt="Professional photographer"
                className="img-fluid rounded-4 shadow-lg"
                style={{ maxHeight: '380px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Professional Cards with Photos */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title stylish-font mb-2">Our Photography Services</h2>
            <p className="section-subtitle text-muted stylish-light">Professional coverage for every special moment</p>
          </div>

          <div className="row g-3">
            <div className="col-lg-4 col-md-6">
              <div className="service-card card border-0 shadow-sm h-100 text-center">
                <div className="service-image-container position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80"
                    alt="Wedding Photography"
                    className="service-image"
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                  <div className="service-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <span className="overlay-text text-white fw-bold">Wedding Photography</span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h5 className="service-title stylish-font fw-bold mb-2">Wedding Photography</h5>
                  <p className="service-desc text-muted small mb-3 stylish-light">
                    Capture your special day with romantic and timeless photography that tells your story.
                  </p>
                  <div className="service-features mb-3">
                    <div className="feature-item d-flex align-items-center justify-content-center mb-1">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">Pre-wedding shoot included</span>
                    </div>
                    <div className="feature-item d-flex align-items-center justify-content-center mb-1">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">Full day coverage</span>
                    </div>
                    <div className="feature-item d-flex align-items-center justify-content-center">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">300+ edited photos</span>
                    </div>
                  </div>
                  <div className="service-price text-success fw-bold stylish-font">Starting ₹25,000</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card card border-0 shadow-sm h-100 text-center">
                <div className="service-image-container position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80"
                    alt="Portrait Photography"
                    className="service-image"
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                  <div className="service-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <span className="overlay-text text-white fw-bold">Portrait Photography</span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h5 className="service-title stylish-font fw-bold mb-2">Portrait Photography</h5>
                  <p className="service-desc text-muted small mb-3 stylish-light">
                    Professional portraits that showcase your personality and create lasting memories.
                  </p>
                  <div className="service-features mb-3">
                    <div className="feature-item d-flex align-items-center justify-content-center mb-1">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">Studio & outdoor sessions</span>
                    </div>
                    <div className="feature-item d-flex align-items-center justify-content-center mb-1">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">Multiple outfits</span>
                    </div>
                    <div className="feature-item d-flex align-items-center justify-content-center">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">50+ retouched photos</span>
                    </div>
                  </div>
                  <div className="service-price text-success fw-bold stylish-font">Starting ₹8,000</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card card border-0 shadow-sm h-100 text-center">
                <div className="service-image-container position-relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=400&q=80"
                    alt="Event Photography"
                    className="service-image"
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                  <div className="service-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                    <span className="overlay-text text-white fw-bold">Event Photography</span>
                  </div>
                </div>
                <div className="card-body p-4">
                  <h5 className="service-title stylish-font fw-bold mb-2">Event Photography</h5>
                  <p className="service-desc text-muted small mb-3 stylish-light">
                    Complete documentation for corporate gatherings, parties, and special celebrations.
                  </p>
                  <div className="service-features mb-3">
                    <div className="feature-item d-flex align-items-center justify-content-center mb-1">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">Full event coverage</span>
                    </div>
                    <div className="feature-item d-flex align-items-center justify-content-center mb-1">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">Candid photography</span>
                    </div>
                    <div className="feature-item d-flex align-items-center justify-content-center">
                      <span className="text-success me-1 small">✓</span>
                      <span className="small text-muted stylish-light">Same day highlights</span>
                    </div>
                  </div>
                  <div className="service-price text-success fw-bold stylish-font">Starting ₹15,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VK Clicks - Professional Features */}
      <section className="py-4 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title stylish-font mb-2">Why Choose VK Clicks</h2>
            <p className="section-subtitle text-muted stylish-light">India's most trusted photography platform</p>
          </div>

          <div className="row g-3">
            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=100&q=80"
                      alt="Verified Professionals"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">Verified Professionals</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    All photographers are background verified and portfolio reviewed for quality assurance.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&q=80"
                      alt="Instant Booking"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">Instant Booking</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    Book your photography session in less than 5 minutes with our streamlined process.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=100&q=80"
                      alt="Best Prices"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">Best Prices</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    Competitive pricing with transparent costs and no hidden charges or surprises.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=100&q=80"
                      alt="Quality Guarantee"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">Quality Guarantee</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    100% satisfaction guarantee or your money back. We ensure premium quality results.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=100&q=80"
                      alt="Pan India Service"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">Pan India Service</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    Professional photographers available in 50+ cities across India for your convenience.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=100&q=80"
                      alt="24/7 Support"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">24/7 Support</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    Dedicated customer support team available round the clock to assist you.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=100&q=80"
                      alt="High Quality Equipment"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">Pro Equipment</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    State-of-the-art cameras and equipment for crisp, professional quality photographs.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="feature-card card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="feature-icon-container mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=100&q=80"
                      alt="Quick Delivery"
                      className="feature-icon-img rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="feature-title stylish-font fw-bold mb-2">Quick Delivery</h6>
                  <p className="feature-desc text-muted small stylish-light mb-0">
                    Fast turnaround with professional editing and delivery within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section - NEW */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title stylish-font mb-2">What Our Customers Think</h2>
            <p className="section-subtitle text-muted stylish-light">Real reviews from satisfied clients across India</p>
          </div>

          <div className="row g-4">
            {/* Overall Rating Card */}
            <div className="col-lg-4">
              <div className="rating-summary card border-0 shadow-sm h-100 text-center">
                <div className="card-body p-4">
                  <div className="overall-rating mb-3">
                    <h1 className="rating-number stylish-font mb-2">4.8</h1>
                    <div className="stars mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < 5 ? 'text-warning' : 'text-muted'}`}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="small text-muted mb-3">Based on 2,500+ reviews</p>
                  </div>

                  <div className="rating-breakdown">
                    {[
                      { stars: 5, percentage: 78 },
                      { stars: 4, percentage: 16 },
                      { stars: 3, percentage: 4 },
                      { stars: 2, percentage: 1 },
                      { stars: 1, percentage: 1 }
                    ].map((rating, index) => (
                      <div key={index} className="rating-row d-flex align-items-center mb-1">
                        <span className="small me-2">{rating.stars}★</span>
                        <div className="rating-bar flex-grow-1 bg-light rounded">
                          <div
                            className="rating-fill bg-warning rounded"
                            style={{ width: `${rating.percentage}%`, height: '4px' }}
                          ></div>
                        </div>
                        <span className="small ms-2 text-muted">{rating.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="col-lg-8">
              <div className="reviews-container">
                {[
                  {
                    name: "Rajesh Kumar",
                    service: "Corporate Event",
                    location: "Delhi",
                    rating: 5,
                    date: "1 month ago",
                    review: "Outstanding service for our company's annual conference. The photographer was punctual, professional, and delivered high-quality images within 24 hours. Perfect for our marketing materials. Will definitely book again!",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                  },
                  {
                    name: "Anjali Patel",
                    service: "Family Portrait",
                    location: "Bangalore",
                    rating: 5,
                    date: "3 weeks ago",
                    review: "Amazing experience with VK Clicks! The family portrait session was fun and relaxed. The photographer made everyone comfortable, especially the kids. Beautiful photos that we'll treasure forever. Thank you!",
                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                  },
                  {
                    name: "Vikram Singh",
                    service: "Product Photography",
                    location: "Chennai",
                    rating: 4,
                    date: "2 months ago",
                    review: "Great quality product photography for our e-commerce store. Professional setup, good lighting, and crisp images. The photographer understood our requirements well. Only minor delay in delivery, otherwise excellent service.",
                    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                  }
                ].map((review, index) => (
                  <div key={index} className="review-card card border-0 shadow-sm mb-3">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-start">
                        <img
                          src={review.avatar}
                          className="review-avatar rounded-circle me-3"
                          width="50"
                          height="50"
                          alt={review.name}
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="review-content flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <h6 className="reviewer-name mb-0 fw-bold">{review.name}</h6>
                              <div className="review-meta small text-muted">
                                <span>{review.service}</span> • <span>{review.location}</span> • <span>{review.date}</span>
                              </div>
                            </div>
                            <div className="review-rating">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`small ${i < review.rating ? 'text-warning' : 'text-muted'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="review-text small text-muted mb-0 stylish-light">"{review.review}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-3">
                <Link to="/reviews" className="btn btn-outline-primary btn-sm">
                  <span className="me-1">👥</span>
                  View All Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-4 bg-white">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title stylish-font mb-2">Our Global Network</h2>
            <p className="section-subtitle text-muted stylish-light">Professional photographers across India and beyond</p>
          </div>

          <div className="row g-4">
            {/* Network Stats */}
            <div className="col-lg-6">
              <div className="network-stats">
                <div className="row g-3">
                  <div className="col-6">
                    <div className="stat-card bg-light p-3 rounded-3 shadow-sm text-center">
                      <h3 className="stat-number text-primary stylish-font mb-1">50+</h3>
                      <p className="stat-label small text-muted mb-0">Cities Covered</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-card bg-light p-3 rounded-3 shadow-sm text-center">
                      <h3 className="stat-number text-success stylish-font mb-1">500+</h3>
                      <p className="stat-label small text-muted mb-0">Expert Photographers</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-card bg-light p-3 rounded-3 shadow-sm text-center">
                      <h3 className="stat-number text-warning stylish-font mb-1">10K+</h3>
                      <p className="stat-label small text-muted mb-0">Happy Clients</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="stat-card bg-light p-3 rounded-3 shadow-sm text-center">
                      <h3 className="stat-number text-info stylish-font mb-1">24/7</h3>
                      <p className="stat-label small text-muted mb-0">Support Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Cities */}
            <div className="col-lg-6">
              <div className="popular-cities">
                <h5 className="mb-3 stylish-font">Popular Cities</h5>
                <div className="cities-grid">
                  <div className="row g-2">
                    {[
                      { city: "Mumbai", photographers: "120+" },
                      { city: "Delhi", photographers: "110+" },
                      { city: "Bangalore", photographers: "95+" },
                      { city: "Chennai", photographers: "80+" },
                      { city: "Hyderabad", photographers: "75+" },
                      { city: "Pune", photographers: "65+" },
                      { city: "Kolkata", photographers: "60+" },
                      { city: "Ahmedabad", photographers: "45+" }
                    ].map((location, index) => (
                      <div className="col-6" key={index}>
                        <div className="city-card bg-white p-2 rounded-2 border d-flex justify-content-between align-items-center">
                          <span className="city-name small fw-bold">{location.city}</span>
                          <span className="photographer-count small text-muted">{location.photographers}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center mt-3">
                  <Link to="/cities" className="btn btn-outline-primary btn-sm">
                    View All Cities
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title stylish-font mb-2">Frequently Asked Questions</h2>
            <p className="section-subtitle text-muted stylish-light">Quick answers to common questions</p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="faq-accordion">
                {[
                  {
                    question: "How do I book a photographer on VK Clicks?",
                    answer: "Simply browse our photographer profiles, view their portfolios, compare packages, and click 'Book Now'. You can message photographers directly, discuss your requirements, and confirm your booking with a secure payment."
                  },
                  {
                    question: "Are all photographers on VK Clicks verified?",
                    answer: "Yes, all photographers go through a rigorous verification process including background checks, portfolio review, and skill assessment. We ensure only qualified professionals join our platform."
                  },
                  {
                    question: "What's included in the photography packages?",
                    answer: "Package inclusions vary by photographer and service type. Generally, packages include consultation, photography session, basic editing, and digital delivery. Premium packages may include additional services like albums, prints, and extended coverage."
                  },
                  {
                    question: "How long does it take to receive my photos?",
                    answer: "Most photographers deliver edited photos within 24-48 hours for basic packages. Complex editing or larger events may take 3-7 days. You'll receive preview images within 24 hours for most sessions."
                  }
                ].map((faq, index) => (
                  <div className="faq-item mb-3" key={index}>
                    <div className="faq-card card border-0 shadow-sm">
                      <div
                        className="faq-header card-header bg-white border-0 py-3 cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <h6 className="faq-question mb-0 stylish-font fw-bold">{faq.question}</h6>
                          <span className={`faq-toggle ${openFAQ === index ? 'rotate' : ''}`}>
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className={`faq-content collapse ${openFAQ === index ? 'show' : ''}`}>
                        <div className="card-body pt-0">
                          <p className="faq-answer text-muted small stylish-light mb-0">{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - White Background, Modern and Clean */}
      <section className="cta-section position-relative text-center py-5" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 className="cta-title stylish-font mb-3 text-dark">Ready to Capture Your Perfect Moments?</h2>
              <p className="cta-subtitle mb-4 text-muted">Discover talented photographers near you and book your ideal photography session today. Join thousands of satisfied customers across India.</p>

              {/* Stats Banner */}
              <div className="stats-banner bg-light mb-4 p-4 rounded">
                <div className="row text-center">
                  <div className="col-4">
                    <h3 className="fw-bold mb-1" style={{ color: '#2563eb' }}>500+</h3>
                    <p className="opacity-75">Expert Photographers</p>
                  </div>
                  <div className="col-4">
                    <h3 className="fw-bold mb-1" style={{ color: '#2563eb' }}>50+</h3>
                    <p className="opacity-75">Cities</p>
                  </div>
                  <div className="col-4">
                    <h3 className="fw-bold mb-1" style={{ color: '#2563eb' }}>10K+</h3>
                    <p className="opacity-75">Happy Clients</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center flex-wrap gap-3">
                <Link
                  to="/discover"
                  className="btn btn-primary btn-lg rounded-pill px-5 py-3"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
                >
                  <span className="me-2">🔍</span>
                  Explore Photographers
                </Link>
                <Link
                  to="/photographer/signup"
                  className="btn btn-outline-primary btn-lg rounded-pill px-5 py-3"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}
                >
                  <span className="me-2">📸</span>
                  Become A Photographer
                </Link>
              </div>

              <p className="mt-3 text-muted opacity-75" style={{ fontFamily: 'Source Sans Pro, sans-serif' }}>
                ✨ No hidden fees • Instant booking • 100% satisfaction guarantee
              </p>
            </div>
          </div>
        </div>

        <style>{` 
    .cta-section {
      position: relative;
      min-height: 400px;
    }

    .stats-banner {
      border: 1px solid #dee2e6;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    }

    .btn-primary {
      background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
      border: none;
      transition: all 0.3s ease;
      box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(37, 99, 235, 0.4);
    }

    .btn-outline-primary {
      border: 2px solid #2563eb;
      color: #2563eb;
      background: transparent;
      transition: all 0.3s ease;
    }

    .btn-outline-primary:hover {
      background: #2563eb;
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(37, 99, 235, 0.4);
    }

    .cta-title {
      font-family: 'Playfair Display', serif;
      letter-spacing: -0.5px;
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      text-shadow: none;
    }

    .cta-subtitle {
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: 300;
      font-size: 1.1rem;
      color: #6b7280;
      text-shadow: none;
    }

    @media (max-width: 768px) {
      .cta-title {
        font-size: 1.75rem;
      }
      .cta-subtitle {
        font-size: 1rem;
      }
      .btn-lg {
        padding: 12px 25px;
        font-size: 0.9rem;
      }
      .stats-banner {
        padding: 1rem;
      }
    }
  `}</style>
      </section>



      {/* Enhanced CSS Styles with Customer Testimonials */}
      <style>{`
        /* Stylish Typography Imports */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        /* Stylish Font Classes */
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }
        
        .stylish-light {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }
        
        /* Compact Typography */
        .container {
          font-family: 'Source Sans Pro', sans-serif;
        }
        
        .hero-title {
          font-size: 1.75rem;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
          letter-spacing: -0.5px;
          line-height: 1.2;
          font-family: 'Playfair Display', serif;
        }
        
        .hero-subtitle {
          font-size: 0.95rem;
          text-shadow: 1px 1px 6px rgba(0,0,0,0.7);
          line-height: 1.4;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }
        
        .section-title {
          font-size: 1.5rem;
          line-height: 1.3;
          font-family: 'Playfair Display', serif;
          font-weight: 600;
        }
        
        .section-subtitle {
          font-size: 0.9rem;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }
        
        .cta-title {
          font-size: 1.4rem;
          font-family: 'Playfair Display', serif;
        }
        
        .cta-subtitle {
          font-size: 0.9rem;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }

        /* Customer Testimonials Styles */
        .rating-summary {
          transition: all 0.3s ease;
        }
        
        .rating-summary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        
        .rating-number {
          font-size: 3rem;
          color: #f59e0b;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        
        .stars .star {
          font-size: 1.2rem;
          margin: 0 1px;
        }
        
        .rating-breakdown .rating-bar {
          height: 4px;
          border-radius: 2px;
        }
        
        .rating-fill {
          transition: width 0.3s ease;
        }
        
        .review-card {
          transition: all 0.3s ease;
          border-radius: 12px;
        }
        
        .review-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
        }
        
        .review-avatar {
          transition: transform 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .review-card:hover .review-avatar {
          transform: scale(1.05);
        }
        
        .reviewer-name {
          font-size: 0.9rem;
          color: #1e293b;
          font-family: 'Playfair Display', serif;
        }
        
        .review-meta {
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .review-text {
          line-height: 1.5;
          font-style: italic;
        }
        
        .review-rating .star {
          font-size: 0.9rem;
        }
        
        /* Feature Cards - Professional Benefits */
        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }
        
        .feature-icon-container {
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover .feature-icon-container {
          transform: scale(1.1);
        }
        
        .feature-icon-img {
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover .feature-icon-img {
          transform: scale(1.05);
        }
        
        .feature-title {
          font-size: 0.95rem;
          color: #1e293b;
          font-family: 'Playfair Display', serif;
          font-weight: 600;
        }
        
        .feature-desc {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
          font-size: 0.8rem;
        }
        
        /* Service Cards with Photos */
        .service-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
        }
        
        .service-image-container {
          border-radius: 12px 12px 0 0;
          overflow: hidden;
        }
        
        .service-image {
          transition: transform 0.3s ease;
        }
        
        .service-card:hover .service-image {
          transform: scale(1.1);
        }
        
        .service-overlay {
          background: linear-gradient(45deg, rgba(37, 99, 235, 0.8), rgba(59, 130, 246, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .service-card:hover .service-overlay {
          opacity: 1;
        }
        
        .overlay-text {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .service-title {
          font-size: 1.1rem;
          color: #1e293b;
          font-family: 'Playfair Display', serif;
          font-weight: 600;
        }
        
        .service-desc {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }
        
        .service-price {
          font-size: 1rem;
          font-family: 'Playfair Display', serif;
          font-weight: 600;
        }

        /* Global Network Section Styles */
        .stat-card {
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }
        
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        
        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .city-card {
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
        }
        
        .city-card:hover {
          background-color: #f8fafc !important;
          border-color: #3b82f6;
          transform: translateX(3px);
        }

        /* FAQ Section Styles */
        .faq-header {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .faq-header:hover {
          background-color: #f8fafc !important;
        }
        
        .faq-question {
          font-size: 0.95rem;
          color: #1e293b;
        }
        
        .faq-toggle {
          transition: transform 0.3s ease;
          color: #6b7280;
        }
        
        .faq-toggle.rotate {
          transform: rotate(180deg);
        }
        
        .faq-content {
          transition: all 0.3s ease;
        }
        
        .faq-content.show {
          display: block !important;
        }
        
        .faq-answer {
          line-height: 1.6;
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
        
        /* Feature Items */
        .feature-item {
          font-size: 0.8rem;
          font-family: 'Source Sans Pro', sans-serif;
        }
        
        /* Buttons - Compact */
        .btn {
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.3s ease;
          font-family: 'Source Sans Pro', sans-serif;
        }
        
        .btn-sm {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
        }
        
        .btn-md {
          font-size: 0.85rem;
          padding: 0.5rem 1rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, black 0%, black 100%);
          border: none;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, black 0%, black 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
        }
        
        .btn-outline-primary {
          border: 1px solid black;
          color: black;
        }
        
        .btn-outline-primary:hover {
          background-color: black;
          color: white;
          transform: translateY(-1px);
        }
        
        .btn-outline-light {
          border: 1px solid rgba(255,255,255,0.8);
          color: white;
        }
        
        .btn-outline-light:hover {
          background-color: rgba(255,255,255,0.2);
          border-color: white;
          color: white;
          transform: translateY(-1px);
        }
        
        /* Compact Spacing */
        .py-4 {
          padding-top: 2rem !important;
          padding-bottom: 2rem !important;
        }
        
        /* Small text */
        .small {
          font-size: 0.75rem;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 1.5rem;
          }
          
          .hero-subtitle {
            font-size: 0.85rem;
          }
          
          .section-title {
            font-size: 1.3rem;
          }
          
          .feature-card, .service-card, .stat-card, .review-card {
            margin-bottom: 1rem;
          }
          
          .btn {
            font-size: 0.8rem;
          }
          
          .service-image {
            height: 100px !important;
          }
          
          .feature-icon-img {
            width: 50px !important;
            height: 50px !important;
          }
          
          .stat-number {
            font-size: 1.2rem;
          }
          
          .rating-number {
            font-size: 2rem;
          }
          
          .review-avatar {
            width: 40px !important;
            height: 40px !important;
          }
        }
        
        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Badge Styling */
        .badge {
          font-size: 0.7rem;
          font-weight: 500;
        }
        
        /* Professional touches */
        .bg-primary {
          background: linear-gradient(135deg, black 0%, black 100%) !important;
        }
        
        .text-primary {
          color: white !important;
        }
      `}</style>
    </>
  );
}
