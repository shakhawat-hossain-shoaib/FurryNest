import React, { useState, useEffect, useCallback } from 'react';
import { petService } from '../services/petService';
import { FaMapMarkerAlt, FaPhone, FaVenusMars, FaBirthdayCake, FaPaw, FaUtensils } from 'react-icons/fa';
import { resolveImageUrl } from '../utils/resolveImageUrl';
import "../assets/styles/AdoptDog.css";
import "../assets/styles/AddedPets.css"; // We'll use the same styling as AdoptDog

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4";

const AddedPets = ({ petType }) => {
  const [pets, setPets] = useState([]);
  const [showAddedPets, setShowAddedPets] = useState(false);

  const fetchPets = useCallback(async () => {
    try {
      const data = await petService.getPets(petType);
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  }, [petType]);

  useEffect(() => {
    if (showAddedPets) {
      fetchPets();
    }
  }, [fetchPets, showAddedPets]);

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
                <img src={resolveImageUrl(pet.imageUrl, FALLBACK_IMAGE)} alt={pet.name} />
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