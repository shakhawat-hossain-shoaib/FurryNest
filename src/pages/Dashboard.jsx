import React from "react";
import "../style/Dashboard.css";

const Dashboard = () => {
  // Placeholder stats - replace with real data as needed
  const stats = [
    { title: "Pets Available", value: 128 },
    { title: "Adoptions This Month", value: 12 },
    { title: "Volunteer Signups", value: 34 },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <p className="dashboard-sub">Welcome to your FurryNest dashboard. Manage adoptions, volunteers and content.</p>

        <div className="dashboard-stats">
          {stats.map((s) => (
            <div key={s.title} className="stat-card">
              <h3>{s.value}</h3>
              <p>{s.title}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-actions">
          <div className="action-card">Manage Pets</div>
          <div className="action-card">View Applications</div>
          <div className="action-card">Manage Volunteers</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
