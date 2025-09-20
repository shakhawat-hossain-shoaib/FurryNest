import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaPhone, FaVenusMars, FaBirthdayCake, FaPaw, FaUtensils } from 'react-icons/fa';
import "../style/AdoptDog.css";
import "../style/AddedPets.css"; // We'll use the same styling as AdoptDog

const AddedPets = ({ petType }) => {
  const [pets, setPets] = useState([]);
  const [showAddedPets, setShowAddedPets] = useState(false);

  const fetchPets = async () => {
    try {
      const response = await axios.get(`/api/pets?type=${petType}`);
      setPets(response.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    if (showAddedPets) {
      fetchPets();
    }
  }, [showAddedPets, petType]);

  if (!showAddedPets) {
    return (
      <div className="added-pets-container">
        <div className="view-button-wrapper">
          <button 
            className="view-all-button"
            onClick={() => setShowAddedPets(true)}
          >
            View All Added {petType}s
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="added-pets-section">
      <div className="added-pets-container">
        <div className="view-button-wrapper">
          <button 
            className="view-all-button"
            onClick={() => setShowAddedPets(false)}
          >
            Hide Added {petType}s
          </button>
        </div>
      </div>
      <div className="pets-grid">
        {pets.map((pet) => (
          <div key={pet._id} className="pet-card">
            <div className="pet-image">
              {pet.imageUrl && (
                <img src={pet.imageUrl} alt={pet.name} />
              )}
            </div>
            <div className="pet-info">
              <h3>{pet.name}</h3>
              <div className="info-item">
                <FaMapMarkerAlt />
                <span>{pet.location}</span>
              </div>
              <div className="info-item">
                <FaPhone />
                <span>{pet.phone}</span>
              </div>
              <div className="info-item">
                <FaVenusMars />
                <span>{pet.gender}</span>
              </div>
              <div className="info-item">
                <FaBirthdayCake />
                <span>{pet.age}</span>
              </div>
              <div className="info-item">
                <FaPaw />
                <span>{pet.breed}</span>
              </div>
              <div className="info-item">
                <FaUtensils />
                <span>{pet.diet}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddedPets;