import { Link } from "react-router-dom";

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Vikram Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Passionate photographer turned entrepreneur with 10+ years in the industry.",
      social: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      id: 2,
      name: "Kavya Sharma",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
      bio: "Operations expert ensuring seamless experience for photographers and clients.",
      social: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      id: 3,
      name: "Rajesh Patel",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      bio: "Tech innovator building cutting-edge solutions for photography marketplace.",
      social: { linkedin: "#", twitter: "#", instagram: "#" }
    },
    {
      id: 4,
      name: "Priya Gupta",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
      bio: "Creative visionary curating quality and maintaining platform standards.",
      social: { linkedin: "#", twitter: "#", instagram: "#" }
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "VK Clicks Founded",
      description: "Started with a vision to democratize professional photography in India."
    },
    {
      year: "2021",
      title: "100+ Photographers",
      description: "Onboarded our first 100 verified professional photographers across 10 cities."
    },
    {
      year: "2022",
      title: "10,000 Bookings",
      description: "Reached milestone of 10,000 successful photography bookings nationwide."
    },
    {
      year: "2023",
      title: "25 Cities Covered",
      description: "Expanded operations to 25 major cities across India with local partnerships."
    },
    {
      year: "2024",
      title: "Award Recognition",
      description: "Won 'Best Photography Platform' at India Digital Awards 2024."
    },
    {
      year: "2025",
      title: "500+ Photographers",
      description: "Growing community of 500+ verified photographers serving 50+ cities."
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We maintain the highest standards of quality in every photography session and client interaction."
    },
    {
      icon: "🤝",
      title: "Trust",
      description: "Building lasting relationships through transparency, reliability, and consistent service delivery."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology and user-centric features."
    },
    {
      icon: "🌍",
      title: "Community",
      description: "Supporting photographers' growth while creating memorable experiences for every client."
    }
  ];

  return (
    <>
      <div className="about-page" style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        
        {/* Hero Section */}
        <section className="about-hero py-5 bg-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="about-title stylish-font mb-3">About VK Clicks</h1>
                <p className="about-subtitle text-muted mb-4">
                  India's most trusted photography platform connecting clients with talented photographers 
                  for life's most precious moments. Founded with passion, driven by excellence.
                </p>
                <div className="hero-stats">
                  <div className="row">
                    <div className="col-4">
                      <div className="stat-box text-center">
                        <h3 className="text-dark stylish-font mb-0">500+</h3>
                        <small className="text-muted">Photographers</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-box text-center">
                        <h3 className="text-dark stylish-font mb-0">50+</h3>
                        <small className="text-muted">Cities</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-box text-center">
                        <h3 className="text-dark stylish-font mb-0">10K+</h3>
                        <small className="text-muted">Happy Clients</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 text-center">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80"
                  alt="VK Clicks Team"
                  className="hero-image img-fluid rounded-4 shadow-lg"
                  style={{ maxHeight: '400px' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-vision py-5 bg-light">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="mission-card card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="mission-icon mb-3">
                      <span className="icon-bg rounded-circle d-inline-flex align-items-center justify-content-center">
                        🎯
                      </span>
                    </div>
                    <h3 className="mission-title stylish-font mb-3">Our Mission</h3>
                    <p className="mission-desc text-muted">
                      To revolutionize the photography industry in India by creating a seamless platform that 
                      connects clients with talented photographers for life's most important moments. We believe 
                      every memory deserves to be captured beautifully and professionally.
                    </p>
                    <div className="mission-highlights">
                      <div className="highlight-item d-flex align-items-center mb-2">
                        <span className="text-dark me-2">✓</span>
                        <span className="small">Democratize professional photography access</span>
                      </div>
                      <div className="highlight-item d-flex align-items-center mb-2">
                        <span className="text-dark me-2">✓</span>
                        <span className="small">Support photographer community growth</span>
                      </div>
                      <div className="highlight-item d-flex align-items-center">
                        <span className="text-dark me-2">✓</span>
                        <span className="small">Preserve precious memories with quality</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="vision-card card border-0 shadow-sm h-100">
                  <div className="card-body p-4">
                    <div className="vision-icon mb-3">
                      <span className="icon-bg rounded-circle d-inline-flex align-items-center justify-content-center">
                        🚀
                      </span>
                    </div>
                    <h3 className="vision-title stylish-font mb-3">What We Do</h3>
                    <p className="vision-desc text-muted">
                      We provide a comprehensive platform where clients can discover, compare, and book professional 
                      photographers across India. Our technology-driven approach ensures quality, transparency, and 
                      seamless experiences for both photographers and clients.
                    </p>
                    <div className="vision-features">
                      <div className="feature-item d-flex align-items-center mb-2">
                        <span className="text-dark me-2">▶</span>
                        <span className="small">Curated photographer verification process</span>
                      </div>
                      <div className="feature-item d-flex align-items-center mb-2">
                        <span className="text-dark me-2">▶</span>
                        <span className="small">Smart matching based on requirements</span>
                      </div>
                      <div className="feature-item d-flex align-items-center">
                        <span className="text-dark me-2">▶</span>
                        <span className="small">Secure booking and payment processing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className="story-timeline py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title stylish-font mb-3">Our Journey</h2>
              <p className="text-muted">From a simple idea to India's leading photography platform</p>
            </div>
            
            <div className="timeline">
              {milestones.map((milestone, index) => (
                <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-content">
                    <div className="timeline-card card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="timeline-year text-dark fw-bold stylish-font mb-2">
                          {milestone.year}
                        </div>
                        <h5 className="timeline-title stylish-font mb-2">{milestone.title}</h5>
                        <p className="timeline-desc text-muted small mb-0">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-marker">
                    <span className="marker-dot bg-dark"></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="our-values py-5 bg-light">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title stylish-font mb-3">Our Core Values</h2>
              <p className="text-muted">The principles that guide everything we do</p>
            </div>
            
            <div className="row g-4">
              {values.map((value, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div className="value-card text-center">
                    <div className="value-icon mb-3">{value.icon}</div>
                    <h5 className="value-title stylish-font mb-2">{value.title}</h5>
                    <p className="value-desc text-muted small">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section py-5 bg-white">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title stylish-font mb-3">Meet Our Team</h2>
              <p className="text-muted">The passionate people behind VK Clicks</p>
            </div>
            
            <div className="row g-4">
              {teamMembers.map((member, index) => (
                <div key={member.id} className="col-lg-3 col-md-6" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="team-card card border-0 shadow-sm text-center">
                    <div className="card-body p-4">
                      <div className="member-avatar mb-3">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="avatar-img rounded-circle"
                          width="100"
                          height="100"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <h5 className="member-name stylish-font mb-1">{member.name}</h5>
                      <p className="member-role text-dark small fw-bold mb-2">{member.role}</p>
                      <p className="member-bio text-muted small mb-3">{member.bio}</p>
                      <div className="social-links d-flex justify-content-center gap-2">
                        <a href={member.social.linkedin} className="social-link">
                          <span>🔗</span>
                        </a>
                        <a href={member.social.twitter} className="social-link">
                          <span>🐦</span>
                        </a>
                        <a href={member.social.instagram} className="social-link">
                          <span>📷</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta py-5 bg-dark text-white text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h2 className="cta-title stylish-font mb-3">Ready to Join Our Community?</h2>
                <p className="cta-subtitle mb-4">
                  Whether you're looking for the perfect photographer or wanting to join our network of professionals, 
                  we're here to help you create beautiful memories.
                </p>
                <div className="cta-buttons d-flex gap-3 justify-content-center flex-wrap">
                  <Link to="/discover" className="btn btn-light btn-lg rounded-pill px-5">
                    <span className="me-2">📸</span>
                    <strong className="text-dark">Find Photographers</strong>
                  </Link>
                  <Link to="/photographer/signup" className="btn btn-outline-light btn-lg rounded-pill px-5">
                    <span className="me-2">✨</span>
                    Join as Photographer
                  </Link>
                </div>
                <p className="small mt-3 opacity-75">
                  📞 Questions? Call us: +91 98765 43210 | ✉️ hello@vkclicks.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Page Styles - Black Theme */}
      <style>{`
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');
        
        .stylish-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.5px;
        }

        /* Hero Section */
        .about-title {
          font-size: 2.5rem;
          color: #000000;
          font-weight: 700;
        }

        .about-subtitle {
          font-size: 1.1rem;
          line-height: 1.6;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 300;
        }

        .hero-stats {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 2rem;
          border: 1px solid #e2e8f0;
        }

        .stat-box {
          transition: all 0.3s ease;
        }

        .stat-box:hover {
          transform: translateY(-3px);
        }

        .hero-image {
          transition: transform 0.3s ease;
        }

        .hero-image:hover {
          transform: scale(1.02);
        }

        /* Mission & Vision Cards */
        .mission-card, .vision-card {
          transition: all 0.3s ease;
          border-radius: 16px;
        }

        .mission-card:hover, .vision-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }

        .icon-bg {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #000000 0%, #333333 100%);
          font-size: 1.5rem;
        }

        .mission-title, .vision-title {
          color: #000000;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .mission-desc, .vision-desc {
          line-height: 1.6;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .highlight-item, .feature-item {
          font-size: 0.9rem;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding: 2rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #000000, #333333);
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
        }

        .timeline-item.left .timeline-content {
          margin-right: 55%;
          text-align: right;
        }

        .timeline-item.right .timeline-content {
          margin-left: 55%;
          text-align: left;
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          top: 20px;
          transform: translateX(-50%);
        }

        .marker-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: block;
          border: 4px solid white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .timeline-card {
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .timeline-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
        }

        .timeline-year {
          font-size: 1.2rem;
          color: #000000 !important;
        }

        .timeline-title {
          color: #000000;
          font-size: 1.1rem;
        }

        .timeline-desc {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Values Section */
        .value-card {
          transition: all 0.3s ease;
          padding: 1.5rem;
        }

        .value-card:hover {
          transform: translateY(-5px);
        }

        .value-icon {
          font-size: 2.5rem;
          transition: transform 0.3s ease;
        }

        .value-card:hover .value-icon {
          transform: scale(1.2) rotate(5deg);
        }

        .value-title {
          color: #000000;
          font-size: 1.2rem;
        }

        .value-desc {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
        }

        /* Team Section */
        .team-card {
          border-radius: 16px;
          transition: all 0.3s ease;
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

        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
        }

        .avatar-img {
          transition: transform 0.3s ease;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        .team-card:hover .avatar-img {
          transform: scale(1.1);
        }

        .member-name {
          color: #000000;
          font-size: 1.1rem;
        }

        .member-role {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #000000 !important;
        }

        .member-bio {
          line-height: 1.5;
          font-family: 'Source Sans Pro', sans-serif;
        }

        .social-link {
          display: inline-flex;
          width: 32px;
          height: 32px;
          align-items: center;
          justify-content: center;
          background: #f1f5f9;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #000000;
          transform: translateY(-2px);
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

        /* Buttons */
        .btn {
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 500;
          transition: all 0.3s ease;
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .about-title {
            font-size: 2rem;
          }

          .about-subtitle {
            font-size: 1rem;
          }

          .timeline::before {
            left: 20px;
          }

          .timeline-item.left .timeline-content,
          .timeline-item.right .timeline-content {
            margin-left: 40px;
            margin-right: 0;
            text-align: left;
          }

          .timeline-marker {
            left: 20px;
          }

          .value-icon {
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
