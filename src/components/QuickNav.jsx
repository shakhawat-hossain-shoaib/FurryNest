import React from "react";

const options = [
  {
    text: "Adopt a Dog",
    icon: "🐶",
    action: "Find your perfect canine companion"
  },
  {
    text: "Adopt a Cat",
    icon: "🐱",
    action: "Discover your feline friend"
  },
  {
    text: "Volunteer",
    icon: "🤝",
    action: "Help animals in need"
  },
  {
    text: "Donate",
    icon: "💖",
    action: "Support our mission"
  },
];

const QuickNav = () => (
  <section className="quick-nav-section">
    <h2>Quick Actions</h2>
    <div className="quick-nav">
      {options.map((opt, i) => (
        <div key={i} className="quick-card" tabIndex={0}>
          <div className="icon">{opt.icon}</div>
          <h3>{opt.text}</h3>
          <p>{opt.action}</p>
          <button className="quick-btn">Learn More</button>
        </div>
      ))}
    </div>
  </section>
);

export default QuickNav;
