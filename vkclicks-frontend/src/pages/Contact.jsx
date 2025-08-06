import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      primary: "hello@vkclicks.com",
      secondary: "support@vkclicks.com",
      description: "Get in touch via email"
    },
    {
      icon: "📱",
      title: "Call Us",
      primary: "+91 98765 43210",
      secondary: "+91 98765 43211",
      description: "24/7 customer support"
    },
    {
      icon: "📍",
      title: "Visit Us",
      primary: "123 Photography Lane",
      secondary: "Andheri West, Mumbai 400058",
      description: "Our main office location"
    },
    {
      icon: "💬",
      title: "Live Chat",
      primary: "Chat with us now",
      secondary: "Available 9 AM - 9 PM",
      description: "Instant support available"
    }
  ];

  const officeLocations = [
    {
      city: "Mumbai",
      address: "123 Photography Lane, Andheri West, Mumbai 400058",
      phone: "+91 98765 43210",
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80"
    },
    {
      city: "Delhi",
      address: "456 Creative Hub, Connaught Place, New Delhi 110001",
      phone: "+91 98765 43211",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80"
    },
    {
      city: "Bangalore",
      address: "789 Tech Park, Koramangala, Bangalore 560034",
      phone: "+91 98765 43212",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const faqItems = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We respond to all inquiries within 2-4 hours during business hours and within 24 hours on weekends."
    },
    {
      question: "Can I speak directly with a photographer?",
      answer: "Yes! Once you submit an inquiry, we'll connect you directly with suitable photographers in your area."
    },
    {
      question: "Do you offer emergency bookings?",
      answer: "We offer same-day and emergency booking services. Additional charges may apply for urgent requests."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets for secure transactions."
    }
  ];

  return (
    <>
      <div className="contact-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Hero Section */}
        <section className="contact-hero py-5 bg-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="contact-title stylish-font mb-3">Get in Touch</h1>
                <p className="contact-subtitle text-muted mb-4">
                  Have questions about our photography services? Need help with booking? 
                  Our friendly team is here to assist you every step of the way.
                </p>
                <div className="contact-highlights">
                  <div className="d-flex align-items-center mb-2">
                    <span className="highlight-icon me-3">⚡</span>
                    <span className="small">Quick response within 2-4 hours</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <span className="highlight-icon me-3">📞</span>
                    <span className="small">24/7 customer support available</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="highlight-icon me-3">🎯</span>
                    <span className="small">Personalized photography solutions</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&w=500&q=80"
                  alt="Contact VK Clicks"
                  className="hero-image img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '350px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="contact-info py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title stylish-font mb-3">Contact Information</h2>
              <p className="text-muted">Multiple ways to reach us - choose what works best for you</p>
            </div>
            
            <div className="row g-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="contact-info-card card border-0 shadow-sm h-100 text-center">
                    <div className="card-body p-4">
                      <div className="info-icon mb-3">{info.icon}</div>
                      <h5 className="info-title stylish-font mb-2">{info.title}</h5>
                      <p className="info-primary fw-bold mb-1">{info.primary}</p>
                      <p className="info-secondary text-muted small mb-2">{info.secondary}</p>
                      <p className="info-desc text-muted small">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Office Locations */}
        <section className="contact-form-section py-5 bg-white">
          <div className="container">
            <div className="row g-5">
              {/* Contact Form */}
              <div className="col-lg-8">
                <div className="contact-form-container">
                  <h3 className="form-title stylish-font mb-4">Send us a Message</h3>
                  
                  {submitStatus === 'success' && (
                    <div className="alert alert-success d-flex align-items-center mb-4">
                      <span className="me-2">✅</span>
                      <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-lg"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control form-control-lg"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold">Inquiry Type</label>
                        <select
                          name="inquiryType"
                          className="form-select form-select-lg"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="wedding">Wedding Photography</option>
                          <option value="portrait">Portrait Session</option>
                          <option value="event">Event Photography</option>
                          <option value="commercial">Commercial Work</option>
                          <option value="support">Technical Support</option>
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          className="form-control form-control-lg"
                          placeholder="Brief subject of your inquiry"
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label small fw-bold">Message *</label>
                        <textarea
                          name="message"
                          className="form-control form-control-lg"
                          rows="5"
                          placeholder="Tell us about your photography needs, event details, or any questions you have..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="form-footer mt-4">
                      <button
                        type="submit"
                        className="btn btn-dark btn-lg rounded-pill px-5"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Sending...
                          </>
                        ) : (
                          <>
                            <span className="me-2">📤</span>
                            Send Message
                          </>
                        )}
                      </button>
                      <p className="small text-muted mt-2 mb-0">
                        * Required fields. We'll respond within 2-4 hours during business hours.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Office Locations */}
              <div className="col-lg-4">
                <div className="office-locations">
                  <h3 className="locations-title stylish-font mb-4">Our Offices</h3>
                  
                  {officeLocations.map((office, index) => (
                    <div key={index} className="office-card card border-0 shadow-sm mb-3">
                      <div className="office-image-container position-relative overflow-hidden">
                        <img
                          src={office.image}
                          alt={`${office.city} Office`}
                          className="office-image w-100"
                          style={{ height: '120px', objectFit: 'cover' }}
                        />
                        <div className="office-overlay position-absolute bottom-0 start-0 end-0 p-3">
                          <h6 className="office-city text-white fw-bold mb-0">{office.city}</h6>
                        </div>
                      </div>
                      <div className="card-body p-3">
                        <p className="office-address small text-muted mb-2">{office.address}</p>
                        <p className="office-phone small fw-bold mb-0">📞 {office.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="contact-faq py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title stylish-font mb-3">Frequently Asked Questions</h2>
              <p className="text-muted">Quick answers to common contact and support questions</p>
            </div>
            
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="faq-list">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="faq-item card border-0 shadow-sm mb-3">
                      <div className="card-body p-4">
                        <h6 className="faq-question stylish-font fw-bold mb-2">{faq.question}</h6>
                        <p className="faq-answer text-muted small mb-0">{faq.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="emergency-contact py-4 bg-dark text-white text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h4 className="emergency-title stylish-font mb-2">Need Urgent Support?</h4>
                <p className="emergency-subtitle mb-3">
                  For same-day bookings or urgent photography needs, call our emergency hotline
                </p>
                <div className="emergency-contact-info">
                  <a href="tel:+919876543210" className="btn btn-light btn-lg rounded-pill px-5 me-3">
                    <span className="me-2">🚨</span>
                    <strong className="text-dark">Emergency: +91 98765 43210</strong>
                  </a>
                  <a href="mailto:urgent@vkclicks.com" className="btn btn-outline-light btn-lg rounded-pill px-5">
                    <span className="me-2">⚡</span>
                    urgent@vkclicks.com
                  </a>
                </div>
                <p className="small mt-3 opacity-75">
                  🕒 Emergency support available 24/7 • Additional charges may apply
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Contact Page Styles - Black Theme */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Hero Section */
        .contact-title {
          font-size: 2.5rem;
          color: #000000;
          font-weight: 700;
        }

        .contact-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }

        .contact-highlights {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #e2e8f0;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .highlight-icon {
          font-size: 1.2rem;
          width: 30px;
          text-align: center;
        }

        .hero-image {
          transition: transform 0.3s ease;
        }

        .hero-image:hover {
          transform: scale(1.02);
        }

        /* Contact Info Cards */
        .contact-info-card {
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }

        .info-icon {
          font-size: 2.5rem;
          transition: transform 0.3s ease;
        }

        .contact-info-card:hover .info-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .info-title {
          color: #000000;
          font-size: 1.1rem;
        }

        .info-primary {
          color: #000000;
          font-size: 0.95rem;
        }

        .info-secondary, .info-desc {
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Contact Form */
        .contact-form-container {
          background: #ffffff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
        }

        .form-title {
          color: #000000;
          font-size: 1.5rem;
        }

        .form-label {
          color: #374151;
          font-family: 'Source Sans Pro', sans-serif;
          margin-bottom: 0.5rem;
        }

        .form-control, .form-select {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-family: 'Source Sans Pro', sans-serif;
          transition: all 0.3s ease;
        }

        .form-control:focus, .form-select:focus {
          border-color: #000000;
          box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.15);
        }

        .form-control-lg, .form-select-lg {
          padding: 1rem 1.25rem;
          font-size: 1rem;
        }

        /* Office Locations */
        .locations-title {
          color: #000000;
          font-size: 1.3rem;
        }

        .office-card {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .office-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }

        .office-image {
          transition: transform 0.3s ease;
        }

        .office-card:hover .office-image {
          transform: scale(1.05);
        }

        .office-overlay {
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
        }

        .office-city {
          font-size: 1rem;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.8);
        }

        .office-address, .office-phone {
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* FAQ Section */
        .faq-item {
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
        }

        .faq-question {
          color: #000000;
          font-size: 0.95rem;
        }

        .faq-answer {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Emergency Contact */
        .emergency-title {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .emergency-subtitle {
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
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }

        .btn-outline-light {
          border: 2px solid rgba(255,255,255,0.8);
          color: white;
        }

        .btn-outline-light:hover {
          background: rgba(255,255,255,0.2);
          border-color: white;
          color: white;
          transform: translateY(-2px);
        }

        /* Alert Styles */
        .alert-success {
          background-color: #dcfce7;
          border: 1px solid #bbf7d0;
          color: #166534;
          border-radius: 8px;
        }

        /* Spinner */
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-title {
            font-size: 2rem;
          }

          .contact-subtitle {
            font-size: 1rem;
          }

          .contact-form-container {
            padding: 1.5rem;
          }

          .form-title {
            font-size: 1.3rem;
          }

          .info-icon {
            font-size: 2rem;
          }

          .emergency-title {
            font-size: 1.3rem;
          }

          .emergency-contact-info {
            flex-direction: column;
            gap: 1rem;
          }

          .emergency-contact-info .btn {
            margin: 0 !important;
          }
        }

        /* Background */
        .bg-dark {
          background: linear-gradient(135deg, #000000 0%, #333333 100%) !important;
        }

        .text-dark {
          color: #000000 !important;
        }

        .section-title {
          font-size: 2rem;
          color: #000000;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}
