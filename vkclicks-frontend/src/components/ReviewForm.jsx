import { useState } from 'react';

export default function ReviewForm({ photographerId, onReviewSubmitted }) {
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
        setMessage(`❌ Error: ${data.detail || JSON.stringify(data)}`);
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
    <div className="card">
      <div className="card-header">
        <h4>📝 Leave a Review</h4>
      </div>
      <div className="card-body">
        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                name="client_name"
                className="form-control"
                value={formData.client_name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Your Email *</label>
              <input
                type="email"
                name="client_email"
                className="form-control"
                value={formData.client_email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Rating *</label>
            <select
              name="rating"
              className="form-control"
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

          <div className="mb-3">
            <label className="form-label">Your Review *</label>
            <textarea
              name="comment"
              className="form-control"
              rows="4"
              value={formData.comment}
              onChange={handleChange}
              required
              placeholder="Share your experience with this photographer..."
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
}
