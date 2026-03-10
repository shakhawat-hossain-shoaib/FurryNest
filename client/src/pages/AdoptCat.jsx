import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaVenusMars,
  FaBirthdayCake,
  FaPaw,
  FaUtensils,
  FaUser,
} from "react-icons/fa";
import "../assets/styles/AdoptCat.css";
import { petService } from "../services/petService";
import { resolveImageUrl } from "../utils/resolveImageUrl";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face";

const AdoptCat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchCats = async () => {
      try {
        setLoading(true);
        const data = await petService.getPets("cat");
        if (mounted) {
          setCats(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (fetchError) {
        if (mounted) {
          setError(fetchError?.response?.data?.message || "Failed to load cats");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCats();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCats = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return cats;

    return cats.filter((cat) =>
      [cat.name, cat.breed, cat.location, cat.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [cats, searchTerm]);

  const handleAdoptClick = (cat) => {
    navigate(`/pet/cat/${cat._id}`);
  };

  return (
    <div className="adopt-page">
      <div className="adopt-header">
        <h1>Adopt a Cat</h1>
        <p>Find your perfect feline friend from our wonderful selection of cats</p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, breed, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <p>Loading adoptable cats...</p>
        </div>
      )}

      {!loading && error && (
        <div className="no-results">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="pet-grid">
          {filteredCats.map((cat, index) => (
            <div
              key={cat._id}
              className="pet-card pet-card-enter"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="pet-card-header">
                <img src={resolveImageUrl(cat.imageUrl, FALLBACK_IMAGE)} alt={cat.name} />
              </div>
              <div className="pet-info">
                <h3>{cat.name}</h3>
                <div className="pet-details">
                  <div className="detail-item">
                    <FaUser className="detail-icon" />
                    <span>{cat.owner || "FurryNest Shelter"}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{cat.location}</span>
                  </div>
                  <div className="detail-item">
                    <FaPhone className="detail-icon" />
                    <span>{cat.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FaVenusMars className="detail-icon" />
                    <span>{cat.gender}</span>
                  </div>
                  <div className="detail-item">
                    <FaBirthdayCake className="detail-icon" />
                    <span>{cat.age}</span>
                  </div>
                  <div className="detail-item">
                    <FaPaw className="detail-icon" />
                    <span>{cat.breed}</span>
                  </div>
                  <div className="detail-item">
                    <FaUtensils className="detail-icon" />
                    <span>{cat.diet}</span>
                  </div>
                </div>
                <button className="adopt-btn" onClick={() => handleAdoptClick(cat)}>
                  Adopt Me!
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredCats.length === 0 && (
        <div className="no-results">
          <p>No cats found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdoptCat;
