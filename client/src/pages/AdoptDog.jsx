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
import "../assets/styles/AdoptDog.css";
import { petService } from "../services/petService";
import { resolveImageUrl } from "../utils/resolveImageUrl";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4";

const AdoptDog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchDogs = async () => {
      try {
        setLoading(true);
        const data = await petService.getPets("dog");
        if (mounted) {
          setDogs(Array.isArray(data) ? data : []);
          setError("");
        }
      } catch (fetchError) {
        if (mounted) {
          setError(fetchError?.response?.data?.message || "Failed to load dogs");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchDogs();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredDogs = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return dogs;

    return dogs.filter((dog) =>
      [dog.name, dog.breed, dog.location, dog.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [dogs, searchTerm]);

  const handleAdoptClick = (dog) => {
    navigate(`/pet/dog/${dog._id}`);
  };

  return (
    <div className="adopt-page">
      <div className="adopt-header">
        <h1>Adopt a Dog</h1>
        <p>Find your perfect furry companion from our wonderful selection of dogs</p>
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
          <p>Loading adoptable dogs...</p>
        </div>
      )}

      {!loading && error && (
        <div className="no-results">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="pet-grid">
          {filteredDogs.map((dog, index) => (
            <div
              key={dog._id}
              className="pet-card pet-card-enter"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <div className="pet-card-header">
                <img src={resolveImageUrl(dog.imageUrl, FALLBACK_IMAGE)} alt={dog.name} />
              </div>
              <div className="pet-info">
                <h3>{dog.name}</h3>
                <div className="pet-details">
                  <div className="detail-item">
                    <FaUser className="detail-icon" />
                    <span>{dog.owner || "FurryNest Shelter"}</span>
                  </div>
                  <div className="detail-item">
                    <FaMapMarkerAlt className="detail-icon" />
                    <span>{dog.location}</span>
                  </div>
                  <div className="detail-item">
                    <FaPhone className="detail-icon" />
                    <span>{dog.phone}</span>
                  </div>
                  <div className="detail-item">
                    <FaVenusMars className="detail-icon" />
                    <span>{dog.gender}</span>
                  </div>
                  <div className="detail-item">
                    <FaBirthdayCake className="detail-icon" />
                    <span>{dog.age}</span>
                  </div>
                  <div className="detail-item">
                    <FaPaw className="detail-icon" />
                    <span>{dog.breed}</span>
                  </div>
                  <div className="detail-item">
                    <FaUtensils className="detail-icon" />
                    <span>{dog.diet}</span>
                  </div>
                </div>
                <button className="adopt-btn" onClick={() => handleAdoptClick(dog)}>
                  Adopt Me!
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && filteredDogs.length === 0 && (
        <div className="no-results">
          <p>No dogs found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdoptDog;
