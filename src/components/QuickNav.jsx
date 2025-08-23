import React from "react";
import { LuCat } from "react-icons/lu";
import { PiDog } from "react-icons/pi";
import { FaHandsHelping } from "react-icons/fa";
import { FaDonate } from "react-icons/fa";

const options = [
  {
    text: "Adopt a Dog",
    icon: <PiDog />,
    action: "Find your perfect canine companion"
  },
  {
    text: "Adopt a Cat",
    icon: <LuCat />,
    action: "Discover your feline friend"
  },
  {
    text: "Volunteer",
    icon: <FaHandsHelping />,
    action: "Help animals in need"
  },
  {
    text: "Donate",
    icon: <FaDonate />,
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
