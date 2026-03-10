import React from "react";
import { Link } from "react-router-dom";
import { LuCat } from "react-icons/lu";
import { PiDog } from "react-icons/pi";
import { FaHandsHelping, FaDonate } from "react-icons/fa";

const QuickNav = () => {
  const options = [
    {
      text: "Adopt a Dog",
      icon: <PiDog />,
      action: "Find your perfect companion",
      link: "/adopt-dog"
    },
    {
      text: "Adopt a Cat",
      icon: <LuCat />,
      action: "Discover your feline friend",
      link: "/adopt-cat"
    },
    {
      text: "Volunteer",
      icon: <FaHandsHelping />,
      action: "Help animals in need",
      link: "/volunteer"
    },
    {
      text: "Donate",
      icon: <FaDonate />,
      action: "Support our mission",
      link: "/donate"
    },
  ];

  return (
    <section className="quick-nav-section">
      <h2>Quick Actions</h2>
      <div className="quick-nav">
        {options.map((opt, i) => (
          <div key={i} className="quick-card" tabIndex={0}>
            <div className="icon">{opt.icon}</div>
            <h3>{opt.text}</h3>
            <p>{opt.action}</p>
            {opt.link !== "#" ? (
              <Link to={opt.link} className="quick-btn">Learn More</Link>
            ) : (
              <button className="quick-btn">Learn More</button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickNav;
