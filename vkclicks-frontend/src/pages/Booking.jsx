import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data passed from PhotographerDetails
  const { photographer, selectedPackage } = location.state || {};

  const [bookingData, setBookingData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    specialRequests: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Enhanced validation and debugging
  useEffect(() => {
    console.log('=== BOOKING DATA CHECK ===');
    console.log('Location state:', location.state);
    console.log('Photographer:', photographer);
    console.log('Selected package:', selectedPackage);

    // Redirect if essential data is missing
    if (!location.state || !photographer || !selectedPackage) {
      console.error('🚨 MISSING ESSENTIAL DATA - REDIRECTING TO DISCOVER');
      alert('Missing booking information. Please select a photographer and package first.');
      navigate('/discover');
      return;
    }

    if (!photographer.id || !selectedPackage.id) {
      console.error('🚨 MISSING IDs - REDIRECTING TO DISCOVER');
      alert('Invalid photographer or package data. Please try again.');
      navigate('/discover');
      return;
    }

    console.log('✅ All required data present');
  }, [location.state, photographer, selectedPackage, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation function
  const validateForm = () => {
    const errors = {};
    
    if (!bookingData.clientName.trim()) {
      errors.clientName = 'Name is required';
    }
    
    if (!bookingData.clientEmail.trim()) {
      errors.clientEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(bookingData.clientEmail)) {
      errors.clientEmail = 'Invalid email format';
    }
    
    if (!bookingData.clientPhone.trim()) {
      errors.clientPhone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(bookingData.clientPhone.replace(/\D/g, ''))) {
      errors.clientPhone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!bookingData.eventDate) {
      errors.eventDate = 'Event date is required';
    } else {
      const selectedDate = new Date(bookingData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.eventDate = 'Event date cannot be in the past';
      }
    }
    
    if (!bookingData.eventTime) {
      errors.eventTime = 'Event time is required';
    }
    
    if (!bookingData.eventLocation.trim()) {
      errors.eventLocation = 'Event location is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setMessage('❌ fill the form');
      return;
    }

    setSubmitting(true);
    setMessage('');

    // Validate IDs exist
    if (!photographer?.id) {
      setMessage('❌ Photographer data is missing. Please go back and select again.');
      setSubmitting(false);
      return;
    }

    if (!selectedPackage?.id) {
      setMessage('❌ Package data is missing. Please go back and select again.');
      setSubmitting(false);
      return;
    }

    try {
      // 🚨 CORRECTED PAYLOAD - Use field names your Django view expects
      const dataToSend = {
        photographer_id: parseInt(photographer.id),        // ✅ Changed from 'photographer'
        package_id: parseInt(selectedPackage.id),          // ✅ Changed from 'package'
        client_name: bookingData.clientName.trim(),
        client_email: bookingData.clientEmail.trim(),
        client_phone: bookingData.clientPhone.trim(),
        event_date: bookingData.eventDate,
        event_time: bookingData.eventTime,
        event_location: bookingData.eventLocation.trim(),
        event_type: selectedPackage.event_type || '',
        special_requests: bookingData.specialRequests.trim(),
        status: 'pending'
      };

      console.log('🔍 Corrected payload for Django backend:', dataToSend);

      const response = await fetch('http://localhost:8000/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });

      const resData = await response.json();
      console.log('📥 Backend response:', resData);

      if (response.ok) {
        setMessage('🎉 Booking request submitted successfully!');
        setTimeout(() => navigate('/discover'), 3000);
      } else {
        throw new Error(resData.error || resData.detail || JSON.stringify(resData));
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
      console.error('Booking error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Early return if data is missing - this prevents the error
  if (!location.state || !photographer || !selectedPackage) {
    return (
      <>
        <div className="booking-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
          <div className="container">
            <div className="error-section">
              <div className="alert alert-warning border-0 shadow-sm text-center">
                <div className="error-icon mb-3" style={{ fontSize: "4rem" }}>⚠️</div>
                <h4 className="stylish-font">Missing Booking Information</h4>
                <p className="mb-4">Please go back and select a photographer and package first.</p>
                <Link to="/discover" className="btn btn-primary btn-lg rounded-pill">
                  <span className="me-2">←</span>
                  Go Back to Discover
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Additional check for IDs
  if (!photographer.id || !selectedPackage.id) {
    return (
      <>
        <div className="booking-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
          <div className="container">
            <div className="error-section">
              <div className="alert alert-danger border-0 shadow-sm text-center">
                <div className="error-icon mb-3" style={{ fontSize: "4rem" }}>❌</div>
                <h4 className="stylish-font">Invalid Data</h4>
                <p>Photographer or package information is incomplete.</p>
                <div className="error-details mb-4">
                  <small className="text-muted">
                    Photographer ID: {photographer?.id || 'Missing'}<br />
                    Package ID: {selectedPackage?.id || 'Missing'}
                  </small>
                </div>
                <Link to="/discover" className="btn btn-primary btn-lg rounded-pill">
                  <span className="me-2">←</span>
                  Go Back to Discover
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="booking-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Hero Section */}
        <section className="booking-hero py-4 bg-white">
          <div className="container">
            <div className="text-center">
              <h1 className="booking-title stylish-font mb-2">Book Your Photography Session</h1>
              <p className="booking-subtitle text-muted">
                Complete your booking details to secure your photography session
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row g-4 justify-content-center">
            
            {/* Main Booking Form */}
            <div className="col-lg-8">
              <div className="booking-form-card card border-0 shadow-lg">
                <div className="card-header bg-primary text-white py-4">
                  <h4 className="mb-0 stylish-font">
                    <span className="me-2">📅</span>
                    Photography Session Details
                  </h4>
                  <small className="opacity-75">Fill in your event information below</small>
                </div>
                
                <div className="card-body p-4">
                  {/* Message Alert */}
                  {message && (
                    <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} border-0 shadow-sm mb-4`}>
                      <div className="d-flex align-items-center">
                        <span className="me-2">
                          {message.includes('successfully') ? '🎉' : '⚠️'}
                        </span>
                        <span>{message}</span>
                      </div>
                    </div>
                  )}

                  {/* Booking Form */}
                  <form onSubmit={handleSubmit} className="booking-form">
                    
                    {/* Personal Information Section */}
                    <div className="form-section mb-4">
                      <h5 className="section-title stylish-font mb-3">
                        <span className="me-2">👤</span>
                        Personal Information
                      </h5>
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label fw-bold small">
                            <span className="me-2">📝</span>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="clientName"
                            className={`form-control form-control-lg ${formErrors.clientName ? 'is-invalid' : ''}`}
                            value={bookingData.clientName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                          />
                          {formErrors.clientName && <div className="invalid-feedback">{formErrors.clientName}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold small">
                            <span className="me-2">📧</span>
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="clientEmail"
                            className={`form-control form-control-lg ${formErrors.clientEmail ? 'is-invalid' : ''}`}
                            value={bookingData.clientEmail}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                          />
                          {formErrors.clientEmail && <div className="invalid-feedback">{formErrors.clientEmail}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold small">
                            <span className="me-2">📱</span>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="clientPhone"
                            className={`form-control form-control-lg ${formErrors.clientPhone ? 'is-invalid' : ''}`}
                            value={bookingData.clientPhone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                          />
                          {formErrors.clientPhone && <div className="invalid-feedback">{formErrors.clientPhone}</div>}
                        </div>
                      </div>
                    </div>

                    {/* Event Information Section */}
                    <div className="form-section mb-4">
                      <h5 className="section-title stylish-font mb-3">
                        <span className="me-2">📅</span>
                        Event Information
                      </h5>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label fw-bold small">
                            <span className="me-2">📆</span>
                            Event Date *
                          </label>
                          <input
                            type="date"
                            name="eventDate"
                            className={`form-control form-control-lg ${formErrors.eventDate ? 'is-invalid' : ''}`}
                            value={bookingData.eventDate}
                            onChange={handleInputChange}
                          />
                          {formErrors.eventDate && <div className="invalid-feedback">{formErrors.eventDate}</div>}
                        </div>

                        <div className="col-md-6">
                          <label className="form-label fw-bold small">
                            <span className="me-2">🕐</span>
                            Event Time *
                          </label>
                          <input
                            type="time"
                            name="eventTime"
                            className={`form-control form-control-lg ${formErrors.eventTime ? 'is-invalid' : ''}`}
                            value={bookingData.eventTime}
                            onChange={handleInputChange}
                          />
                          {formErrors.eventTime && <div className="invalid-feedback">{formErrors.eventTime}</div>}
                        </div>

                        <div className="col-12">
                          <label className="form-label fw-bold small">
                            <span className="me-2">📍</span>
                            Event Location *
                          </label>
                          <input
                            type="text"
                            name="eventLocation"
                            className={`form-control form-control-lg ${formErrors.eventLocation ? 'is-invalid' : ''}`}
                            value={bookingData.eventLocation}
                            onChange={handleInputChange}
                            placeholder="Enter complete event address"
                          />
                          {formErrors.eventLocation && <div className="invalid-feedback">{formErrors.eventLocation}</div>}
                        </div>
                      </div>
                    </div>

                    {/* Special Requests Section */}
                    <div className="form-section mb-4">
                      <h5 className="section-title stylish-font mb-3">
                        <span className="me-2">💬</span>
                        Additional Information
                      </h5>
                      <div className="form-group">
                        <label className="form-label fw-bold small">
                          <span className="me-2">📋</span>
                          Special Requests (Optional)
                        </label>
                        <textarea
                          name="specialRequests"
                          className="form-control form-control-lg"
                          rows="4"
                          value={bookingData.specialRequests}
                          onChange={handleInputChange}
                          placeholder="Any special requirements, themes, or specific shots you'd like..."
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-actions">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg w-100 rounded-pill"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Submitting Booking...
                          </>
                        ) : (
                          <>
                            <span className="me-2">🚀</span>
                            Submit Booking Request
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="col-lg-4">
              <div className="booking-summary-card card border-0 shadow-lg sticky-top" style={{ top: '120px' }}>
                <div className="card-header bg-light py-4">
                  <h5 className="mb-0 stylish-font">
                    <span className="me-2">📋</span>
                    Booking Summary
                  </h5>
                </div>
                
                <div className="card-body p-4">
                  {/* Package Details */}
                  <div className="package-summary mb-4">
                    <h6 className="summary-title stylish-font">Selected Package</h6>
                    <div className="package-info">
                      <h5 className="package-name text-primary stylish-font">{selectedPackage.name}</h5>
                      <div className="package-details">
                        <div className="detail-item d-flex justify-content-between mb-2">
                          <span className="detail-label">Event Type:</span>
                          <span className="detail-value">{selectedPackage.event_type}</span>
                        </div>
                        <div className="detail-item d-flex justify-content-between mb-2">
                          <span className="detail-label">Duration:</span>
                          <span className="detail-value">{selectedPackage.duration}h</span>
                        </div>
                        <div className="detail-item d-flex justify-content-between mb-2">
                          <span className="detail-label">Delivery:</span>
                          <span className="detail-value">{selectedPackage.delivery_time} days</span>
                        </div>
                        <div className="detail-item d-flex justify-content-between">
                          <span className="detail-label fw-bold">Package Price:</span>
                          <span className="detail-value fw-bold text-success stylish-font">₹{selectedPackage.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Photographer Details */}
                  <div className="photographer-summary mb-4">
                    <h6 className="summary-title stylish-font">Your Photographer</h6>
                    <div className="photographer-info">
                      <h6 className="photographer-name text-primary">{photographer.user?.username}</h6>
                      <div className="contact-info">
                        <div className="contact-item d-flex align-items-center mb-1">
                          <span className="contact-icon me-2">📞</span>
                          <span className="contact-text">{photographer.phone_number}</span>
                        </div>
                        <div className="contact-item d-flex align-items-center">
                          <span className="contact-icon me-2">✉️</span>
                          <span className="contact-text">{photographer.user?.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="booking-notes">
                    <h6 className="notes-title stylish-font">Important Notes</h6>
                    <div className="notes-list">
                      <div className="note-item d-flex align-items-start mb-2">
                        <span className="note-icon me-2">📧</span>
                        <small className="note-text">You will receive a confirmation email once the photographer accepts your request.</small>
                      </div>
                      <div className="note-item d-flex align-items-start mb-2">
                        <span className="note-icon me-2">💬</span>
                        <small className="note-text">The photographer may contact you to discuss additional details.</small>
                      </div>
                      <div className="note-item d-flex align-items-start">
                        <span className="note-icon me-2">💳</span>
                        <small className="note-text">Payment will be processed after confirmation.</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Booking Page Styles */}
      <style>{`
        /* Typography - Consistent with other pages */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Page Layout */
        .booking-page {
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Hero Section */
        .booking-title {
          font-size: 2.2rem;
          color: #1e293b;
          font-weight: 700;
        }

        .booking-subtitle {
          font-size: 1rem;
          font-weight: 300;
        }

        /* Form Cards */
        .booking-form-card,
        .booking-summary-card {
          border-radius: 16px;
          overflow: hidden;
        }

        .booking-form-card {
          animation: slideUp 0.6s ease forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Form Sections */
        .form-section {
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 1.5rem;
        }

        .form-section:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .section-title {
          color: #374151;
          font-size: 1.1rem;
          font-weight: 600;
        }

        /* Form Styling */
        .form-label {
          color: #374151;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .form-control {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-family: 'Source Sans Pro', sans-serif;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .form-control:focus {
          border-color: #000000ff;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
        }

        .form-control.is-invalid {
          border-color: #dc2626;
        }

        .form-control.is-invalid:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 0.2rem rgba(220, 38, 38, 0.25);
        }

        .invalid-feedback {
          font-size: 0.8rem;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Summary Card */
        .summary-title {
          color: #374151;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }

        .package-name {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .detail-item {
          font-size: 0.9rem;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .detail-label {
          color: #6b7280;
        }

        .detail-value {
          color: #374151;
          font-weight: 500;
        }

        .photographer-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .contact-item {
          font-size: 0.9rem;
          color: #6b7280;
        }

        .contact-icon {
          font-size: 0.8rem;
        }

        .notes-title {
          color: #374151;
          font-size: 0.95rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
        }

        .note-item {
          margin-bottom: 0.5rem;
        }

        .note-icon {
          font-size: 0.8rem;
          margin-top: 0.1rem;
        }

        .note-text {
          color: #6b7280;
          line-height: 1.4;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Buttons */
        .btn {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #000000ff 0%, #000000ff 100%);
          border: none;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #000000ff 0%, #000000ff 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
        }

        .btn-success {
          background: linear-gradient(135deg, #059669 0%, #10b981 100%);
          border: none;
        }

        .btn-success:hover {
          background: linear-gradient(135deg, #047857 0%, #059669 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
        }

        .btn:disabled {
          transform: none;
          box-shadow: none;
          opacity: 0.7;
        }

        /* Spinner */
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }

        /* Alerts */
        .alert {
          border-radius: 12px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .alert-success {
          background-color: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .alert-danger {
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .alert-warning {
          background-color: #fffbeb;
          color: #d97706;
          border: 1px solid #fed7aa;
        }

        /* Error Section */
        .error-section {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-icon {
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .booking-title {
            font-size: 1.8rem;
          }

          .booking-summary-card {
            position: relative !important;
            top: auto !important;
            margin-top: 2rem;
          }

          .form-control-lg {
            padding: 0.6rem 0.9rem;
            font-size: 0.9rem;
          }

          .btn-lg {
            padding: 0.6rem 1rem;
            font-size: 0.95rem;
          }

          .section-title {
            font-size: 1rem;
          }

          .package-name {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .booking-form-card,
          .booking-summary-card {
            border-radius: 12px;
          }

          .card-body {
            padding: 1.5rem !important;
          }

          .form-section {
            padding-bottom: 1rem;
          }
        }

        /* Background Colors */
        .bg-primary {
          background: linear-gradient(135deg, #000000ff 0%, #000000ff 100%) !important;
        }

        .text-primary {
          color: #000000ff !important;
        }

        .text-success {
          color: #000000ff !important;
        }

        /* Utilities */
        .border-0 {
          border: none !important;
        }

        .shadow-lg {
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }

        .rounded-pill {
          border-radius: 50rem !important;
        }

        .sticky-top {
          position: sticky;
        }
      `}</style>
    </>
  );
}
