import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaPhone,
  FaVenusMars,
  FaBirthdayCake,
  FaPaw,
  FaUtensils,
  FaArrowLeft,
  FaUser,
} from "react-icons/fa";
import "../style/AdoptCat.css";
import AddedPets from "../components/AddedPets";

const cats = [
  {
    id: 1,
    name: "Whiskers",
    location: "Downtown Cat Haven",
    address: "123 Main St",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    age: "2 years",
    breed: "Persian",
    food: "Royal Canin Persian",
    img: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=400&h=400&fit=crop&crop=face",
    description: "Whiskers is a beautiful Persian cat with long, luxurious fur. He's very calm and loves to be brushed and pampered.",
    owner: "Maria Garcia",
  },
  {
    id: 2,
    name: "Luna",
    location: "Westside Feline Rescue",
    address: "456 Oak Ave",
    phone: "+1 (555) 234-5678",
    gender: "Female",
    age: "1 year",
    breed: "Siamese",
    food: "Purina Pro Plan",
    img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop&crop=face",
    description: "Luna is a vocal and intelligent Siamese cat. She loves to talk and would make a great companion for someone who enjoys interactive pets.",
    owner: "Daniel Brown",
  },
  {
    id: 3,
    name: "Shadow",
    location: "Northside Cat Care",
    address: "789 Pine Rd",
    phone: "+1 (555) 345-6789",
    gender: "Male",
    age: "4 years",
    breed: "Maine Coon",
    food: "Hill's Science Diet",
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=crop&crop=face",
    description: "Shadow is a large and gentle Maine Coon. He's very friendly and loves to follow his humans around the house.",
    owner: "Patricia Taylor",
  },
  {
    id: 4,
    name: "Mittens",
    location: "Eastside Pet Haven",
    address: "321 Elm St",
    phone: "+1 (555) 456-7890",
    gender: "Female",
    age: "3 years",
    breed: "Ragdoll",
    food: "Blue Buffalo",
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop&crop=face",
    description: "Mittens is a sweet Ragdoll cat who loves to be held and cuddled. She's very relaxed and gets along well with other pets.",
    owner: "Kevin Miller",
  },
  {
    id: 5,
    name: "Tiger",
    location: "Central Cat Rescue",
    address: "654 Maple ",
    phone: "+1 (555) 567-8901",
    gender: "Male",
    age: "5 years",
    breed: "Tabby",
    food: "Eukanuba Adult",
    img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=400&fit=crop&crop=face",
    description: "Tiger is a playful tabby cat who loves to chase toys and climb cat trees. He's very active and would be perfect for an energetic household.",
    owner: "Nicole Clark",
  },
  {
    id: 6,
    name: "Princess",
    location: "Southside Animal Shelter",
    address: "987 Cedar Ln",
    phone: "+1 (555) 678-9012",
    gender: "Female",
    age: "6 years",
    breed: "British Shorthair",
    food: "Nutro Natural Choice",
    img: "https://images.unsplash.com/photo-1472491235688-bdc81a63246e?w=400&h=400&fit=crop&crop=face",
    description: "Princess is a dignified British Shorthair who enjoys quiet time and gentle affection. She's perfect for a calm, peaceful home.",
    owner: "Steven Hall",
  },
  {
    id: 7,
    name: "Oliver",
    location: "Downtown Cat Rescue",
    address: "555 Meow Ave",
    phone: "+1 (555) 789-0123",
    gender: "Male",
    age: "2 years",
    breed: "Orange Tabby",
    food: "Royal Canin Indoor",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face",
    description: "Oliver is a friendly orange tabby who loves to cuddle and play. He's very social and gets along well with other pets.",
    owner: "Rachel Green",
  },
  {
    id: 8,
    name: "Lily",
    location: "Westside Feline Care",
    address: "777 Purr Way",
    phone: "+1 (555) 890-1234",
    gender: "Female",
    age: "1 year",
    breed: "Calico",
    food: "Hill's Science Diet",
    img: "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=400&h=400&fit=crop&crop=face",
    description: "Lily is a beautiful calico cat with a sweet personality. She's playful and loves to chase toys around the house.",
    owner: "Thomas Allen",
  }
];

const AdoptCat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCats = cats.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdoptClick = (cat) => {
    navigate(`/pet/cat/${cat.id}`);
  };

  return (
    <div className="adopt-page">
      <div className="back-button">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>

      <div className="adopt-header">
        <h1>Adopt a Cat</h1>
        <p>
          Find your perfect feline friend from our wonderful selection of cats
        </p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, breed, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="pet-grid">
        {filteredCats.map((cat) => (
          <div key={cat.id} className="pet-card">
            <div className="pet-card-header">
              <img src={cat.img} alt={cat.name} />
            </div>
            <div className="pet-info">
              <h3>{cat.name}</h3>
              <div className="pet-details">
                <div className="detail-item">
                  <FaUser className="detail-icon" />
                  <span>{cat.owner}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span>{cat.address}</span>
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
                  <span>{cat.food}</span>
                </div>
              </div>
              <button
                className="adopt-btn"
                onClick={() => handleAdoptClick(cat)}
              >
                Adopt Me!
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCats.length === 0 && (
        <div className="no-results">
          <p>No cats found matching your search criteria.</p>
        </div>
      )}
      <AddedPets petType="cat" />
    </div>
  );
};

export default AdoptCat;
