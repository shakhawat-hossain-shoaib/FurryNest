import React from "react";
import { Link } from "react-router-dom";
import "../style/WaysToHelp.css";
import { FaArrowLeft, FaHandHoldingHeart, FaHandsHelping, FaHeart, FaUsers, FaGift, FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const WaysToHelp = () => {
  const waysToHelp = [
    {
      title: "Volunteer Your Time",
      description: "Join our volunteer program and help care for animals, assist with events, or support our daily operations.",
      icon: <FaHandsHelping />,
      color: "#A0E7E5",
      details: [
        "Animal care and feeding",
        "Event assistance",
        "Administrative support",
        "Facility maintenance"
      ]
    },
    {
      title: "Make a Donation",
      description: "Your financial contributions help us provide food, medical care, and shelter for animals in need.",
      icon: <FaGift />,
      color: "#B4D8FD",
      details: [
        "One-time donations",
        "Monthly sponsorships",
        "Memorial donations",
        "Corporate partnerships"
      ]
    },
    {
      title: "Adopt a Pet",
      description: "Give a loving home to a pet in need. Adoption saves lives and creates forever families.",
      icon: <FaHeart />,
      color: "#FFF6A1",
      details: [
        "Browse available pets",
        "Meet and greet sessions",
        "Adoption counseling",
        "Post-adoption support"
      ]
    },
    {
      title: "Foster Care",
      description: "Provide temporary care for animals while they wait for their forever homes.",
      icon: <FaHandHoldingHeart />,
      color: "#FDE9F3",
      details: [
        "Short-term fostering",
        "Medical recovery fostering",
        "Kitten/puppy fostering",
        "Training support provided"
      ]
    },
    {
      title: "Spread Awareness",
      description: "Help us reach more people by sharing our mission and available pets on social media.",
      icon: <FaUsers />,
      color: "#C1FFD7",
      details: [
        "Social media sharing",
        "Community events",
        "Educational programs",
        "Pet photography"
      ]
    },
    {
      title: "Attend Events",
      description: "Join our fundraising events, adoption fairs, and community gatherings.",
      icon: <FaCalendarAlt />,
      color: "#F3C4FB",
      details: [
        "Adoption fairs",
        "Fundraising galas",
        "Educational workshops",
        "Community outreach"
      ]
    }
  ];

  return (
    <div className="ways-to-help-page">
      <div className="back-button">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="ways-to-help-container">
        <div className="ways-to-help-header">
          <h1>Ways to Help</h1>
          <p>There are many ways you can make a difference in the lives of animals in need. Choose the option that works best for you!</p>
        </div>

        <div className="ways-to-help-grid">
          {waysToHelp.map((way, index) => (
            <div key={index} className="way-to-help-card" style={{ "--card-color": way.color }}>
              <div className="way-to-help-icon">
                {way.icon}
              </div>
              <h3>{way.title}</h3>
              <p>{way.description}</p>
              <ul className="way-to-help-details">
                {way.details.map((detail, detailIndex) => (
                  <li key={detailIndex}>{detail}</li>
                ))}
              </ul>
              <button className="way-to-help-btn">Learn More</button>
            </div>
          ))}
        </div>

        <div className="contact-section">
          <h2>Ready to Get Started?</h2>
          <p>Contact us to learn more about any of these opportunities or to schedule a visit.</p>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div>
                <h4>Visit Us</h4>
                <p>123 Animal Shelter Lane<br />Downtown, City 12345</p>
              </div>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div>
                <h4>Call Us</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <div>
                <h4>Email Us</h4>
                <p>info@furrynest.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaysToHelp;
