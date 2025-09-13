import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style/AuthPage.css';
import { FaArrowLeft } from 'react-icons/fa';

const Donate = () => {
  const [form, setForm] = useState({ name: '', email: '', amount: '', method: '', message: '' });
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
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      if (res.ok) {
        navigate('/');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to send donation');
      }
    } catch (err) {
      alert('Failed to send donation');
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
            <h2>Support FurryNest</h2>
            <p className="auth-subtitle">Your donations help us care for more animals</p>
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
                <label>Amount (USD)</label>
                <input name="amount" type="number" placeholder="Amount (USD)" value={form.amount} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <div className="form-group">
                <label>Payment method</label>
                <input name="method" placeholder="Payment method (e.g., card, paypal)" value={form.method} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Message (optional)</label>
                <textarea name="message" placeholder="Message (optional)" value={form.message} onChange={handleChange} />
              </div>
              <div className="form-group">
                <button type="submit" className="auth-submit-btn" disabled={loading}>{loading ? 'Processing...' : 'Donate'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Donate;
