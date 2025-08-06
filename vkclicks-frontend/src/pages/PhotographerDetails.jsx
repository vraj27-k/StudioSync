import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

// Review Form Component
function ReviewForm({ photographerId, onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    rating: 5,
    comment: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:8000/api/photographer/${photographerId}/reviews/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          photographer: photographerId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Review submitted successfully!');
        setFormData({
          client_name: '',
          client_email: '',
          rating: 5,
          comment: ''
        });
        if (onReviewSubmitted) onReviewSubmitted();
      } else {
        // Handle unique constraint error specifically
        if (data.non_field_errors && data.non_field_errors[0].includes('must make a unique set')) {
          setMessage('❌ You have already submitted a review for this photographer. Your previous review has been updated.');
        } else {
          const err =
            data.client_name?.[0] ||
            data.client_email?.[0] ||
            data.rating?.[0] ||
            data.comment?.[0] ||
            data.detail ||
            data.non_field_errors?.[0] ||
            'Review submission failed. Please try again.';
          setMessage(`❌ Error: ${err}`);
        }
      }
    } catch (error) {
      setMessage(`❌ Network error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="review-form-container">
      <div className="review-form-header">
        <h4 className="stylish-font">Leave a Review</h4>
      </div>
      <div className="review-form-body">
        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                name="client_name"
                value={formData.client_name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Your Email *</label>
              <input
                type="email"
                name="client_email"
                value={formData.client_email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Rating *</label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 stars - Excellent)</option>
              <option value={4}>⭐⭐⭐⭐ (4 stars - Very Good)</option>
              <option value={3}>⭐⭐⭐ (3 stars - Good)</option>
              <option value={2}>⭐⭐ (2 stars - Fair)</option>
              <option value={1}>⭐ (1 star - Poor)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Review *</label>
            <textarea
              name="comment"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              required
              placeholder="Share your experience..."
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Review List Component
function ReviewList({ photographerId }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const [reviewsRes, summaryRes] = await Promise.all([
        fetch(`http://localhost:8000/api/photographer/${photographerId}/reviews/`),
        fetch(`http://localhost:8000/api/photographer/${photographerId}/reviews/summary/`)
      ]);

      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json();
        setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      }

      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (photographerId) {
      fetchReviews();
    }
  }, [photographerId]);

  const renderStars = (rating) => {
    const numRating = Number(rating) || 0;
    return '⭐'.repeat(Math.floor(numRating)) + '☆'.repeat(5 - Math.floor(numRating));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (loading) {
    return <div className="loading">Loading reviews...</div>;
  }

  return (
    <div className="reviews-section">
      {/* Review Summary */}
      {summary && summary.total_reviews > 0 && (
        <div className="review-summary">
          <div className="summary-left">
            <h2 className="stylish-font">{summary.average_rating?.toFixed(1) || '0.0'}</h2>
            <div>{renderStars(summary.average_rating)}</div>
            <p>{summary.total_reviews} reviews</p>
          </div>
          <div className="summary-right">
            <h5 className="stylish-font">Rating Distribution</h5>
            {[5, 4, 3, 2, 1].map(star => {
              const starData = summary.rating_distribution?.[`${star}_star`];
              const count = starData?.count || 0;
              const percentage = starData?.percentage || 0;
              return (
                <div key={star} className="rating-bar">
                  <span>{star} ⭐</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Individual Reviews */}
      <div className="reviews-list">
        <h4 className="stylish-font">Client Reviews</h4>
        {reviews.length > 0 ? (
          <div className="reviews-grid-compact">
            {reviews.map(review => (
              <div key={review.id || Math.random()} className="review-card-small">
                <div className="review-header">
                  <h6 className="reviewer-name stylish-font">{review.client_name || 'Anonymous'}</h6>
                  <span className="review-rating">{renderStars(review.rating)}</span>
                </div>
                <p className="review-comment">"{review.comment || 'No comment provided'}"</p>
                <small className="review-date">{formatDate(review.created_at)}</small>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to leave a review!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Component
export default function PhotographerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [photographer, setPhotographer] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('No photographer ID provided');
      setLoading(false);
      return;
    }
    
    async function fetchPhotographer() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:8000/api/photographer/${id}/`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Photographer not found');
          }
          if (res.status === 403) {
            throw new Error('Access denied to photographer profile');
          }
          throw new Error(`Error fetching photographer: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setPhotographer(data);
        await fetchPortfolioImages(id);
      } catch (err) {
        console.error('Fetch photographer error:', err);
        setError(err.message || 'Failed to fetch photographer details');
        setPhotographer(null);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPortfolioImages(photographerId) {
      try {
        const res = await fetch(`http://localhost:8000/api/photographer/${photographerId}/portfolio/`);
        if (res.ok) {
          const data = await res.json();
          setPortfolioImages(Array.isArray(data) ? data : []);
        } else {
          console.warn('Failed to fetch portfolio images:', res.status);
          setPortfolioImages([]);
        }
      } catch (error) {
        console.warn('Portfolio fetch error:', error);
        setPortfolioImages([]);
      }
    }

    fetchPhotographer();

    return () => {
      setSelectedImage(null);
    };
  }, [id]);

  function handlePackageSelect(pkg) {
    if (!photographer?.id) {
      alert('❌ Error: Photographer data is invalid. Please refresh the page.');
      return;
    }
    if (!pkg?.id && !pkg?.name) {
      alert('❌ Error: Package data is invalid. Please try again.');
      return;
    }
    try {
      navigate('/booking', {
        state: { photographer, selectedPackage: pkg }
      });
    } catch (navError) {
      console.error('Navigation error:', navError);
      alert('❌ Navigation error. Please try again.');
    }
  }

  function handleImageError(e) {
    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";
  }

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    // Force refresh reviews instead of full page reload
    setTimeout(() => {
      const reviewListElement = document.querySelector('.reviews-section-wrapper');
      if (reviewListElement) {
        window.location.reload();
      }
    }, 1000);
  };

  // Loading UI
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-center">
          <div className="spinner"></div>
          <p>Loading photographer details...</p>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="page-container">
        <div className="error-center">
          <h5 className="stylish-font">Error Loading Photographer</h5>
          <p>{error}</p>
          <div className="error-actions">
            <Link to="/discover" className="btn btn-primary">← Back to Discover</Link>
            <button className="btn btn-secondary" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not found UI
  if (!photographer) {
    return (
      <div className="page-container">
        <div className="error-center">
          <h5 className="stylish-font">Photographer Not Found</h5>
          <p>The photographer you're looking for doesn't exist or has been removed.</p>
          <Link to="/discover" className="btn btn-primary">← Back to Discover</Link>
        </div>
      </div>
    );
  }

  // Main Display UI
  return (
    <>
      <div className="photographer-details-page">
        <div className="page-container">
          
          {/* Header */}
          <div className="page-header">
            <Link to="/discover" className="btn btn-secondary">← Back to Discover</Link>
            <div className="header-actions">
              <button 
                className={`btn ${showReviewForm ? 'btn-warning' : 'btn-primary'}`}
                onClick={() => setShowReviewForm(!showReviewForm)}
              >
                {showReviewForm ? 'Hide Review Form' : 'Write a Review'}
              </button>
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <ReviewForm 
              photographerId={id} 
              onReviewSubmitted={handleReviewSubmitted}
            />
          )}

          {/* Main Content: Two Column Layout */}
          <div className="main-content">
            
            {/* Left Column - Intro */}
            <div className="intro-column">
              <div className="intro-card">
                <div className="profile-image-container">
                  <img
                    src={photographer.profile_picture ? `http://localhost:8000${photographer.profile_picture}` : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                    alt={photographer.user?.username || "Photographer"}
                    className="profile-image"
                    onError={handleImageError}
                  />
                </div>
                
                <div className="profile-info">
                  <h2 className="photographer-name stylish-font">
                    {photographer.user?.username || "Professional Photographer"}
                  </h2>
                  <p className="photographer-title">Professional Photographer</p>
                  
                  <div className="contact-info">
                    <h5 className="stylish-font">Contact Information</h5>
                    <div className="contact-item">
                      <strong>Email:</strong>
                      <span>{photographer.user?.email || "Not available"}</span>
                    </div>
                    <div className="contact-item">
                      <strong>Phone:</strong>
                      <span>{photographer.phone_number || "Not available"}</span>
                    </div>
                    <div className="contact-item">
                      <strong>Location:</strong>
                      <span>{photographer.location || "Not specified"}</span>
                    </div>
                    
                    {photographer.phone_number && (
                      <div className="contact-actions">
                        <a href={`tel:${photographer.phone_number}`} className="btn btn-primary">
                          Call Now
                        </a>
                        <a href={`mailto:${photographer.user?.email || ''}`} className="btn btn-secondary">
                          Email
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="services-info">
                    <h5 className="stylish-font">Photography Services</h5>
                    {photographer.type_of_photography ? (
                      <div className="services-list">
                        {photographer.type_of_photography.split(",").map((service, idx) => (
                          <span key={idx} className="service-tag">
                            {service.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p>No services specified</p>
                    )}
                  </div>

                  <div className="bio-section">
                    <h5 className="stylish-font">About Me</h5>
                    <p className="bio-text">
                      {photographer.bio || "No bio provided yet. Contact me to learn more about my photography style and experience."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Packages, Portfolio, Team */}
            <div className="content-column">
              
              {/* Packages Section */}
              <div className="content-section">
                <h4 className="section-title stylish-font">Photography Packages</h4>
                {photographer.packages && photographer.packages.length > 0 ? (
                  <div className="packages-list">
                    {photographer.packages.map((pkg, idx) => (
                      <div key={pkg.id || idx} className="package-item">
                        <div className="package-header">
                          <h5 className="stylish-font">{pkg.name || 'Custom Package'}</h5>
                          <span className="package-price stylish-font">₹{pkg.price || '0'}</span>
                        </div>
                        <p className="package-description">
                          {pkg.description || "No description available."}
                        </p>
                        <div className="package-details">
                          {pkg.duration && <span>Duration: {pkg.duration}h</span>}
                          {pkg.delivery_time && <span>Delivery: {pkg.delivery_time}d</span>}
                          {pkg.event_type && <span>Type: {pkg.event_type}</span>}
                        </div>
                        {pkg.includes && (
                          <div className="package-includes">
                            <small>✅ Includes: {pkg.includes}</small>
                          </div>
                        )}
                        <button
                          className="btn btn-primary package-select-btn"
                          onClick={() => handlePackageSelect(pkg)}
                        >
                          Select Package - ₹{pkg.price || '0'}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-content">
                    <p>Custom packages available. Contact the photographer directly to discuss pricing.</p>
                  </div>
                )}
              </div>

              {/* Portfolio Section */}
              <div className="content-section">
                <h4 className="section-title stylish-font">Portfolio Gallery</h4>
                {portfolioImages.length > 0 ? (
                  <div className="portfolio-grid">
                    {portfolioImages.map((image, idx) => (
                      <div className="portfolio-item" key={image.id || idx}>
                        <img
                          src={image.image ? `http://localhost:8000${image.image}` : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
                          alt={image.caption || `Portfolio ${idx + 1}`}
                          className="portfolio-image"
                          onClick={() => setSelectedImage(image)}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        {image.caption && (
                          <p className="portfolio-caption">{image.caption}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-content">
                    <p>Portfolio coming soon. Contact photographer to see sample work.</p>
                  </div>
                )}
              </div>

              {/* Team Section */}
              <div className="content-section">
                <h4 className="section-title stylish-font">Our Team</h4>
                {photographer.team && photographer.team.length > 0 ? (
                  <div className="team-list">
                    {photographer.team.map((member, idx) => (
                      <div key={member.id || idx} className="team-member">
                        <h6 className="stylish-font">{member.name || 'Team Member'}</h6>
                        <p>{member.role || "Team Member"}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-content">
                    <p>This is a solo photographer providing personalized service.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="reviews-section-wrapper">
            <ReviewList photographerId={id} />
          </div>
        </div>
      </div>

      {/* Portfolio Image Modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <img
              src={selectedImage.image ? `http://localhost:8000${selectedImage.image}` : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"}
              alt={selectedImage.caption || "Portfolio image"}
              className="modal-image"
            />
            {selectedImage.caption && (
              <p className="modal-caption">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}

      {/* Updated Styles with Smaller Review Cards and Consistent Fonts */}
      <style>{`
        /* Typography - Consistent with other pages */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Reset and Base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Source Sans Pro', sans-serif;
          color: #333;
          line-height: 1.5;
        }

        /* Page Layout */
        .photographer-details-page {
          padding-top: 100px;
          min-height: 100vh;
          background-color: #fafafa;
        }

        .page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding: 20px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        /* Buttons */
        .btn {
          padding: 10px 20px;
          border: 1px solid #ddd;
          background: white;
          color: #333;
          text-decoration: none;
          border-radius: 4px;
          cursor: pointer;
          display: inline-block;
          font-size: 14px;
          font-family: 'Source Sans Pro', sans-serif;
          transition: all 0.2s;
        }

        .btn:hover {
          background: #f5f5f5;
        }

        .btn-primary {
          background: #000000ff;
          color: white;
          border-color: #000000ff;
        }

        .btn-primary:hover {
          background: #000000ff;
          border-color: #000000ff;
        }

        .btn-secondary {
          background: #6b7280;
          color: white;
          border-color: #6b7280;
        }

        .btn-secondary:hover {
          background: #4b5563;
          border-color: #4b5563;
        }

        .btn-warning {
          background: #f59e0b;
          color: white;
          border-color: #f59e0b;
        }

        /* Main Content Layout */
        .main-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        /* Left Column - Intro */
        .intro-column {
          background: white;
          border-radius: 8px;
          padding: 30px;
          border: 1px solid #e0e0e0;
          height: fit-content;
        }

        .profile-image-container {
          text-align: center;
          margin-bottom: 20px;
        }

        .profile-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #e0e0e0;
        }

        .photographer-name {
          font-size: 24px;
          margin-bottom: 5px;
          color: #000000ff;
        }

        .photographer-title {
          color: #666;
          margin-bottom: 20px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .contact-info,
        .services-info,
        .bio-section {
          margin-bottom: 25px;
        }

        .contact-info h5,
        .services-info h5,
        .bio-section h5 {
          font-size: 16px;
          margin-bottom: 10px;
          color: #333;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }

        .contact-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .contact-item strong {
          color: #555;
        }

        .contact-actions {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .services-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .service-tag {
          background: #f3f4f6;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: #374151;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .bio-text {
          color: #666;
          line-height: 1.6;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Right Column - Content */
        .content-column {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .content-section {
          background: white;
          border-radius: 8px;
          padding: 25px;
          border: 1px solid #e0e0e0;
        }

        .section-title {
          font-size: 18px;
          margin-bottom: 20px;
          color: #333;
          border-bottom: 2px solid #2563eb;
          padding-bottom: 8px;
        }

        /* Packages */
        .packages-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .package-item {
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 20px;
        }

        .package-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .package-header h5 {
          margin: 0;
          color: #333;
        }

        .package-price {
          font-size: 18px;
          font-weight: bold;
          color: #000000ff;
        }

        .package-description {
          color: #666;
          margin-bottom: 10px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .package-details {
          display: flex;
          gap: 15px;
          margin-bottom: 10px;
        }

        .package-details span {
          font-size: 12px;
          color: #666;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .package-includes {
          margin-bottom: 15px;
        }

        .package-select-btn {
          width: 100%;
        }

        /* Portfolio */
        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }

        .portfolio-item {
          text-align: center;
        }

        .portfolio-image {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid #e0e0e0;
          transition: transform 0.2s;
        }

        .portfolio-image:hover {
          transform: scale(1.05);
        }

        .portfolio-caption {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Team */
        .team-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .team-member {
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          padding: 15px;
        }

        .team-member h6 {
          margin-bottom: 5px;
          color: #333;
        }

        .team-member p {
          color: #666;
          margin: 0;
          font-size: 14px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* No Content */
        .no-content {
          text-align: center;
          padding: 40px 20px;
          color: #666;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Reviews Section - Enhanced */
        .reviews-section-wrapper {
          margin-top: 40px;
        }

        .reviews-section {
          background: white;
          border-radius: 8px;
          padding: 30px;
          border: 1px solid #e0e0e0;
        }

        .review-summary {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 30px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .summary-left {
          text-align: center;
        }

        .summary-left h2 {
          font-size: 36px;
          color: #000000ff;
          margin-bottom: 10px;
        }

        .summary-left p {
          font-family: 'Source Sans Pro', sans-serif;
        }

        .rating-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 5px;
        }

        .rating-bar span {
          font-size: 12px;
          width: 40px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: #f3f4f6;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #fbbf24;
        }

        .reviews-list h4 {
          margin-bottom: 20px;
          color: #333;
        }

        /* Compact Review Cards - Made Smaller */
        .reviews-grid-compact {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
        }

        .review-card-small {
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 12px 15px;
          background: #fff;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 0.85rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          transition: box-shadow 0.3s ease;
        }

        .review-card-small:hover {
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .reviewer-name {
          margin: 0;
          color: #000000ff;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .review-rating {
          font-size: 0.8rem;
        }

        .review-comment {
          color: #555;
          margin-bottom: 6px;
          font-style: italic;
          line-height: 1.3;
          font-size: 0.85rem;
        }

        .review-date {
          color: #999;
          font-size: 0.75rem;
          text-align: right;
        }

        /* Review Form */
        .review-form-container {
          background: white;
          border-radius: 8px;
          padding: 30px;
          margin-bottom: 30px;
          border: 1px solid #e0e0e0;
        }

        .review-form-header h4 {
          margin-bottom: 20px;
          color: #333;
          border-bottom: 2px solid #000000ff;
          padding-bottom: 8px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 15px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          color: #333;
          font-weight: 500;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #000000ff;
        }

        .submit-btn {
          background: #000000ff;
          color: white;
          border: none;
          padding: 12px 30px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .submit-btn:hover {
          background: #000000ff;
        }

        .submit-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        /* Alerts */
        .alert {
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .alert-success {
          background: #f0fdf4;
          color: #166534;
          border: 1px solid #bbf7d0;
        }

        .alert-error {
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        /* Modal */
        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }

        .modal-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
        }

        .modal-image {
          max-width: 100%;
          max-height: 80vh;
          border-radius: 4px;
        }

        .modal-caption {
          color: white;
          text-align: center;
          margin-top: 10px;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Loading and Error States */
        .loading-center,
        .error-center {
          text-align: center;
          padding: 100px 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #000000ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }

        /* No Reviews */
        .no-reviews {
          text-align: center;
          padding: 40px 20px;
          color: #666;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .loading {
          text-align: center;
          padding: 40px 20px;
          color: #666;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .page-header {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .review-summary {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .reviews-grid-compact {
            grid-template-columns: 1fr;
          }

          .portfolio-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }

          .package-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .contact-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
