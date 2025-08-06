import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Discover() {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    service: '',
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });

  // Fetch all registered photographers with reviews
  // Enhanced fetchPhotographers function with better error handling
useEffect(() => {
  async function fetchPhotographers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/api/photographer/all/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Authentication required. Please contact support.');
        }
        if (res.status === 404) {
          throw new Error('API endpoint not found. Please contact support.');
        }
        throw new Error(`Failed to load photographers (Error ${res.status})`);
      }
      
      const data = await res.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received from server');
      }
      
      console.log('✅ Photographers fetched:', data.length); // Debug log
      
      // Fetch review summaries for each photographer with enhanced error handling
      const photographersWithReviews = await Promise.all(
        data.map(async (photographer) => {
          try {
            console.log(`🔍 Fetching reviews for photographer ${photographer.id}`); // Debug log
            
            const reviewRes = await fetch(`http://localhost:8000/api/photographer/${photographer.id}/reviews/summary/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Add auth header if needed:
                // 'Authorization': `Bearer ${localStorage.getItem('photographerToken')}`
              }
            });
            
            console.log(`📊 Review response status for ${photographer.id}:`, reviewRes.status); // Debug log
            
            if (reviewRes.ok) {
              const reviewSummary = await reviewRes.json();
              console.log(`⭐ Review data for ${photographer.id}:`, reviewSummary); // Debug log
              
              return {
                ...photographer,
                average_rating: reviewSummary.average_rating || 0,
                total_reviews: reviewSummary.total_reviews || 0
              };
            } else {
              console.warn(`❌ Failed to fetch reviews for photographer ${photographer.id}: ${reviewRes.status} ${reviewRes.statusText}`);
            }
          } catch (err) {
            console.warn(`❌ Error fetching reviews for photographer ${photographer.id}:`, err);
          }
          return {
            ...photographer,
            average_rating: 0,
            total_reviews: 0
          };
        })
      );
      
      console.log('✅ Final photographers with reviews:', photographersWithReviews); // Debug log
      
      setPhotographers(photographersWithReviews);
      setFilteredPhotographers(photographersWithReviews);
    } catch (err) {
      setError(err.message || 'Failed to load photographers. Please try again later.');
      console.error('❌ Error fetching photographers:', err);
    } finally {
      setLoading(false);
    }
  }
  
  fetchPhotographers();
}, []);


  // Apply filters to photographer list
  useEffect(() => {
    let filtered = [...photographers];

    if (filters.location?.trim()) {
      filtered = filtered.filter(p => 
        p.location && p.location.toLowerCase().includes(filters.location.trim().toLowerCase())
      );
    }

    if (filters.service?.trim()) {
      filtered = filtered.filter(p => 
        p.type_of_photography && p.type_of_photography.toLowerCase().includes(filters.service.trim().toLowerCase())
      );
    }

    if (filters.minPrice) {
      const minVal = parseFloat(filters.minPrice);
      if (!isNaN(minVal)) {
        filtered = filtered.filter(p => {
          if (p.packages && p.packages.length > 0) {
            const prices = p.packages
              .map(pkg => parseFloat(pkg.price))
              .filter(price => !isNaN(price));
            if (prices.length === 0) return false;
            const minPackagePrice = Math.min(...prices);
            return minPackagePrice >= minVal;
          }
          return false;
        });
      }
    }

    if (filters.maxPrice) {
      const maxVal = parseFloat(filters.maxPrice);
      if (!isNaN(maxVal)) {
        filtered = filtered.filter(p => {
          if (p.packages && p.packages.length > 0) {
            const prices = p.packages
              .map(pkg => parseFloat(pkg.price))
              .filter(price => !isNaN(price));
            if (prices.length === 0) return false;
            const minPackagePrice = Math.min(...prices);
            return minPackagePrice <= maxVal;
          }
          return false;
        });
      }
    }

    // Rating filter
    if (filters.minRating) {
      const minRating = parseFloat(filters.minRating);
      if (!isNaN(minRating)) {
        filtered = filtered.filter(p => p.average_rating >= minRating);
      }
    }

    setFilteredPhotographers(filtered);
  }, [filters, photographers]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({ location: '', service: '', minPrice: '', maxPrice: '', minRating: '' });
  };

  // Retry function
  const retryFetch = () => {
    window.location.reload();
  };
  
  // Render stars helper function
  const renderStars = (rating) => {
    if (!rating || rating === 0) {
      return <span className="text-muted">No ratings</span>;
    }
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <span className="text-warning">
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '⭐'}
        {'☆'.repeat(emptyStars)}
        <small className="text-muted ms-1">({rating.toFixed(1)})</small>
      </span>
    );
  };
  
  return (
    <>
      <div className="discover-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Hero Section */}
        <section className="discover-hero py-4 bg-white">
          <div className="container">
            <div className="text-center mb-4">
              <h1 className="discover-title stylish-font mb-3">Find Professional Photographers</h1>
              <p className="discover-subtitle text-muted mb-0">
                Browse our network of verified photographers and find the perfect match for your special moments
              </p>
            </div>
          </div>
        </section>

        <div className="container-fluid px-4">
          {/* Main Layout: Filters Left, Photographers Right */}
          <div className="row g-0">
            
            {/* Left Sidebar - Filters */}
            <div className="col-lg-3 col-md-4">
              <div className="filters-sidebar">
                <div className="card border-0 shadow-sm sticky-top" style={{ top: '120px' }}>
                  <div className="card-header bg-primary text-white py-3">
                    <h5 className="mb-0 stylish-font">
                      <span className="me-2">🔍</span>
                      Filter Photographers
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="filter-group">
                      <label className="form-label fw-bold small text-dark">📍 Location</label>
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        placeholder="e.g., Delhi, Mumbai"
                        value={filters.location}
                        onChange={handleFilterChange}
                        autoComplete="off"
                      />
                    </div>

                    <div className="filter-group">
                      <label className="form-label fw-bold small text-dark">📸 Photography Service</label>
                      <input
                        type="text"
                        name="service"
                        className="form-control"
                        placeholder="e.g., Wedding, Portrait"
                        value={filters.service}
                        onChange={handleFilterChange}
                        autoComplete="off"
                      />
                    </div>

                    <div className="filter-group">
                      <label className="form-label fw-bold small text-dark">💰 Price Range (₹)</label>
                      <div className="row g-2">
                        <div className="col-6">
                          <input
                            type="number"
                            name="minPrice"
                            className="form-control"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={handleFilterChange}
                            min="0"
                            step="1000"
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="number"
                            name="maxPrice"
                            className="form-control"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            min="0"
                            step="1000"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="filter-group">
                      <label className="form-label fw-bold small text-dark">⭐ Minimum Rating</label>
                      <select
                        name="minRating"
                        className="form-select"
                        value={filters.minRating}
                        onChange={handleFilterChange}
                      >
                        <option value="">Any Rating</option>
                        <option value="4">4+ Stars</option>
                        <option value="3">3+ Stars</option>
                        <option value="2">2+ Stars</option>
                        <option value="1">1+ Stars</option>
                      </select>
                    </div>

                    <div className="filter-actions">
                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={clearFilters}
                        type="button"
                      >
                        <span className="me-2">🗑️</span>
                        Clear All Filters
                      </button>
                    </div>

                    {/* Filter Summary */}
                    <div className="filter-summary mt-4 p-3 bg-light rounded">
                      <small className="text-muted text-center d-block">
                        <strong>Found:</strong> {filteredPhotographers.length} photographer{filteredPhotographers.length !== 1 ? 's' : ''}
                        <br />
                        <strong>Total:</strong> {photographers.length} available
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Photographers */}
            <div className="col-lg-9 col-md-8">
              <div className="photographers-section">
                
                {/* Results Header */}
                <div className="results-header mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="stylish-font mb-0">
                      {filteredPhotographers.length} Photographer{filteredPhotographers.length !== 1 ? 's' : ''} Found
                    </h4>
                  </div>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary mb-3" style={{ width: "3rem", height: "3rem" }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h5 className="stylish-font">Finding Amazing Photographers...</h5>
                    <p className="text-muted">Please wait while we load our network of professionals</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="alert alert-danger text-center border-0 shadow-sm">
                    <div className="error-icon mb-3" style={{ fontSize: "3rem" }}>⚠️</div>
                    <h5 className="stylish-font">Error Loading Photographers</h5>
                    <p className="mb-4">{error}</p>
                    <div className="d-flex gap-3 justify-content-center flex-wrap">
                      <button className="btn btn-primary" onClick={retryFetch}>
                        <span className="me-2">🔄</span>
                        Try Again
                      </button>
                      <Link to="/" className="btn btn-outline-secondary">
                        <span className="me-2">←</span>
                        Back to Home
                      </Link>
                    </div>
                  </div>
                )}

                {/* No Results */}
                {!loading && !error && filteredPhotographers.length === 0 && (
                  <div className="no-results text-center py-5">
                    <div className="mb-4" style={{ fontSize: "5rem" }}>🔍</div>
                    <h4 className="stylish-font mb-3">No photographers found</h4>
                    <p className="text-muted mb-4">
                      {photographers.length === 0 
                        ? "No photographers are currently registered on our platform." 
                        : "Try adjusting your filters to see more results."
                      }
                    </p>
                    {photographers.length > 0 && (
                      <button className="btn btn-primary rounded-pill px-4" onClick={clearFilters}>
                        Clear All Filters
                      </button>
                    )}
                  </div>
                )}

                {/* Horizontal Photographers Cards */}
                {!loading && !error && filteredPhotographers.length > 0 && (
                  <div className="horizontal-photographers-container">
                    <div className="photographers-scroll d-flex gap-4 pb-3">
                      {filteredPhotographers.map((photographer, index) => (
                        <div key={photographer.id} className="photographer-card-horizontal" style={{ animationDelay: `${index * 0.1}s` }}>
                          <div className="card border-0 shadow-sm h-100">
                            {/* Profile Image */}
                            <div className="image-container position-relative overflow-hidden">
                              <img
                                src={photographer.profile_picture 
                                  ? `http://localhost:8000${photographer.profile_picture}` 
                                  : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                                }
                                className="card-img-top photographer-image"
                                alt={photographer.user?.username || "Photographer"}
                                style={{ height: '200px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80";
                                }}
                              />
                              <div className="image-overlay position-absolute top-0 start-0 w-100 h-100">
                                <div className="overlay-content d-flex align-items-center justify-content-center">
                                  <Link 
                                    to={`/photographer/${photographer.id}`} 
                                    className="btn btn-light rounded-pill"
                                  >
                                    <span className="me-2">👁️</span>
                                    View Profile
                                  </Link>
                                </div>
                              </div>
                              <div className="position-absolute top-0 end-0 m-2">
                                <span className="badge bg-primary rounded-pill">
                                  <span className="me-1">📸</span>
                                  Verified
                                </span>
                              </div>
                              {/* Rating Badge */}
                              {photographer.average_rating > 0 && (
                                <div className="position-absolute bottom-0 start-0 m-2">
                                  <span className="badge bg-success rounded-pill">
                                    <span className="me-1">⭐</span>
                                    {photographer.average_rating.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="card-body p-3 d-flex flex-column">
                              {/* Photographer Name */}
                              <h6 className="card-title text-primary mb-2 stylish-font">
                                {photographer.user?.username || "Professional Photographer"}
                              </h6>

                              {/* Rating Display */}
                              <div className="mb-2">
                                {renderStars(photographer.average_rating)}
                                <br />
                                <small className="text-muted">
                                  {photographer.total_reviews} review{photographer.total_reviews !== 1 ? 's' : ''}
                                </small>
                              </div>

                              {/* Location */}
                              <div className="mb-2">
                                <small className="text-muted d-flex align-items-center">
                                  <span className="me-1">📍</span>
                                  {photographer.location || "Location not specified"}
                                </small>
                              </div>

                              {/* Services */}
                              <div className="services-tags mb-3">
                                {photographer.type_of_photography ? (
                                  <div>
                                    {photographer.type_of_photography.split(",").slice(0, 2).map((service, idx) => (
                                      <span key={idx} className="badge bg-secondary me-1 mb-1" style={{ fontSize: '0.65rem' }}>
                                        {service.trim()}
                                      </span>
                                    ))}
                                    {photographer.type_of_photography.split(",").length > 2 && (
                                      <span className="badge bg-light text-muted" style={{ fontSize: '0.65rem' }}>
                                        +{photographer.type_of_photography.split(",").length - 2}
                                      </span>
                                    )}
                                  </div>
                                ) : (
                                  <small className="text-muted">Services not specified</small>
                                )}
                              </div>

                              {/* Package Preview */}
                              <div className="mb-3">
                                {photographer.packages && photographer.packages.length > 0 ? (
                                  <div>
                                    <small className="text-success fw-bold d-block">
                                      Starting from ₹{Math.min(...photographer.packages.map(pkg => parseFloat(pkg.price)))}
                                    </small>
                                    <small className="text-muted">
                                      {photographer.packages.length} package{photographer.packages.length !== 1 ? 's' : ''} available
                                    </small>
                                  </div>
                                ) : (
                                  <small className="text-muted">Contact for pricing</small>
                                )}
                              </div>

                              {/* Action Buttons */}
                              <div className="mt-auto">
                                <div className="d-grid gap-2">
                                  <Link 
                                    to={`/photographer/${photographer.id}`} 
                                    className="btn btn-primary btn-sm"
                                  >
                                    <span className="me-1">👁️</span>
                                    View Profile
                                  </Link>
                                  {photographer.phone_number && (
                                    <div className="row g-1">
                                      <div className="col-6">
                                        <a 
                                          href={`tel:${photographer.phone_number}`} 
                                          className="btn btn-outline-success btn-sm w-100"
                                        >
                                          <span>📞</span>
                                        </a>
                                      </div>
                                      <div className="col-6">
                                        <a 
                                          href={`mailto:${photographer.user?.email}`} 
                                          className="btn btn-outline-primary btn-sm w-100"
                                        >
                                          <span>✉️</span>
                                        </a>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Perfect Spacing and Alignment Styles */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Hero Section */
        .discover-title {
          font-size: 2.5rem;
          color: #1e293b;
          font-weight: 700;
        }

        .discover-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }

        /* Perfect Filters Sidebar Spacing */
        .filters-sidebar {
          padding: 0 1rem 1rem 1rem;
        }

        .filters-sidebar .card {
          border-radius: 16px;
          overflow: hidden;
          padding: 1.5rem;
        }

        .filter-group {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 1rem;
        }

        .filter-group:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }

        .filter-group label {
          display: block;
          margin-bottom: 0.75rem;
          font-weight: 600;
          color: #1e293b;
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 0.85rem;
        }

        .filter-group input,
        .filter-group select {
          width: 100%;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          border-radius: 8px;
          border: 1.5px solid #cbd5e1;
          transition: all 0.3s ease;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .filter-group input:focus,
        .filter-group select:focus {
          border-color: black;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
          outline: none;
        }

        .filter-actions {
          margin-top: 1.5rem;
          padding-top: 0.5rem;
        }

        .filter-actions .btn {
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 0.6rem 1.2rem;
          transition: all 0.3s ease;
        }

        .filter-actions .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(107, 114, 128, 0.3);
        }

        .filter-summary {
          margin-top: 1.5rem;
          border: 1px solid #e5e7eb;
          font-weight: 500;
          font-size: 0.9rem;
          color: #4b5563;
        }

        /* Perfect Photographers Section Spacing */
        .photographers-section {
          padding-left: 1.5rem;
          min-height: 70vh;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .results-header h4 {
          color: #111827;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .sort-options .form-select {
          min-width: 180px;
          font-size: 0.9rem;
          border: 1px solid #d1d5db;
        }

        /* Perfect Horizontal Cards Container */
        .horizontal-photographers-container {
          position: relative;
          padding-bottom: 1.5rem;
        }

        .photographers-scroll {
          overflow-x: auto;
          overflow-y: hidden;
          padding: 1rem 0 1.5rem 0;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: black #e0e8ff;
        }

        .photographers-scroll::-webkit-scrollbar {
          height: 10px;
        }

        .photographers-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, black, black);
          border-radius: 5px;
        }

        .photographers-scroll::-webkit-scrollbar-track {
          background: #e0e8ff;
          border-radius: 5px;
        }

        /* Perfect Horizontal Photographer Cards */
        .photographer-card-horizontal {
          flex-shrink: 0;
          width: 300px;
          height: 480px;
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

        .photographer-card-horizontal .card {
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .photographer-card-horizontal:hover .card {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.2) !important;
        }

        .image-container {
          position: relative;
          overflow: hidden;
        }

        .photographer-image {
          transition: transform 0.4s ease;
        }

        .photographer-card-horizontal:hover .photographer-image {
          transform: scale(1.08);
        }

        .image-overlay {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .photographer-card-horizontal:hover .image-overlay {
          opacity: 1;
        }

        /* Perfect Card Body Spacing */
        .photographer-card-horizontal .card-body {
          padding: 1rem 1rem 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
        }

        .photographer-card-horizontal .card-body h6 {
          color: black;
          font-weight: 700;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
          line-height: 1.3;
        }

        .photographer-card-horizontal .card-body .badge {
          font-size: 0.65rem;
          padding: 0.25em 0.5em;
          margin-right: 0.3rem;
          margin-bottom: 0.3rem;
          display: inline-block;
        }

        .photographer-card-horizontal .services-tags {
          margin-bottom: 1rem;
          min-height: 2.5rem;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
        }

        .photographer-card-horizontal .card-body .btn {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.4rem 0.8rem;
          letter-spacing: 0.02em;
        }

        .photographer-card-horizontal .card-body .btn + .btn {
          margin-top: 0.4rem;
        }

        .photographer-card-horizontal .card-body small {
          color: #6b7280;
          font-size: 0.8rem;
          line-height: 1.4;
        }

        /* Action Buttons Perfect Spacing */
        .btn {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: linear-gradient(135deg, #000000 0%, #000000 100%);
          border: none;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #ed2222 0%, #25eb28 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }

        .btn-outline-success {
          border: 1.5px solid #22c55e;
          color: #22c55e;
        }

        .btn-outline-success:hover {
          background: #22c55e;
          color: white;
          transform: translateY(-1px);
        }

        .btn-outline-primary {
          border: 1.5px solid black;
          color: black;
        }

        .btn-outline-primary:hover {
          background: black;
          color: white;
          transform: translateY(-1px);
        }

        .btn-outline-secondary {
          border: 2px solid #6b7280;
          color: #6b7280;
        }

        .btn-outline-secondary:hover {
          background: #6b7280;
          color: white;
          transform: translateY(-1px);
        }

        /* Perfect Responsive Design */
        @media (max-width: 992px) {
          .filters-sidebar {
            padding: 0 0.5rem 1rem 0.5rem;
          }

          .photographers-section {
            padding-left: 1rem;
          }

          .photographer-card-horizontal {
            width: 280px;
            height: 450px;
          }

          .photographers-scroll {
            gap: 0.75rem;
          }
        }

        @media (max-width: 768px) {
          .discover-title {
            font-size: 2rem;
          }

          .filters-sidebar {
            position: static !important;
            padding: 0 0 1.5rem 0;
          }

          .filters-sidebar .card {
            top: auto !important;
            margin-bottom: 1.5rem;
            padding: 1rem;
          }

          .photographers-section {
            padding-left: 0;
          }

          .photographers-scroll {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            overflow-x: visible;
            padding: 0;
          }

          .photographer-card-horizontal {
            width: 100% !important;
            height: auto;
            min-height: 420px;
          }

          .results-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .results-header .sort-options {
            width: 100%;
          }

          .results-header .sort-options select {
            width: 100%;
          }
        }

        /* Badge Styling */
        .badge {
          font-weight: 500;
        }

        /* Background Colors */
        .bg-primary {
          background: linear-gradient(135deg, #000000 0%, #000000 100%) !important;
        }

        .text-primary {
          color: black !important;
        }

        /* Loading and Error States */
        .spinner-border {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Utilities */
        .border-0 {
          border: none !important;
        }

        .sticky-top {
          position: sticky;
        }
      `}</style>
    </>
  );
}
