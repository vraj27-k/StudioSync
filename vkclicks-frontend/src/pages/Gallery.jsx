import { useState } from "react";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Updated gallery data with real photography images
  const galleryImages = [
    // Wedding Photography
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Traditional Indian Wedding Ceremony",
      photographer: "Rajesh Kumar",
      location: "Mumbai"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Bride & Groom First Look",
      photographer: "Kavya Reddy",
      location: "Hyderabad"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Wedding Reception Dance",
      photographer: "Neha Agarwal",
      location: "Indore"
    },

    // Portrait Photography
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Professional Business Headshot",
      photographer: "Ravi Mehta",
      location: "Ahmedabad"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Creative Studio Portrait",
      photographer: "Priya Sharma",
      location: "Delhi"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Elegant Fashion Portrait",
      photographer: "Rohit Kumar",
      location: "Chandigarh"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Executive Corporate Portrait",
      photographer: "Deepak Sharma",
      location: "Lucknow"
    },

    // Event Photography
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      category: "event",
      title: "Corporate Conference Coverage",
      photographer: "Rahul Verma",
      location: "Noida"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      category: "event",
      title: "Birthday Party Celebration",
      photographer: "Sonia Kapoor",
      location: "Jaipur"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
      category: "event",
      title: "Cultural Festival Documentation",
      photographer: "Arjun Patel",
      location: "Bangalore"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      category: "event",
      title: "Live Music Concert",
      photographer: "Vikram Singh",
      location: "Pune"
    },

    // Maternity Photography
    {
      id: 13,
      src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=800&q=80",
      category: "maternity",
      title: "Beautiful Maternity Session",
      photographer: "Amit Verma",
      location: "Kolkata"
    },
    {
      id: 15,
      src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80",
      category: "maternity",
      title: "Family Maternity Shoot",
      photographer: "Ananya Joshi",
      location: "Kochi"
    },

    // Commercial Photography
    {
      id: 16,
      src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      category: "commercial",
      title: "Product Photography Studio",
      photographer: "Karan Malhotra",
      location: "Gurgaon"
    },
    {
      id: 17,
      src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80",
      category: "commercial",
      title: "Restaurant Food Photography",
      photographer: "Sunita Rao",
      location: "Mysore"
    },
    {
      id: 18,
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      category: "commercial",
      title: "Modern Office Architecture",
      photographer: "Ashish Kumar",
      location: "Bhubaneswar"
    },

    // Additional Wedding Photos
    {
      id: 19,
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Mehendi Ceremony Details",
      photographer: "Pooja Thakur",
      location: "Udaipur"
    },
    {
      id: 20,
      src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      category: "wedding",
      title: "Wedding Ring Exchange",
      photographer: "Manish Agarwal",
      location: "Jodhpur"
    },

    // Additional Portraits
    {
      id: 21,
      src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Creative Outdoor Portrait",
      photographer: "Shweta Mishra",
      location: "Shimla"
    },
    {
      id: 22,
      src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80",
      category: "portrait",
      title: "Professional Model Portfolio",
      photographer: "Gaurav Bhatia",
      location: "Mumbai"
    },

    // Additional Events
    {
      id: 23,
      src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      category: "event",
      title: "Graduation Ceremony",
      photographer: "Suresh Nair",
      location: "Thiruvananthapuram"
    },
    {
      id: 24,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80",
      category: "event",
      title: "Corporate Team Building Event",
      photographer: "Harish Reddy",
      location: "Visakhapatnam"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Photos', count: galleryImages.length },
    { key: 'wedding', label: 'Weddings', count: galleryImages.filter(img => img.category === 'wedding').length },
    { key: 'portrait', label: 'Portraits', count: galleryImages.filter(img => img.category === 'portrait').length },
    { key: 'event', label: 'Events', count: galleryImages.filter(img => img.category === 'event').length },
    { key: 'commercial', label: 'Commercial', count: galleryImages.filter(img => img.category === 'commercial').length },
    { key: 'maternity', label: 'Maternity', count: galleryImages.filter(img => img.category === 'maternity').length }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  const openLightbox = (image) => {
    setLightboxImage(image);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setLightboxImage(filteredImages[prevIndex]);
  };

  return (
    <>
      <div className="gallery-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Hero Section */}
        <section className="gallery-hero py-5 bg-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 mx-auto text-center">
                <h1 className="gallery-title stylish-font mb-3">Photography Gallery</h1>
                <p className="gallery-subtitle text-muted mb-4">
                  Explore stunning photography work from our talented photographers across India. 
                  Discover the artistry and creativity that brings your special moments to life.
                </p>
                <div className="gallery-stats">
                  <div className="row">
                    <div className="col-4">
                      <div className="stat-item">
                        <h4 className="text-dark stylish-font mb-0">{galleryImages.length}+</h4>
                        <small className="text-muted">Photos</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <h4 className="text-dark stylish-font mb-0">50+</h4>
                        <small className="text-muted">Photographers</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <h4 className="text-dark stylish-font mb-0">25+</h4>
                        <small className="text-muted">Cities</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filter-section py-4 bg-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10">
                <div className="filter-buttons d-flex flex-wrap justify-content-center gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setActiveFilter(category.key)}
                      className={`btn filter-btn ${activeFilter === category.key ? 'active' : ''}`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="gallery-grid py-5">
          <div className="container">
            <div className="row g-4">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className={`col-lg-4 col-md-6 gallery-item ${activeFilter}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="gallery-card" onClick={() => openLightbox(image)}>
                    <div className="image-container">
                      <img 
                        src={image.src} 
                        alt={image.title}
                        className="gallery-image"
                        loading="lazy"
                      />
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <h5 className="image-title stylish-font">{image.title}</h5>
                          <p className="image-meta">
                            <span className="photographer">📸 {image.photographer}</span>
                            <span className="location">📍 {image.location}</span>
                          </p>
                          <button className="view-btn">
                            <span>👁️ View Full Size</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Section */}
            <div className="text-center mt-5">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <p className="text-muted mb-4">
                    Showing {filteredImages.length} professional photography samples from our network of {galleryImages.filter((v,i,a)=>a.findIndex(t=>(t.photographer === v.photographer))===i).length} verified photographers across India.
                  </p>
                  <button className="btn btn-outline-dark btn-lg px-4 py-3 rounded-pill">
                    <span className="me-2">📸</span>
                    Book a Photography Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && lightboxImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            <button className="lightbox-close" onClick={closeLightbox}>
              <span>✕</span>
            </button>
            <button className="lightbox-prev" onClick={prevImage}>
              <span>‹</span>
            </button>
            <button className="lightbox-next" onClick={nextImage}>
              <span>›</span>
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={lightboxImage.src} alt={lightboxImage.title} className="lightbox-image" />
              <div className="lightbox-info">
                <h4 className="stylish-font">{lightboxImage.title}</h4>
                <p className="text-muted">
                  <span className="me-3">📸 {lightboxImage.photographer}</span>
                  <span>📍 {lightboxImage.location}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Styles - Updated with Black Theme */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Gallery Hero */
        .gallery-title {
          font-size: 2.5rem;
          color: #000000;
          font-weight: 700;
        }

        .gallery-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }

        .gallery-stats {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          border: 1px solid #e2e8f0;
        }

        /* Filter Buttons - Black Theme */
        .filter-btn {
          background: white;
          border: 2px solid #e2e8f0;
          color: #64748b;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-weight: 500;
          transition: all 0.3s ease;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .filter-btn:hover {
          border-color: #000000;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          border-color: #000000;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        /* Gallery Items */
        .gallery-item {
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

        .gallery-card {
          cursor: pointer;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .gallery-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .image-container {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4/3;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-card:hover .gallery-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.8) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
        }

        .gallery-card:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content {
          color: white;
          text-align: left;
        }

        .image-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .image-meta {
          font-size: 0.85rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .image-meta span {
          display: block;
          margin-bottom: 0.25rem;
        }

        .view-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #000000;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .view-btn:hover {
          background: white;
          transform: translateY(-2px);
        }

        /* Load More Button - Black Theme */
        .btn-outline-dark {
          border: 2px solid #000000;
          color: #000000;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-outline-dark:hover {
          background: #000000;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        /* Lightbox */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .lightbox-container {
          position: relative;
          width: 90%;
          height: 90%;
          max-width: 1200px;
          max-height: 800px;
        }

        .lightbox-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: 80%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .lightbox-info {
          color: white;
          text-align: center;
          margin-top: 1rem;
          padding: 1rem;
        }

        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 1.5rem;
          font-weight: 300;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lightbox-close {
          top: 20px;
          right: 20px;
        }

        .lightbox-prev {
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .lightbox-next {
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-close:hover {
          transform: scale(1.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .gallery-title {
            font-size: 2rem;
          }

          .gallery-subtitle {
            font-size: 1rem;
          }

          .filter-btn {
            font-size: 0.85rem;
            padding: 0.4rem 1rem;
          }

          .image-overlay {
            padding: 1rem;
          }

          .image-title {
            font-size: 1rem;
          }

          .image-meta {
            font-size: 0.75rem;
          }

          .lightbox-container {
            width: 95%;
            height: 95%;
          }

          .lightbox-prev,
          .lightbox-next {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}
