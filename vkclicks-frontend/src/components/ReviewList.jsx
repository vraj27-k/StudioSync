import { useState, useEffect } from 'react';

export default function ReviewList({ photographerId }) {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const [reviewsRes, summaryRes] = await Promise.all([
        fetch(`http://localhost:8000/api/photographer/${photographerId}/reviews/`),
        fetch(`http://localhost:8000/api/photographer/${photographerId}/reviews/summary/`)
      ]);

      const reviewsData = await reviewsRes.json();
      const summaryData = await summaryRes.json();

      setReviews(reviewsData);
      setSummary(summaryData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [photographerId]);

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="text-center">Loading reviews...</div>;
  }

  return (
    <div>
      {/* Review Summary */}
      {summary && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 text-center">
                <h2 className="display-4">{summary.average_rating}</h2>
                <div className="h4">{renderStars(Math.round(summary.average_rating))}</div>
                <p className="text-muted">{summary.total_reviews} reviews</p>
              </div>
              <div className="col-md-8">
                <h5>Rating Distribution</h5>
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="d-flex align-items-center mb-1">
                    <span className="me-2">{star} ⭐</span>
                    <div className="progress flex-grow-1 me-2" style={{ height: '20px' }}>
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${summary.total_reviews > 0 ? (summary.rating_distribution[`${star}_star`] / summary.total_reviews) * 100 : 0}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-muted">{summary.rating_distribution[`${star}_star`]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Reviews */}
      <div className="card">
        <div className="card-header">
          <h4>📋 Client Reviews</h4>
        </div>
        <div className="card-body">
          {reviews.length > 0 ? (
            <div className="row">
              {reviews.map(review => (
                <div key={review.id} className="col-md-6 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="card-title">{review.client_name}</h6>
                        <div className="text-warning">{renderStars(review.rating)}</div>
                      </div>
                      <p className="card-text">{review.comment}</p>
                      <small className="text-muted">{formatDate(review.created_at)}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info text-center">
              <h5>No Reviews Yet</h5>
              <p>Be the first to leave a review for this photographer!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
