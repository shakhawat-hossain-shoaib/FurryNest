import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/ContactUs.css";
import { FaArrowLeft, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-us-page">
      <div className="back-button">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="contact-us-container">
        <div className="contact-us-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you! Get in touch with us for any questions about adoption, volunteering, or general inquiries.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info-section">
            <h2>Get in Touch</h2>
            <div className="contact-info-grid">
              <div className="contact-info-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h3>Visit Us</h3>
                  <p>123 Animal Shelter Lane<br />Downtown, City 12345<br />United States</p>
                </div>
              </div>

              <div className="contact-info-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567<br />+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="contact-info-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h3>Email Us</h3>
                  <p>info@furrynest.com<br />adoptions@furrynest.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <FaClock className="contact-icon" />
                <div>
                  <h3>Opening Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: 12:00 PM - 4:00 PM</p>
                </div>
              </div>
            </div>

            
          </div>

          <div className="contact-form-section">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter message subject"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Enter your message here..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>

        <div className="map-section">
          <h2>Find Us</h2>
          <div className="map-placeholder">
            <p>Interactive map will be displayed here</p>
            <p>📍 123 Animal Shelter Lane, Downtown, City 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
