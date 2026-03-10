import React, { useState } from 'react';
import { FaHandsHelping, FaClock, FaUserShield } from 'react-icons/fa';
import { volunteerService } from '../services/volunteerService';
import '../assets/styles/AuthPage.css';

const Volunteer = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', availability: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // simple client-side validation
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill name, email and phone');
      setLoading(false);
      return;
    }
    try {
      const res = await volunteerService.createVolunteer(form);
      if (res.ok) {
        // show success message instead of immediate navigation
        setSubmitted(true);
      } else {
        let text = '';
        try {
          const data = await res.json();
          text = data.message || JSON.stringify(data);
        } catch {
          text = await res.text();
        }
        console.error('Volunteer POST failed', res.status, text);
        alert(`Failed to register volunteer: ${text}`);
      }
    } catch {
      alert('Failed to register volunteer');
    } finally {
      setLoading(false);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="auth-page">
      <div className="auth-container wide">
        <div className="support-layout">
        <aside className="support-sidebar" aria-label="Volunteer highlights">
          <div className="support-panel">
            <span className="support-panel-tag">Community Care</span>
            <h3>Volunteer with purpose</h3>
            <p>Your time directly supports rescued pets through feeding, care, and adoption events.</p>
          </div>
          <div className="support-feature-grid">
            <article className="support-feature-card">
              <div className="support-feature-icon"><FaHandsHelping /></div>
              <div>
                <h4>Meaningful Roles</h4>
                <p>Match with activities that fit your interests and comfort level.</p>
              </div>
            </article>
            <article className="support-feature-card">
              <div className="support-feature-icon"><FaClock /></div>
              <div>
                <h4>Flexible Schedule</h4>
                <p>Weekday, weekend, and event-based opportunities are available.</p>
              </div>
            </article>
            <article className="support-feature-card">
              <div className="support-feature-icon"><FaUserShield /></div>
              <div>
                <h4>Guided Onboarding</h4>
                <p>Receive orientation and support from our volunteer coordinators.</p>
              </div>
            </article>
          </div>
        </aside>

        <div className="auth-card support-form-card">
          <div className="auth-header">
            <h2>Volunteer with FurryNest</h2>
            <p className="auth-subtitle">Join our volunteer network and help animals in need</p>
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
                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? <span className="spinner" /> : 'Sign Up to Volunteer'}
                </button>
              </div>
            </div>
          </form>
          ) : (
            <div className="success-card">
              <div className="success-icon">✓</div>
              <h3>Thank you for volunteering!</h3>
              <p>We've received your details. Our team will reach out to you soon.</p>
              <div className="success-actions">
                <button className="auth-submit-btn" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', availability: '', message: '' }); }}>Submit another</button>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
