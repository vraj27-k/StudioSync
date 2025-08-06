import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("photographerToken");
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [showTeamManagement, setShowTeamManagement] = useState(false);
  const [showPackageManagement, setShowPackageManagement] = useState(false);
  const [showBookingsManagement, setShowBookingsManagement] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Real-time data refresh indicator
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const intervalRef = useRef(null);

  // Package management state
  const [packages, setPackages] = useState([]);
  const [packageFormData, setPackageFormData] = useState({
    name: '',
    price: '',
    duration: '',
    event_type: '',
    description: '',
    delivery_time: '',
    includes: ''
  });
  const [packageFormErrors, setPackageFormErrors] = useState({});
  const [isSubmittingPackage, setIsSubmittingPackage] = useState(false);

  // Team management state
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    role: '',
    bio: ''
  });

  // Portfolio state
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Bookings state
  const [bookings, setBookings] = useState([]);
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0
  });

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalEarnings: 0,
    monthlyBookings: 0,
    averageRating: 0,
    totalReviews: 0
  });

  // ✅ FIXED: Comprehensive data fetching function
  const fetchDashboardData = async () => {
    if (!token) return;
    
    setIsRefreshing(true);
    setError(null);
    
    try {
      // Main profile data
      const profileRes = await fetch("http://localhost:8000/api/photographer/profile/", {
        headers: { Authorization: `Token ${token}` },
      });

      if (profileRes.status === 500) {
        setError("Server error (500). Please restart your Django server and ensure the Sites framework is configured properly.");
        return;
      }

      if (profileRes.status === 401) {
        localStorage.removeItem("photographerToken");
        navigate("/login");
        return;
      }

      if (!profileRes.ok) {
        setError(`API error: ${profileRes.status} - ${profileRes.statusText}`);
        return;
      }

      const profileData = await profileRes.json();
      setProfile(profileData);

      // Extract data from profile response
      setPackages(profileData.packages || []);
      setTeamMembers(profileData.team_members || profileData.team || []);
      
      // ✅ FIXED: Portfolio images with better handling
      const portfolioData = profileData.portfolio_images || profileData.portfolio || [];
      console.log('Portfolio data received:', portfolioData);
      setPortfolioImages(portfolioData);
      
      // Fetch additional real-time data
      await Promise.all([
        fetchBookingsData(),
        fetchAnalyticsData(profileData)
      ]);
      
      setLastUpdated(new Date());
      console.log('📊 Dashboard data refreshed at:', new Date().toLocaleTimeString());
      
    } catch (err) {
      console.error("Network error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  // Fetch bookings data
  const fetchBookingsData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/bookings/", {
        headers: { Authorization: `Token ${token}` },
      });
      
      if (res.ok) {
        const bookingsData = await res.json();
        setBookings(bookingsData);
        
        // Calculate booking stats
        const stats = {
          total: bookingsData.length,
          pending: bookingsData.filter(b => b.status === 'pending').length,
          confirmed: bookingsData.filter(b => b.status === 'confirmed').length,
          completed: bookingsData.filter(b => b.status === 'completed').length
        };
        setBookingStats(stats);
        console.log('📋 Bookings fetched:', bookingsData.length);
      } else {
        setBookings([]);
        setBookingStats({ total: 0, pending: 0, confirmed: 0, completed: 0 });
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]);
      setBookingStats({ total: 0, pending: 0, confirmed: 0, completed: 0 });
    }
  };

  // Fetch analytics data
  const fetchAnalyticsData = async (profileData) => {
    try {
      const packagesData = profileData.packages || [];
      const totalEarnings = packagesData.reduce((sum, pkg) => sum + parseFloat(pkg.price || 0), 0);
      
      // Try to fetch reviews summary for ratings
      let averageRating = 0;
      let totalReviews = 0;
      
      try {
        const reviewsRes = await fetch(`http://localhost:8000/api/photographer/${profileData.id}/reviews/summary/`, {
          headers: { Authorization: `Token ${token}` },
        });
        
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          averageRating = reviewsData.average_rating || 0;
          totalReviews = reviewsData.total_reviews || 0;
        }
      } catch (reviewErr) {
        console.log("Reviews not available:", reviewErr);
      }
      
      setAnalytics({
        totalEarnings,
        monthlyBookings: bookingStats.total,
        averageRating,
        totalReviews
      });
      
      console.log('📊 Analytics updated:', { totalEarnings, averageRating, totalReviews });
      
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setAnalytics({
        totalEarnings: 0,
        monthlyBookings: 0,
        averageRating: 0,
        totalReviews: 0
      });
    }
  };

  // Real-time data polling setup
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Initial data fetch
    fetchDashboardData();

    // Set up real-time polling if auto-refresh is enabled
    if (autoRefresh) {
      intervalRef.current = setInterval(() => {
        fetchDashboardData();
      }, 30000);
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [token, navigate, autoRefresh]);

  // Manual refresh function
  const handleManualRefresh = () => {
    fetchDashboardData();
  };

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    if (!autoRefresh) {
      intervalRef.current = setInterval(fetchDashboardData, 30000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  // Enhanced package creation
  const handleAddPackage = async (e) => {
    e.preventDefault();
    
    setIsSubmittingPackage(true);
    setPackageFormErrors({});
    setError(null);

    // Client-side validation
    const errors = {};
    if (!packageFormData.name.trim()) errors.name = 'Package name is required';
    if (!packageFormData.price || parseFloat(packageFormData.price) <= 0) errors.price = 'Valid price is required';
    if (!packageFormData.duration || parseInt(packageFormData.duration) <= 0) errors.duration = 'Valid duration is required';
    if (!packageFormData.event_type.trim()) errors.event_type = 'Event type is required';
    if (!packageFormData.description.trim()) errors.description = 'Description is required';
    if (!packageFormData.delivery_time || parseInt(packageFormData.delivery_time) <= 0) errors.delivery_time = 'Valid delivery time is required';

    if (Object.keys(errors).length > 0) {
      setPackageFormErrors(errors);
      setIsSubmittingPackage(false);
      return;
    }

    if (!profile?.id) {
      setError("Profile not loaded. Please refresh the page.");
      setIsSubmittingPackage(false);
      return;
    }

    try {
      const packageData = {
        name: packageFormData.name.trim(),
        price: parseFloat(packageFormData.price),
        duration: parseInt(packageFormData.duration),
        event_type: packageFormData.event_type.trim(),
        description: packageFormData.description.trim(),
        delivery_time: parseInt(packageFormData.delivery_time),
        includes: packageFormData.includes.trim(),
        photographer: profile.id
      };

      const response = await fetch('http://localhost:8000/api/photographer/packages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(packageData)
      });
      
      if (!response.ok) {
        const responseData = await response.json();
        setError(`Failed to create package: ${responseData.detail || 'Unknown error'}`);
        setIsSubmittingPackage(false);
        return;
      }

      const responseData = await response.json();
      setPackages(prev => [...prev, responseData]);
      setPackageFormData({
        name: '',
        price: '',
        duration: '',
        event_type: '',
        description: '',
        delivery_time: '',
        includes: ''
      });
      setPackageFormErrors({});
      setError(null);
      
      await fetchDashboardData();
      alert('Package created successfully!');

    } catch (error) {
      console.error('🚨 Network error:', error);
      setError(`Network error: ${error.message}`);
    } finally {
      setIsSubmittingPackage(false);
    }
  };

  const handlePackageInputChange = (e) => {
    const { name, value } = e.target;
    setPackageFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (packageFormErrors[name]) {
      setPackageFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Enhanced team management
  const handleAddTeamMember = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/photographer/team/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          name: teamFormData.name.trim(),
          role: teamFormData.role.trim(),
          bio: teamFormData.bio.trim(),
          photographer: profile.id
        })
      });

      if (response.ok) {
        const newMember = await response.json();
        setTeamMembers(prev => [...prev, newMember]);
        setTeamFormData({ name: '', role: '', bio: '' });
        await fetchDashboardData();
        alert('Team member added successfully!');
      } else {
        const errorData = await response.json();
        setError(`Failed to add team member: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
    }
  };

  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Enhanced portfolio management
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('photographer', profile.id);

      try {
        const response = await fetch('http://localhost:8000/api/photographer/portfolio/', {
          method: 'POST',
          headers: {
            'Authorization': `Token ${token}`
          },
          body: formData
        });

        if (response.ok) {
          const newImage = await response.json();
          setPortfolioImages(prev => [...prev, newImage]);
        } else {
          const errorData = await response.json();
          console.error('Image upload failed:', errorData);
        }
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
    
    setIsUploading(false);
    e.target.value = '';
    await fetchDashboardData();
    alert('Images uploaded successfully!');
  };

  const handleLogout = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    localStorage.removeItem("photographerToken");
    navigate("/login");
  };
  
  // Show loading state
  if (loading) {
    return (
      <>
        <div className="dashboard-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
          <div className="container">
            <div className="loading-section text-center py-5">
              <div className="spinner-border text-dark mb-4" style={{ width: "4rem", height: "4rem" }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <h4 className="stylish-font">Loading Your Dashboard...</h4>
              <p className="text-muted">Setting up your admin panel</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error
  if (error) {
    return (
      <>
        <div className="dashboard-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
          <div className="container">
            <div className="error-section">
              <div className="alert alert-danger border-0 shadow-sm">
                <h4 className="stylish-font text-center">Dashboard Error</h4>
                <p><strong>Error:</strong> {error}</p>
                <div className="text-center mt-4">
                  <button 
                    className="btn btn-dark btn-lg me-3" 
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-lg" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main dashboard render
  return (
    <>
      <div className="dashboard-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Simple Hero Section */}
        <section className="dashboard-hero py-3 bg-white border-bottom">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h1 className="dashboard-title stylish-font mb-1">Photography Admin Panel</h1>
                <p className="dashboard-subtitle text-muted mb-0">Manage your photography business</p>
              </div>
              <div className="admin-actions d-flex align-items-center gap-3">
                <button 
                  className="btn btn-outline-dark btn-sm"
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? 'Refreshing...' : 'Refresh'}
                </button>
                <span className="admin-badge badge bg-dark">Admin</span>
                <button className="btn btn-outline-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mt-4">
          
          {/* Main Two-Column Layout */}
          <div className="main-layout">
            <div className="row g-4">
              
              {/* ✅ LEFT COLUMN - INTRO/PROFILE */}
              <div className="col-lg-4">
                <div className="intro-section">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                      
                      {/* Profile Image and Basic Info */}
                      <div className="profile-intro text-center mb-4">
                        <div className="profile-image-container mb-3">
                          <img
                            src={profile?.profile_picture ? `http://localhost:8000${profile.profile_picture}` : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                            alt="Profile"
                            className="profile-image"
                          />
                        </div>
                        <h4 className="profile-name stylish-font mb-2">
                          {profile?.user?.username || "Professional Photographer"}
                        </h4>
                        <p className="profile-title text-muted">Photography Professional</p>
                      </div>

                      {/* Contact Information */}
                      <div className="contact-section mb-4">
                        <h6 className="section-heading stylish-font mb-3">Contact Information</h6>
                        <div className="contact-item mb-2">
                          <strong>Email:</strong>
                          <span className="ms-2">{profile?.user?.email || "Not available"}</span>
                        </div>
                        <div className="contact-item mb-2">
                          <strong>Phone:</strong>
                          <span className="ms-2">{profile?.phone_number || "Not provided"}</span>
                        </div>
                        <div className="contact-item mb-3">
                          <strong>Location:</strong>
                          <span className="ms-2">{profile?.location || "Not specified"}</span>
                        </div>
                        
                        {profile?.phone_number && (
                          <div className="contact-actions d-grid gap-2">
                            <a href={`tel:${profile.phone_number}`} className="btn btn-dark btn-sm">
                              Call Now
                            </a>
                            <a href={`mailto:${profile.user?.email}`} className="btn btn-outline-dark btn-sm">
                              Email
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Services */}
                      <div className="services-section mb-4">
                        <h6 className="section-heading stylish-font mb-3">Photography Services</h6>
                        {profile?.type_of_photography ? (
                          <div className="services-list">
                            {profile.type_of_photography.split(",").map((service, idx) => (
                              <span key={idx} className="service-tag badge bg-light text-dark me-1 mb-1">
                                {service.trim()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted small">No services specified</p>
                        )}
                      </div>

                      {/* Bio */}
                      <div className="bio-section">
                        <h6 className="section-heading stylish-font mb-3">About</h6>
                        <p className="bio-text text-muted small">
                          {profile?.bio || "Professional photographer providing high-quality photography services. Contact me to discuss your photography needs."}
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div className="quick-stats mt-4 pt-3 border-top">
                        <div className="row text-center">
                          <div className="col-4">
                            <h5 className="stat-number stylish-font mb-0">{packages.length}</h5>
                            <small className="text-muted">Packages</small>
                          </div>
                          <div className="col-4">
                            <h5 className="stat-number stylish-font mb-0">{portfolioImages.length}</h5>
                            <small className="text-muted">Photos</small>
                          </div>
                          <div className="col-4">
                            <h5 className="stat-number stylish-font mb-0">{bookingStats.total}</h5>
                            <small className="text-muted">Bookings</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ RIGHT COLUMN - ALL SECTIONS */}
              <div className="col-lg-8">
                <div className="content-sections">

                  {/* Simple Navigation */}
                  <div className="section-navigation mb-4">
                    <div className="nav-buttons d-flex gap-2 flex-wrap">
                      <button 
                        className={`btn btn-sm ${showPackageManagement ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => {
                          setShowPackageManagement(true);
                          setShowTeamManagement(false);
                          setShowPortfolio(false);
                          setShowBookingsManagement(false);
                          setShowAnalytics(false);
                        }}
                      >
                        Packages ({packages.length})
                      </button>
                      <button 
                        className={`btn btn-sm ${showTeamManagement ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => {
                          setShowTeamManagement(true);
                          setShowPackageManagement(false);
                          setShowPortfolio(false);
                          setShowBookingsManagement(false);
                          setShowAnalytics(false);
                        }}
                      >
                        Team ({teamMembers.length})
                      </button>
                      <button 
                        className={`btn btn-sm ${showPortfolio ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => {
                          setShowPortfolio(true);
                          setShowPackageManagement(false);
                          setShowTeamManagement(false);
                          setShowBookingsManagement(false);
                          setShowAnalytics(false);
                        }}
                      >
                        Portfolio ({portfolioImages.length})
                      </button>
                      <button 
                        className={`btn btn-sm ${showAnalytics ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => {
                          setShowAnalytics(true);
                          setShowPackageManagement(false);
                          setShowTeamManagement(false);
                          setShowPortfolio(false);
                          setShowBookingsManagement(false);
                        }}
                      >
                        Analytics
                      </button>
                    </div>
                  </div>

                  

                  {/* Package Management Section */}
                  {showPackageManagement && (
                    <div className="section-content">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <h5 className="section-title stylish-font mb-4">Package Management</h5>
                          
                          {/* Package Creation Form */}
                          <form onSubmit={handleAddPackage} className="package-form mb-4">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">Package Name *</label>
                                <input
                                  type="text"
                                  name="name"
                                  className={`form-control ${packageFormErrors.name ? 'is-invalid' : ''}`}
                                  value={packageFormData.name}
                                  onChange={handlePackageInputChange}
                                  placeholder="e.g., Gold Wedding Package"
                                />
                                {packageFormErrors.name && <div className="invalid-feedback">{packageFormErrors.name}</div>}
                              </div>
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">Price (₹) *</label>
                                <input
                                  type="number"
                                  name="price"
                                  className={`form-control ${packageFormErrors.price ? 'is-invalid' : ''}`}
                                  value={packageFormData.price}
                                  onChange={handlePackageInputChange}
                                  placeholder="5000"
                                />
                                {packageFormErrors.price && <div className="invalid-feedback">{packageFormErrors.price}</div>}
                              </div>
                            </div>
                            <div className="row g-3 mt-2">
                              <div className="col-md-4">
                                <label className="form-label small fw-bold">Duration (hours) *</label>
                                <input
                                  type="number"
                                  name="duration"
                                  className={`form-control ${packageFormErrors.duration ? 'is-invalid' : ''}`}
                                  value={packageFormData.duration}
                                  onChange={handlePackageInputChange}
                                  placeholder="8"
                                />
                                {packageFormErrors.duration && <div className="invalid-feedback">{packageFormErrors.duration}</div>}
                              </div>
                              <div className="col-md-4">
                                <label className="form-label small fw-bold">Event Type *</label>
                                <select
                                  name="event_type"
                                  className={`form-select ${packageFormErrors.event_type ? 'is-invalid' : ''}`}
                                  value={packageFormData.event_type}
                                  onChange={handlePackageInputChange}
                                >
                                  <option value="">Select Event Type</option>
                                  <option value="Wedding">Wedding</option>
                                  <option value="Portrait">Portrait</option>
                                  <option value="Corporate">Corporate</option>
                                  <option value="Party">Party</option>
                                  <option value="Fashion">Fashion</option>
                                  <option value="Other">Other</option>
                                </select>
                                {packageFormErrors.event_type && <div className="invalid-feedback">{packageFormErrors.event_type}</div>}
                              </div>
                              <div className="col-md-4">
                                <label className="form-label small fw-bold">Delivery (days) *</label>
                                <input
                                  type="number"
                                  name="delivery_time"
                                  className={`form-control ${packageFormErrors.delivery_time ? 'is-invalid' : ''}`}
                                  value={packageFormData.delivery_time}
                                  onChange={handlePackageInputChange}
                                  placeholder="7"
                                />
                                {packageFormErrors.delivery_time && <div className="invalid-feedback">{packageFormErrors.delivery_time}</div>}
                              </div>
                            </div>
                            <div className="row g-3 mt-2">
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">What's Included</label>
                                <input
                                  type="text"
                                  name="includes"
                                  className="form-control"
                                  value={packageFormData.includes}
                                  onChange={handlePackageInputChange}
                                  placeholder="100 edited photos, online gallery"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">Description *</label>
                                <textarea
                                  name="description"
                                  className={`form-control ${packageFormErrors.description ? 'is-invalid' : ''}`}
                                  rows="2"
                                  value={packageFormData.description}
                                  onChange={handlePackageInputChange}
                                  placeholder="Describe this package..."
                                ></textarea>
                                {packageFormErrors.description && <div className="invalid-feedback">{packageFormErrors.description}</div>}
                              </div>
                            </div>
                            <div className="mt-3">
                              <button 
                                type="submit" 
                                className="btn btn-dark"
                                disabled={isSubmittingPackage}
                              >
                                {isSubmittingPackage ? 'Creating...' : 'Create Package'}
                              </button>
                            </div>
                          </form>

                          {/* Error Display */}
                          {error && (
                            <div className="alert alert-danger">
                              {error}
                            </div>
                          )}

                          {/* Packages List */}
                          <div className="packages-list">
                            <h6 className="mb-3">Your Packages ({packages.length})</h6>
                            {packages.length > 0 ? (
                              <div className="row g-3">
                                {packages.map((pkg, index) => (
                                  <div key={pkg.id || index} className="col-md-6">
                                    <div className="package-card card border h-100">
                                      <div className="card-body p-3">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                          <h6 className="package-name stylish-font mb-0">{pkg.name}</h6>
                                          <span className="badge bg-dark">{pkg.event_type}</span>
                                        </div>
                                        <p className="package-price h5 text-dark mb-2">₹{pkg.price}</p>
                                        <div className="package-details small text-muted mb-2">
                                          <div>Duration: {pkg.duration}h • Delivery: {pkg.delivery_time}d</div>
                                        </div>
                                        <p className="package-description small">{pkg.description}</p>
                                        {pkg.includes && (
                                          <p className="package-includes small text-muted">
                                            <strong>Includes:</strong> {pkg.includes}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="no-packages text-center py-4">
                                <div className="mb-3" style={{ fontSize: "3rem" }}>📦</div>
                                <h6 className="stylish-font mb-2">No Packages Created</h6>
                                <p className="text-muted small">Create your first photography package above.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Team Management Section */}
                  {showTeamManagement && (
                    <div className="section-content">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <h5 className="section-title stylish-font mb-4">Team Management</h5>
                          
                          <form onSubmit={handleAddTeamMember} className="team-form mb-4">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">Name *</label>
                                <input
                                  type="text"
                                  name="name"
                                  className="form-control"
                                  value={teamFormData.name}
                                  onChange={handleTeamInputChange}
                                  placeholder="Team member name"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label small fw-bold">Role *</label>
                                <input
                                  type="text"
                                  name="role"
                                  className="form-control"
                                  value={teamFormData.role}
                                  onChange={handleTeamInputChange}
                                  placeholder="Assistant Photographer"
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <label className="form-label small fw-bold">Bio</label>
                              <textarea
                                name="bio"
                                className="form-control"
                                rows="2"
                                value={teamFormData.bio}
                                onChange={handleTeamInputChange}
                                placeholder="Brief bio about the team member"
                              ></textarea>
                            </div>
                            <div className="mt-3">
                              <button type="submit" className="btn btn-dark">
                                Add Team Member
                              </button>
                            </div>
                          </form>

                          <div className="team-list">
                            <h6 className="mb-3">Team Members ({teamMembers.length})</h6>
                            {teamMembers.length > 0 ? (
                              <div className="row g-3">
                                {teamMembers.map((member, index) => (
                                  <div key={member.id || index} className="col-md-6">
                                    <div className="team-card card border h-100">
                                      <div className="card-body p-3 text-center">
                                        <div className="team-avatar mb-2" style={{ fontSize: "2rem" }}>👤</div>
                                        <h6 className="member-name stylish-font mb-1">{member.name}</h6>
                                        <p className="member-role small text-muted mb-2">{member.role || "Team Member"}</p>
                                        <p className="member-bio small text-muted">{member.bio}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="no-team text-center py-4">
                                <div className="mb-3" style={{ fontSize: "3rem" }}>👥</div>
                                <h6 className="stylish-font mb-2">No Team Members</h6>
                                <p className="text-muted small">Add your first team member above.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ✅ FIXED: Portfolio Management Section */}
                  {showPortfolio && (
                    <div className="section-content">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <h5 className="section-title stylish-font mb-4">Portfolio Management</h5>
                          
                          <div className="upload-section mb-4">
                            <label className="form-label small fw-bold">Upload Images</label>
                            <input
                              type="file"
                              className="form-control"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              disabled={isUploading}
                            />
                            {isUploading && (
                              <div className="upload-status mt-2">
                                <small className="text-muted">Uploading images...</small>
                              </div>
                            )}
                          </div>

                          <div className="portfolio-gallery">
                            <h6 className="mb-3">Portfolio Images ({portfolioImages.length})</h6>
                            {portfolioImages.length > 0 ? (
                              <div className="row g-3">
                                {portfolioImages.map((image, index) => {
                                  // ✅ FIXED: Better image URL handling
                                  let imageUrl = '';
                                  if (image.image) {
                                    if (image.image.startsWith('http')) {
                                      imageUrl = image.image;
                                    } else if (image.image.startsWith('/')) {
                                      imageUrl = `http://localhost:8000${image.image}`;
                                    } else {
                                      imageUrl = `http://localhost:8000/${image.image}`;
                                    }
                                  } else if (image.image_url) {
                                    imageUrl = image.image_url;
                                  } else {
                                    imageUrl = "https://via.placeholder.com/300x200?text=No+Image";
                                  }

                                  return (
                                    <div key={image.id || index} className="col-md-4 col-sm-6">
                                      <div className="portfolio-item card border">
                                        <img
                                          src={imageUrl}
                                          className="card-img-top portfolio-image"
                                          alt="Portfolio"
                                          style={{ height: '150px', objectFit: 'cover' }}
                                          onError={(e) => {
                                            console.log('Image failed to load:', imageUrl);
                                            e.target.src = "https://via.placeholder.com/300x150?text=Image+Error";
                                          }}
                                        />
                                        <div className="card-body p-2">
                                          <p className="portfolio-caption small text-muted mb-0">
                                            {image.caption || `Image ${index + 1}`}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="no-portfolio text-center py-4">
                                <div className="mb-3" style={{ fontSize: "3rem" }}>🎨</div>
                                <h6 className="stylish-font mb-2">No Portfolio Images</h6>
                                <p className="text-muted small">Upload your first photos above to showcase your work.</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Analytics Section */}
                  {showAnalytics && (
                    <div className="section-content">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <h5 className="section-title stylish-font mb-4">Analytics Dashboard</h5>
                          
                          <div className="analytics-grid">
                            <div className="row g-3">
                              <div className="col-md-6">
                                <div className="analytics-card card border text-center p-3">
                                  <h4 className="analytics-value stylish-font">₹{analytics.totalEarnings.toLocaleString()}</h4>
                                  <p className="analytics-label text-muted mb-0">Total Earnings Potential</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="analytics-card card border text-center p-3">
                                  <h4 className="analytics-value stylish-font">{packages.length}</h4>
                                  <p className="analytics-label text-muted mb-0">Active Packages</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="analytics-card card border text-center p-3">
                                  <h4 className="analytics-value stylish-font">{analytics.averageRating.toFixed(1)}/5</h4>
                                  <p className="analytics-label text-muted mb-0">Average Rating</p>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="analytics-card card border text-center p-3">
                                  <h4 className="analytics-value stylish-font">{analytics.totalReviews}</h4>
                                  <p className="analytics-label text-muted mb-0">Total Reviews</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Business Summary */}
                          <div className="business-summary mt-4 pt-3 border-top">
                            <h6 className="mb-3">Business Summary</h6>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="summary-item mb-2">
                                  <strong>📦 Packages:</strong> {packages.length}
                                </div>
                                <div className="summary-item mb-2">
                                  <strong>👥 Team Members:</strong> {teamMembers.length}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="summary-item mb-2">
                                  <strong>🎨 Portfolio Images:</strong> {portfolioImages.length}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Default Overview when no section is selected */}
                  {!showPackageManagement && !showTeamManagement && !showPortfolio && !showBookingsManagement && !showAnalytics && (
                    <div className="section-content">
                      <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                          <h5 className="section-title stylish-font mb-4">Dashboard Overview</h5>
                          
                          <div className="overview-stats">
                            <div className="row g-3">
                              <div className="col-md-3 col-6">
                                <div className="overview-card text-center p-3 bg-light rounded">
                                  <h4 className="stat-number stylish-font">{packages.length}</h4>
                                  <small className="text-muted">Packages</small>
                                </div>
                              </div>
                              <div className="col-md-3 col-6">
                                <div className="overview-card text-center p-3 bg-light rounded">
                                  <h4 className="stat-number stylish-font">{teamMembers.length}</h4>
                                  <small className="text-muted">Team Members</small>
                                </div>
                              </div>
                              <div className="col-md-3 col-6">
                                <div className="overview-card text-center p-3 bg-light rounded">
                                  <h4 className="stat-number stylish-font">{portfolioImages.length}</h4>
                                  <small className="text-muted">Portfolio Images</small>
                                </div>
                              </div>
                              
                            </div>
                          </div>

                          <div className="quick-actions mt-4 pt-3 border-top">
                            <h6 className="mb-3">Quick Actions</h6>
                            <div className="d-flex gap-2 flex-wrap">
                              <button 
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => setShowPackageManagement(true)}
                              >
                                Add Package
                              </button>
                              <button 
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => setShowTeamManagement(true)}
                              >
                                Add Team Member
                              </button>
                              <button 
                                className="btn btn-outline-dark btn-sm"
                                onClick={() => setShowPortfolio(true)}
                              >
                                Upload Photos
                              </button>
                              <button 
                                className="btn btn-outline-dark btn-sm"
                                onClick={handleManualRefresh}
                                disabled={isRefreshing}
                              >
                                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Simple Styles */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        .dashboard-page {
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Simple Hero */
        .dashboard-title {
          font-size: 1.8rem;
          color: #1a1a1a;
          font-weight: 600;
        }

        .dashboard-subtitle {
          font-size: 0.95rem;
          font-weight: 400;
        }

        .admin-badge {
          font-size: 0.8rem;
          padding: 0.4rem 0.8rem;
        }

        /* Layout */
        .main-layout {
          margin-top: 1rem;
        }

        /* Left Column - Intro */
        .intro-section .card {
          border-radius: 8px;
        }

        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e9ecef;
        }

        .profile-name {
          font-size: 1.3rem;
          color: #1a1a1a;
          font-weight: 600;
        }

        .profile-title {
          font-size: 0.9rem;
        }

        .section-heading {
          font-size: 0.95rem;
          color: #1a1a1a;
          font-weight: 600;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 0.3rem;
        }

        .contact-item {
          font-size: 0.85rem;
          color: #495057;
          line-height: 1.4;
        }

        .service-tag {
          font-size: 0.75rem;
          padding: 0.2rem 0.5rem;
        }

        .bio-text {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .stat-number {
          font-size: 1.2rem;
          color: #1a1a1a;
          font-weight: 600;
        }

        /* Right Column - Content */
        .section-navigation {
          padding: 0;
        }

        .nav-buttons .btn {
          font-size: 0.85rem;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
        }

        .section-content .card {
          border-radius: 8px;
        }

        .section-title {
          font-size: 1.1rem;
          color: #1a1a1a;
          font-weight: 600;
          border-bottom: 1px solid #e9ecef;
          padding-bottom: 0.5rem;
        }

        /* Forms */
        .form-label {
          color: #495057;
          font-size: 0.85rem;
          margin-bottom: 0.3rem;
        }

        .form-control, .form-select {
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.9rem;
          padding: 0.5rem 0.75rem;
        }

        .form-control:focus, .form-select:focus {
          border-color: #495057;
          box-shadow: 0 0 0 0.15rem rgba(73, 80, 87, 0.15);
        }

        /* Cards */
        .package-card, .team-card, .portfolio-item {
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .package-card:hover, .team-card:hover, .portfolio-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .package-name {
          font-size: 1rem;
          font-weight: 600;
        }

        .package-price {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .package-details {
          font-size: 0.8rem;
        }

        .package-description {
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .package-includes {
          font-size: 0.8rem;
        }

        /* Team Cards */
        .member-name {
          font-size: 0.95rem;
          font-weight: 600;
        }

        .member-role {
          font-size: 0.8rem;
        }

        .member-bio {
          font-size: 0.8rem;
          line-height: 1.3;
        }

        /* Portfolio */
        .portfolio-image {
          border-radius: 4px 4px 0 0;
          transition: transform 0.2s ease;
        }

        .portfolio-item:hover .portfolio-image {
          transform: scale(1.02);
        }

        .portfolio-caption {
          font-size: 0.8rem;
        }

        /* Booking Stats */
        .stat-card {
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1a1a1a;
        }

        .stat-label {
          font-size: 0.85rem;
        }

        /* Analytics */
        .analytics-card {
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .analytics-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .analytics-value {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1a1a1a;
        }

        .analytics-label {
          font-size: 0.85rem;
        }

        /* Overview */
        .overview-card {
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .overview-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .summary-item {
          font-size: 0.85rem;
          color: #495057;
        }

        /* No Content States */
        .no-packages, .no-team, .no-portfolio, .no-bookings {
          padding: 2rem 1rem;
          color: #6c757d;
        }

        /* Buttons */
        .btn {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 500;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .btn-dark {
          background-color: #212529;
          border-color: #212529;
        }

        .btn-dark:hover {
          background-color: #1c1f23;
          border-color: #1c1f23;
          transform: translateY(-1px);
        }

        .btn-outline-dark {
          color: #212529;
          border-color: #212529;
        }

        .btn-outline-dark:hover {
          background-color: #212529;
          border-color: #212529;
          color: white;
          transform: translateY(-1px);
        }

        .btn-outline-secondary:hover {
          transform: translateY(-1px);
        }

        /* Alerts */
        .alert {
          border-radius: 6px;
          font-size: 0.9rem;
        }

        /* Loading and Error */
        .loading-section, .error-section {
          min-height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-title {
            font-size: 1.5rem;
          }

          .admin-actions {
            flex-direction: column;
            gap: 0.5rem;
          }

          .main-layout .row {
            --bs-gutter-x: 1rem;
          }

          .profile-image {
            width: 100px;
            height: 100px;
          }

          .profile-name {
            font-size: 1.1rem;
          }

          .nav-buttons {
            justify-content: center;
          }

          .nav-buttons .btn {
            font-size: 0.8rem;
            padding: 0.3rem 0.6rem;
          }

          .quick-stats .row {
            --bs-gutter-x: 0.5rem;
          }
        }

        @media (max-width: 576px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .card-body {
            padding: 1rem !important;
          }

          .nav-buttons {
            gap: 0.3rem !important;
          }

          .form-control, .form-select {
            font-size: 0.85rem;
          }
        }

        /* Utilities */
        .border-0 {
          border: none !important;
        }

        .shadow-sm {
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
        }
      `}</style>
    </>
  );
}
