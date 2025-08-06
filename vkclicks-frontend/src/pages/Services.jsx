import { Link } from "react-router-dom";
import { useState } from "react";

export default function Services() {
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Wedding Photography",
      icon: "💍",
      shortDesc: "Capture your special day with professional wedding photographers.",
      fullDesc: "Complete wedding day coverage with romantic and timeless photography that tells your unique love story. From intimate moments to grand celebrations, we ensure every precious memory is beautifully preserved.",
      image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80",
      features: [
        "Pre-wedding consultation & planning",
        "Pre-wedding photo shoot included",
        "Full day wedding coverage (12+ hours)",
        "Professional editing & color correction",
        "300+ high-resolution edited photos",
        "Online gallery for easy sharing",
        "Backup photographer available",
        "Same day sneak peek photos"
      ],
      pricing: {
        basic: { price: "₹25,000", duration: "6 hours", photos: "150+" },
        premium: { price: "₹45,000", duration: "12 hours", photos: "300+" },
        deluxe: { price: "₹75,000", duration: "2 days", photos: "500+" }
      },
      addOns: [
        "Wedding album design - ₹8,000",
        "Cinematic highlights video - ₹15,000",
        "Drone photography - ₹5,000",
        "Additional photographer - ₹8,000"
      ]
    },
    {
      id: 2,
      title: "Portrait Photography",
      icon: "📸",
      shortDesc: "Professional portraits for individuals, families, and couples.",
      fullDesc: "Professional portrait sessions that showcase your personality and create lasting memories. Whether for personal branding, family memories, or special occasions, we create stunning portraits that reflect your unique style.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      features: [
        "Studio or outdoor location options",
        "Professional lighting setup",
        "Multiple outfit changes allowed",
        "Posing guidance & direction",
        "50+ professionally edited photos",
        "High-resolution image delivery",
        "Print-ready file formats",
        "Social media optimized versions"
      ],
      pricing: {
        basic: { price: "₹8,000", duration: "1 hour", photos: "25+" },
        premium: { price: "₹15,000", duration: "2 hours", photos: "50+" },
        deluxe: { price: "₹25,000", duration: "4 hours", photos: "100+" }
      },
      addOns: [
        "Additional location - ₹3,000",
        "Professional makeup - ₹4,000",
        "Canvas prints - ₹2,000",
        "Extended session +1hr - ₹3,000"
      ]
    },
    {
      id: 3,
      title: "Event Photography",
      icon: "🎉",
      shortDesc: "Corporate events, parties, and celebrations beautifully documented.",
      fullDesc: "Complete event documentation for corporate gatherings, parties, and special celebrations. We capture the energy, emotions, and important moments that make your event memorable for all attendees.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      features: [
        "Full event coverage",
        "Candid & posed photography",
        "Group photos & networking shots",
        "Speaker & presentation coverage",
        "Same day photo highlights",
        "Professional event documentation",
        "Multiple photographer team",
        "Fast turnaround delivery"
      ],
      pricing: {
        basic: { price: "₹15,000", duration: "4 hours", photos: "200+" },
        premium: { price: "₹28,000", duration: "8 hours", photos: "400+" },
        deluxe: { price: "₹45,000", duration: "Full day", photos: "600+" }
      },
      addOns: [
        "Live photo sharing - ₹5,000",
        "Event videography - ₹12,000",
        "Photo booth setup - ₹8,000",
        "Rush delivery 24hrs - ₹5,000"
      ]
    },
    {
      id: 5,
      title: "Maternity & Newborn",
      icon: "👶",
      shortDesc: "Beautiful maternity and newborn photography for growing families.",
      fullDesc: "Gentle and beautiful photography sessions celebrating pregnancy and welcoming new life. Our experienced photographers specialize in safe, comfortable sessions that capture the joy and wonder of growing families.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80",
      features: [
        "Safe & comfortable environment",
        "Props & accessories included",
        "Gentle posing techniques",
        "Family involvement options",
        "Maternity & newborn combo packages",
        "Soft, natural editing style",
        "Multiple backdrop options",
        "Flexible scheduling"
      ],
      pricing: {
        basic: { price: "₹10,000", duration: "1.5 hours", photos: "30+" },
        premium: { price: "₹18,000", duration: "3 hours", photos: "60+" },
        deluxe: { price: "₹30,000", duration: "Multi-session", photos: "100+" }
      },
      addOns: [
        "Family inclusion - ₹3,000",
        "Milestone package - ₹8,000",
        "Custom props - ₹2,000",
        "Album creation - ₹6,000"
      ]
    },
    {
      id: 6,
      title: "Special Occasions",
      icon: "🎓",
      shortDesc: "Perfect photography for graduations, anniversaries, and milestone celebrations.",
      fullDesc: "Customized photography sessions for life's important milestones and celebrations. From graduations to anniversaries, we help you commemorate special achievements and memorable moments.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      features: [
        "Customized session themes",
        "Group & individual photos",
        "Multiple location options",
        "Celebration documentation",
        "Family gathering coverage",
        "Achievement highlighting",
        "Quick turnaround",
        "Social sharing packages"
      ],
      pricing: {
        basic: { price: "₹12,000", duration: "2 hours", photos: "75+" },
        premium: { price: "₹20,000", duration: "4 hours", photos: "150+" },
        deluxe: { price: "₹32,000", duration: "6 hours", photos: "250+" }
      },
      addOns: [
        "Themed decorations - ₹3,000",
        "Group photo prints - ₹2,000",
        "Same day editing - ₹4,000",
        "Extended family session - ₹5,000"
      ]
    }
  ];

  return (
    <>
      <div className="services-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Hero Section */}
        <section className="services-hero py-5 bg-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 mx-auto text-center">
                <h1 className="services-title stylish-font mb-3">Our Photography Services</h1>
                <p className="services-subtitle text-muted mb-4">
                  Professional photography services for every occasion. From intimate portraits to grand celebrations, 
                  we bring your vision to life with creativity, skill, and passion.
                </p>
                <div className="services-stats bg-light rounded-3 p-4">
                  <div className="row">
                    <div className="col-3">
                      <h4 className="text-dark stylish-font mb-0">500+</h4>
                      <small className="text-muted">Projects</small>
                    </div>
                    <div className="col-3">
                      <h4 className="text-dark stylish-font mb-0">50+</h4>
                      <small className="text-muted">Photographers</small>
                    </div>
                    <div className="col-3">
                      <h4 className="text-dark stylish-font mb-0">25+</h4>
                      <small className="text-muted">Cities</small>
                    </div>
                    <div className="col-3">
                      <h4 className="text-dark stylish-font mb-0">4.8★</h4>
                      <small className="text-muted">Rating</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid py-5">
          <div className="container">
            <div className="row g-4">
              {services.map((service, index) => (
                <div key={service.id} className="col-lg-4 col-md-6">
                  <div className="service-card card border-0 shadow-sm h-100" style={{ animationDelay: `${index * 0.1}s` }}>
                    {/* Service Image */}
                    <div className="service-image-container position-relative overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="service-image w-100"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="service-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                        <span className="service-icon">{service.icon}</span>
                      </div>
                    </div>
                    
                    {/* Service Content */}
                    <div className="card-body p-4">
                      <h4 className="service-title stylish-font mb-2">{service.title}</h4>
                      <p className="service-desc text-muted small mb-3">{service.shortDesc}</p>
                      
                      {/* Pricing Preview */}
                      <div className="pricing-preview mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="small text-muted">Starting from</span>
                          <span className="price-tag text-dark fw-bold">{service.pricing.basic.price}</span>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="service-actions d-flex gap-2">
                        <button 
                          className="btn btn-outline-dark btn-sm flex-grow-1"
                          onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                        >
                          {activeService === service.id ? 'Hide Details' : 'View Details'}
                        </button>
                        <Link to="/discover" className="btn btn-dark btn-sm">
                          Book Now
                        </Link>
                      </div>
                    </div>
                    
                    {/* Expandable Details */}
                    {activeService === service.id && (
                      <div className="service-details border-top">
                        <div className="p-4">
                          <p className="text-muted small mb-3">{service.fullDesc}</p>
                          
                          {/* Features */}
                          <h6 className="fw-bold mb-2">What's Included:</h6>
                          <div className="features-list mb-3">
                            {service.features.slice(0, 4).map((feature, idx) => (
                              <div key={idx} className="feature-item d-flex align-items-center mb-1">
                                <span className="text-dark me-2 small">✓</span>
                                <span className="small text-muted">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Pricing Tiers */}
                          <h6 className="fw-bold mb-2">Pricing Options:</h6>
                          <div className="pricing-tiers">
                            {Object.entries(service.pricing).map(([tier, details]) => (
                              <div key={tier} className="pricing-tier d-flex justify-content-between align-items-center mb-1">
                                <div>
                                  <span className="small fw-bold text-capitalize">{tier}: </span>
                                  <span className="small text-muted">{details.duration}</span>
                                </div>
                                <span className="small text-dark fw-bold">{details.price}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title stylish-font mb-3">Why Choose VK Clicks</h2>
              <p className="text-muted">Professional photography services you can trust</p>
            </div>
            
            <div className="row g-4">
              {[
                {
                  icon: "🏆",
                  title: "Award-Winning Quality",
                  desc: "Our photographers have won numerous awards for their exceptional work and creativity."
                },
                {
                  icon: "⚡",
                  title: "Quick Turnaround",
                  desc: "Fast editing and delivery within 24-48 hours for most photography sessions."
                },
                {
                  icon: "💯",
                  title: "100% Satisfaction",
                  desc: "Money-back guarantee if you're not completely satisfied with the final results."
                },
                {
                  icon: "📱",
                  title: "Easy Booking",
                  desc: "Simple online booking process with instant confirmation and secure payments."
                }
              ].map((benefit, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="benefit-card text-center">
                    <div className="benefit-icon mb-3">{benefit.icon}</div>
                    <h5 className="benefit-title stylish-font mb-2">{benefit.title}</h5>
                    <p className="benefit-desc text-muted small">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="services-cta py-5 bg-dark text-white text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h2 className="cta-title stylish-font mb-3">Ready to Book Your Session?</h2>
                <p className="cta-subtitle mb-4">
                  Connect with professional photographers in your city and create beautiful memories that last a lifetime.
                </p>
                <div className="cta-buttons d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/discover" className="btn btn-light btn-lg rounded-pill px-5">
                    <span className="me-2">📸</span>
                    <strong className="text-dark">Find Photographers</strong>
                  </Link>
                  <Link to="/gallery" className="btn btn-outline-light btn-lg rounded-pill px-5">
                    <span className="me-2">🖼️</span>
                    View Portfolio
                  </Link>
                </div>
                <p className="small mt-3 opacity-75">
                  ✨ Instant booking • Professional quality • 100% satisfaction guarantee
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services Page Styles - Black Theme */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Hero Section */
        .services-title {
          font-size: 2.5rem;
          color: #000000;
          font-weight: 700;
        }

        .services-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }

        .services-stats {
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .services-stats:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        /* Service Cards */
        .service-card {
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15) !important;
        }

        .service-image-container {
          position: relative;
          overflow: hidden;
        }

        .service-image {
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-image {
          transform: scale(1.1);
        }

        .service-overlay {
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.8), rgba(51, 51, 51, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .service-card:hover .service-overlay {
          opacity: 1;
        }

        .service-icon {
          font-size: 3rem;
          animation: bounce 2s infinite;
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

        .service-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #000000;
        }

        .service-desc {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .price-tag {
          font-size: 1.1rem;
          font-family: 'Playfair Display', serif;
          color: #000000 !important;
        }

        /* Service Details */
        .service-details {
          background: #f8fafc;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-item {
          font-size: 0.85rem;
        }

        .pricing-tier {
          font-size: 0.85rem;
          padding: 0.25rem 0;
        }

        /* Benefits Section */
        .benefit-card {
          transition: all 0.3s ease;
          padding: 1.5rem;
        }

        .benefit-card:hover {
          transform: translateY(-5px);
        }

        .benefit-icon {
          font-size: 2.5rem;
          transition: transform 0.3s ease;
        }

        .benefit-card:hover .benefit-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .benefit-title {
          font-size: 1.1rem;
          color: #000000;
        }

        .benefit-desc {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* CTA Section */
        .cta-title {
          font-size: 2rem;
          font-weight: 700;
        }

        .cta-subtitle {
          font-size: 1.1rem;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }

        /* Buttons - Black Theme */
        .btn {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-dark {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          border: none;
        }

        .btn-dark:hover {
          background: linear-gradient(135deg, #333333 0%, #000000 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .btn-outline-dark {
          border: 2px solid #000000;
          color: #000000;
        }

        .btn-outline-dark:hover {
          background: #000000;
          color: white;
          transform: translateY(-2px);
        }

        .btn-light {
          background: white;
          color: #000000;
          border: none;
          font-weight: 600;
        }

        .btn-light:hover {
          background: #f1f5f9;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .btn-outline-light {
          border: 2px solid rgba(255, 255, 255, 0.8);
          color: white;
        }

        .btn-outline-light:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: white;
          color: white;
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .services-title {
            font-size: 2rem;
          }

          .services-subtitle {
            font-size: 1rem;
          }

          .service-title {
            font-size: 1.1rem;
          }

          .service-icon {
            font-size: 2.5rem;
          }

          .benefit-icon {
            font-size: 2rem;
          }

          .cta-title {
            font-size: 1.75rem;
          }

          .cta-subtitle {
            font-size: 1rem;
          }
        }

        /* Background */
        .bg-dark {
          background: linear-gradient(135deg, #000000 0%, #ffffffff 100%) !important;
        }

        /* Utilities */
        .text-dark {
          color: #000000 !important;
        }

        .border-top {
          border-top: 1px solid #e2e8f0 !important;
        }
      `}</style>
    </>
  );
}
