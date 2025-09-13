import React, { useState, useEffect } from "react";
import "../style/Dashboard.css";
import { FaPaw, FaHeart, FaUsers, FaClipboardList, FaPlus, FaFileAlt, 
  FaCalendarAlt, FaHospital, FaChartBar, FaBell, FaCheckCircle, 
  FaExclamationCircle, FaInfoCircle } from "react-icons/fa";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [notifications] = useState([
    { id: 1, message: "New adoption application for Max", type: "info", time: "2 hours ago", icon: <FaInfoCircle /> },
    { id: 2, message: "Volunteer training scheduled for tomorrow", type: "warning", time: "4 hours ago", icon: <FaExclamationCircle /> },
    { id: 3, message: "Luna has been successfully adopted!", type: "success", time: "1 day ago", icon: <FaCheckCircle /> }
  ]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic stats based on selected period
  const getStats = () => {
    const baseStats = {
      month: [
        { title: "Pets Available", value: 128, change: "+5", icon: <FaPaw /> },
        { title: "Adoptions This Month", value: 12, change: "+3", icon: <FaHeart /> },
        { title: "Volunteer Signups", value: 34, change: "+8", icon: <FaUsers /> },
        { title: "Pending Applications", value: 18, change: "+2", icon: <FaClipboardList /> }
      ],
      week: [
        { title: "Pets Available", value: 128, change: "+2", icon: <FaPaw /> },
        { title: "Adoptions This Week", value: 3, change: "+1", icon: <FaHeart /> },
        { title: "Volunteer Signups", value: 8, change: "+3", icon: <FaUsers /> },
        { title: "Pending Applications", value: 18, change: "+5", icon: <FaClipboardList /> }
      ],
      year: [
        { title: "Pets Available", value: 128, change: "+15", icon: <FaPaw /> },
        { title: "Adoptions This Year", value: 156, change: "+45", icon: <FaHeart /> },
        { title: "Volunteer Signups", value: 289, change: "+67", icon: <FaUsers /> },
        { title: "Pending Applications", value: 18, change: "-8", icon: <FaClipboardList /> }
      ]
    };
    return baseStats[selectedPeriod];
  };

  const recentActivities = [
    { id: 1, activity: "Bella (Golden Retriever) added to available pets", time: "10 min ago", type: "add" },
    { id: 2, activity: "Application approved for Charlie", time: "1 hour ago", type: "approve" },
    { id: 3, activity: "New volunteer Sarah Johnson registered", time: "3 hours ago", type: "volunteer" },
    { id: 4, activity: "Max's adoption completed", time: "5 hours ago", type: "adopt" }
  ];

  const quickActions = [
    { title: "Add New Pet", description: "Register a new pet for adoption", icon: <FaPlus />, color: "#4CAF50" },
    { title: "Review Applications", description: "Check pending adoption requests", icon: <FaFileAlt />, color: "#2196F3" },
    { title: "Schedule Visit", description: "Arrange pet meet & greet", icon: <FaCalendarAlt />, color: "#FF9800" },
    { title: "Manage Volunteers", description: "View and organize volunteers", icon: <FaUsers />, color: "#9C27B0" },
    { title: "Medical Records", description: "Update pet health information", icon: <FaHospital />, color: "#F44336" },
    { title: "Reports", description: "Generate adoption reports", icon: <FaChartBar />, color: "#607D8B" }
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1>FurryNest Dashboard</h1>
            <p className="dashboard-sub">
              Welcome back! Today is {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="header-time">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>

        {/* Period Selector */}
        <div className="period-selector">
          <button 
            className={selectedPeriod === 'week' ? 'active' : ''}
            onClick={() => setSelectedPeriod('week')}
          >
            This Week
          </button>
          <button 
            className={selectedPeriod === 'month' ? 'active' : ''}
            onClick={() => setSelectedPeriod('month')}
          >
            This Month
          </button>
          <button 
            className={selectedPeriod === 'year' ? 'active' : ''}
            onClick={() => setSelectedPeriod('year')}
          >
            This Year
          </button>
        </div>

        {/* Stats Section */}
        <div className="dashboard-stats">
          {getStats().map((stat) => (
            <div key={stat.title} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
                <span className="stat-change">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-grid">
          {/* Quick Actions */}
          <div className="dashboard-section">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <div key={index} className="action-card" style={{'--action-color': action.color}}>
                  <div className="action-icon">{action.icon}</div>
                  <div className="action-content">
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className={`activity-item ${activity.type}`}>
                  <div className="activity-indicator"></div>
                  <div className="activity-content">
                    <p>{activity.activity}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="dashboard-section">
            <h3>Notifications</h3>
            <div className="notifications">
              {notifications.map((notification) => (
                <div key={notification.id} className={`notification-item ${notification.type}`}>
                  <div className="notification-icon">{notification.icon}</div>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  <button className="notification-dismiss">×</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;