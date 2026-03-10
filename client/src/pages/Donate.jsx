import React, { useState } from 'react';
import '../assets/styles/AuthPage.css';
import { donationService } from '../services/donationService';
import { FaPaw, FaMedkit, FaUtensils } from 'react-icons/fa';

const Donate = () => {
  const [form, setForm] = useState({ name: '', email: '', amount: '', method: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!form.name || !form.email || !form.amount) {
      alert('Please provide name, email and amount');
      setLoading(false);
      return;
    }
    try {
      const res = await donationService.createDonation({ ...form, amount: Number(form.amount) });
      if (res.ok) {
        setSubmitted(true);
      } else {
        let text = '';
        try {
          const data = await res.json();
          text = data.message || JSON.stringify(data);
        } catch {
          text = await res.text();
        }
        console.error('Donation POST failed', res.status, text);
        alert(`Failed to send donation: ${text}`);
      }
    } catch {
      alert('Failed to send donation');
    } finally {
      setLoading(false);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-container wide">
        <div className="support-layout">
        <aside className="support-sidebar" aria-label="Donation impact overview">
          <div className="support-panel">
            <span className="support-panel-tag">Direct Impact</span>
            <h3>Every donation helps a pet heal</h3>
            <p>Your contribution helps us provide shelter, nutrition, treatment, and safe adoption pathways.</p>
          </div>
          <div className="support-feature-grid">
            <article className="support-feature-card">
              <div className="support-feature-icon"><FaPaw /></div>
              <div>
                <h4>Shelter & Comfort</h4>
                <p>Provide clean beds, warmth, and safe temporary homes for rescues.</p>
              </div>
            </article>
            <article className="support-feature-card">
              <div className="support-feature-icon"><FaMedkit /></div>
              <div>
                <h4>Medical Support</h4>
                <p>Help fund checkups, vaccinations, and urgent treatments.</p>
              </div>
            </article>
            <article className="support-feature-card">
              <div className="support-feature-icon"><FaUtensils /></div>
              <div>
                <h4>Daily Nutrition</h4>
                <p>Ensure rescued cats and dogs receive quality meals every day.</p>
              </div>
            </article>
          </div>
        </aside>

        <div className="auth-card support-form-card">
          <div className="auth-header">
            <h2>Support FurryNest</h2>
            <p className="auth-subtitle">Your donations help us care for more animals</p>
          </div>
          {!submitted ? (
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
                <button type="submit" className="auth-submit-btn" disabled={loading}>{loading ? <span className="spinner" /> : 'Donate'}</button>
              </div>
            </div>
          </form>
          ) : (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h3>Thank you for your donation!</h3>
              <p>Your support helps us care for animals — we appreciate you.</p>
              <div className="success-actions">
                <button className="auth-submit-btn" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', amount: '', method: '', message: '' }); }}>Donate again</button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
