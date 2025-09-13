import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import '../style/AuthPage.css';

const Volunteer = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', availability: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        navigate('/');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to register volunteer');
      }
    } catch (err) {
      alert('Failed to register volunteer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container wide">
        <div className="back-button">
          <Link to="/" className="back-link"><FaArrowLeft /> Back to Home</Link>
        </div>
        <div className="auth-card">
          <div className="auth-header">
            <h2>Volunteer with FurryNest</h2>
            <p className="auth-subtitle">Join our volunteer network and help animals in need</p>
          </div>
          <form onSubmit={handleSubmit} className="auth-form two-column">
            <div>
              <div className="form-group">
                <label>Full name</label>
                <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <div className="form-group">
                <label>Availability</label>
                <input name="availability" placeholder="Availability (e.g., weekends)" value={form.availability} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />
              </div>
              <div className="form-group">
                <button type="submit" className="auth-submit-btn" disabled={loading}>{loading ? 'Sending...' : 'Sign Up to Volunteer'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
