import React, { useState, useEffect } from "react";
import "../style/Dashboard.css";
import { FaPaw, FaHeart, FaUsers, FaDollarSign, FaPlus, FaFileAlt, 
  FaCalendarAlt, FaHospital, FaChartBar, FaBell, FaCheckCircle, 
  FaExclamationCircle, FaInfoCircle, FaHandsHelping } from "react-icons/fa";
import { GiDogHouse, GiCat } from 'react-icons/gi';
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [totalDonations, setTotalDonations] = useState(0);
  const [notifications] = useState([
    { id: 1, message: "New adoption application for Max", type: "info", time: "2 hours ago", icon: <FaInfoCircle /> },
    { id: 2, message: "Volunteer training scheduled for tomorrow", type: "warning", time: "4 hours ago", icon: <FaExclamationCircle /> },
    { id: 3, message: "Luna has been successfully adopted!", type: "success", time: "1 day ago", icon: <FaCheckCircle /> }
  ]);

  // Fetch donation data
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donationsRes = await fetch('http://localhost:5000/api/donations');
        const donationsData = await donationsRes.json();
        const total = donationsData.reduce((sum, donation) => sum + donation.amount, 0);
        setTotalDonations(total);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Volunteers and signups state
  const [volunteers, setVolunteers] = useState([]);
  const [volunteerStats, setVolunteerStats] = useState({ total: 0, active: 0 });
  const [volLoading, setVolLoading] = useState(true);
  const [volError, setVolError] = useState(null);

  useEffect(() => {
    // Fetch volunteers from backend
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/volunteers');
        const data = await response.json();
        setVolunteers(Array.isArray(data) ? data : []);
        setVolunteerStats({
          total: data.length,
          active: data.filter(v => v.status === 'active').length
        });
        setVolLoading(false);
      } catch (error) {
        setVolError(`Failed to load volunteers: ${error.message}`);
        setVolLoading(false);
      }
    };
    fetchVolunteers();
  }, []);

  // Pet count state
  const [petCounts, setPetCounts] = useState({ 
    total: 0, 
    dogs: 0, 
    cats: 0,
    adoptedTotal: 0,
    adoptedDogs: 0,
    adoptedCats: 0 
  });

  // Fetch pet counts
  useEffect(() => {
    const fetchPetCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pets/count');
        const data = await response.json();
        setPetCounts({
          ...data,
          adoptedTotal: data.adoptedDogs + data.adoptedCats || 0,
          adoptedDogs: data.adoptedDogs || 0,
          adoptedCats: data.adoptedCats || 0
        });
      } catch (error) {
        console.error('Error fetching pet counts:', error);
      }
    };
    fetchPetCounts();
  }, []);

  // Dynamic stats based on selected period
  const getStats = () => {
    const formatMoney = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    };

    const baseStats = {
      month: [
        { 
          title: "Available Pets", 
          value: petCounts.total, 
          details: [
            { 
              icon: <GiDogHouse className="pet-type-icon" />, 
              count: petCounts.dogs,
              label: "Dogs Available"
            },
            { 
              icon: <GiCat className="pet-type-icon" />, 
              count: petCounts.cats,
              label: "Cats Available"
            }
          ],
          icon: <FaPaw className="stats-main-icon" />
        },
        { 
          title: "Adopted Pets", 
          value: petCounts.adoptedTotal,
          details: [
            { 
              icon: <GiDogHouse className="pet-type-icon adopted" />, 
              count: petCounts.adoptedDogs,
              label: "Dogs Adopted"
            },
            { 
              icon: <GiCat className="pet-type-icon adopted" />, 
              count: petCounts.adoptedCats,
              label: "Cats Adopted"
            }
          ],
          icon: <FaHeart className="stats-main-icon" />
        },
        { 
          title: "Volunteer Signups", 
          value: volunteerStats.total, 
          change: `${volunteerStats.active} Active Volunteers`,
          icon: <FaHandsHelping /> 
        },
        { 
          title: "Total Donations", 
          value: formatMoney(totalDonations), 
          change: "Current Total", 
          icon: <FaDollarSign /> 
        }
      ],
      week: [
        { 
          title: "Available Pets", 
          value: petCounts.total, 
          details: [
            { 
              icon: <GiDogHouse className="pet-type-icon" />, 
              count: petCounts.dogs,
              label: "Dogs Available"
            },
            { 
              icon: <GiCat className="pet-type-icon" />, 
              count: petCounts.cats,
              label: "Cats Available"
            }
          ],
          icon: <FaPaw className="stats-main-icon" />
        },
        { 
          title: "Adopted Pets", 
          value: petCounts.adoptedTotal,
          details: [
            { 
              icon: <GiDogHouse className="pet-type-icon adopted" />, 
              count: petCounts.adoptedDogs,
              label: "Dogs Adopted"
            },
            { 
              icon: <GiCat className="pet-type-icon adopted" />, 
              count: petCounts.adoptedCats,
              label: "Cats Adopted"
            }
          ],
          icon: <FaHeart className="stats-main-icon" />
        },
        { 
          title: "Volunteer Signups", 
          value: volunteerStats.total, 
          change: `${volunteerStats.active} Active Volunteers`,
          icon: <FaHandsHelping /> 
        },
        { 
          title: "Total Donations", 
          value: formatMoney(totalDonations), 
          change: "Current Total", 
          icon: <FaDollarSign /> 
        }
      ],
      year: [
        { 
          title: "Available Pets", 
          value: petCounts.total, 
          details: [
            { 
              icon: <GiDogHouse className="pet-type-icon" />, 
              count: petCounts.dogs,
              label: "Dogs Available"
            },
            { 
              icon: <GiCat className="pet-type-icon" />, 
              count: petCounts.cats,
              label: "Cats Available"
            }
          ],
          icon: <FaPaw className="stats-main-icon" />
        },
        { 
          title: "Adopted Pets", 
          value: petCounts.adoptedTotal,
          details: [
            { 
              icon: <GiDogHouse className="pet-type-icon adopted" />, 
              count: petCounts.adoptedDogs,
              label: "Dogs Adopted"
            },
            { 
              icon: <GiCat className="pet-type-icon adopted" />, 
              count: petCounts.adoptedCats,
              label: "Cats Adopted"
            }
          ],
          icon: <FaHeart className="stats-main-icon" />
        },
        { 
          title: "Volunteer Signups", 
          value: volunteerStats.total, 
          change: `${volunteerStats.active} Active Volunteers`,
          icon: <FaHandsHelping /> 
        },
        { 
          title: "Total Donations", 
          value: formatMoney(totalDonations), 
          change: "Current Total", 
          icon: <FaDollarSign /> 
        }
      ]
    };
    return baseStats[selectedPeriod];
  };

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
              {stat.icon && <div className="stat-icon">{stat.icon}</div>}
              <div className="stat-content">
                <h3 className={stat.title === "Total Donations" ? "donation-value" : ""}>
                  {stat.value}
                </h3>
                <p>{stat.title}</p>
                {stat.details ? (
                  <div className="pet-type-details">
                    {stat.details.map((detail, index) => (
                      <div key={index} className="pet-type-item">
                        {detail.icon}
                        <div className="pet-info">
                          <span className="pet-count">{detail.count}</span>
                          <span className="pet-label">{detail.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  stat.change && <span className="stat-change">{stat.change}</span>
                )}
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
                action.title === "Add New Pet" ? (
                  <Link to="/add" key={index} className="action-card" style={{'--action-color': action.color}}>
                    <div className="action-icon">{action.icon}</div>
                    <div className="action-content">
                      <h4>{action.title}</h4>
                      <p>{action.description}</p>
                    </div>
                  </Link>
                ) : (
                  <div key={index} className="action-card" style={{'--action-color': action.color}}>
                    <div className="action-icon">{action.icon}</div>
                    <div className="action-content">
                      <h4>{action.title}</h4>
                      <p>{action.description}</p>
                    </div>
                  </div>
                )
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

        {/* Volunteers Section */}
        <div className="dashboard-section">
          <h3>Volunteers</h3>
          {volLoading ? (
            <div className="volunteers-loading">Loading volunteers...</div>
          ) : volError ? (
            <div className="volunteers-error">{volError}</div>
          ) : volunteers.length === 0 ? (
            <div className="volunteers-empty">No volunteers registered yet.</div>
          ) : (
            <div className="volunteers-list">
              <table className="volunteers-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map(vol => (
                    <tr key={vol._id || vol.email}>
                      <td>{vol.name}</td>
                      <td>{vol.email}</td>
                      <td>{vol.phone}</td>
                      <td>{vol.availability || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;