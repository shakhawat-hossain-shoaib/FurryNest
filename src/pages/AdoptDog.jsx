import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaPhone, FaVenusMars, FaBirthdayCake, FaPaw, FaUtensils, FaArrowLeft, FaUser } from "react-icons/fa";
import "../style/AdoptDog.css";

const dogs = [
  {
    id: 1,
    name: "Max",
    location: "Downtown Shelter",
    address: "123 Main St",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    age: "3 years",
    breed: "Golden Retriever",
    food: "Royal Canin Adult",
    img: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    description: "Max is a friendly and energetic Golden Retriever who loves playing fetch and going for long walks. He's great with children and other dogs.",
    owner: "Sarah Johnson"
  },
  {
    id: 2,
    name: "Luna",
    location: "Westside Rescue",
    address: "456 Oak Ave",
    phone: "+1 (555) 234-5678",
    gender: "Female",
    age: "2 years",
    breed: "Husky",
    food: "Purina Pro Plan",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    description: "Luna is a beautiful Husky with striking blue eyes. She's very active and would love an owner who enjoys outdoor activities and hiking.",
    owner: "Michael Chen"
  },
  {
    id: 3,
    name: "Buddy",
    location: "Northside Animal Care",
    address: "789 Pine Rd",
    phone: "+1 (555) 345-6789",
    gender: "Male",
    age: "5 years",
    breed: "Labrador Retriever",
    food: "Hill's Science Diet",
    img: "https://plus.unsplash.com/premium_photo-1723708863829-7a079bbcc149?w=400&h=400&fit=facearea&facepad=4",
    description: "Buddy is a gentle and loyal Labrador who loves swimming and retrieving. He's perfect for families and gets along well with everyone.",
    owner: "David Rodriguez"
  },
  {
    id: 4,
    name: "Daisy",
    location: "Eastside Pet Haven",
    address: "321 Elm St",
    phone: "+1 (555) 456-7890",
    gender: "Female",
    age: "1 year",
    breed: "Beagle",
    food: "Blue Buffalo",
    img: "https://plus.unsplash.com/premium_photo-1723708879915-d54e5fb31aca?w=400&h=400&fit=facearea&facepad=4",
    description: "Daisy is a playful Beagle puppy who loves to explore and sniff around. She's very curious and would make a great companion for active families.",
    owner: "Emily Thompson"
  },
  {
    id: 5,
    name: "Rocky",
    location: "Central Dog Rescue",
    address: "654 Maple Dr",
    phone: "+1 (555) 567-8901",
    gender: "Male",
    age: "4 years",
    breed: "German Shepherd",
    food: "Eukanuba Adult",
    img: "https://images.unsplash.com/photo-1537815749002-de6a533c64db?w=400&h=400&fit=facearea&facepad=4",
    description: "Rocky is a smart and protective German Shepherd. He's well-trained and would be perfect for someone looking for a loyal guard dog.",
    owner: "James Wilson"
  },
  {
    id: 6,
    name: "Bella",
    location: "Southside Animal Shelter",
    address: "987 Cedar Ln",
    phone: "+1 (555) 678-9012",
    gender: "Female",
    age: "6 years",
    breed: "Border Collie",
    food: "Nutro Natural Choice",
    img: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    description: "Bella is an intelligent Border Collie who loves to herd and play. She's very energetic and needs an active owner who can keep up with her.",
    owner: "Lisa Anderson"
  },
  {
    id: 7,
    name: "Charlie",
    location: "Downtown Pet Rescue",
    address: "555 Bark Ave",
    phone: "+1 (555) 789-0123",
    gender: "Male",
    age: "2 years",
    breed: "Poodle",
    food: "Royal Canin Poodle",
    img: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=400&fit=facearea&facepad=4",
    description: "Charlie is a smart and elegant Poodle who loves to learn new tricks. He's hypoallergenic and perfect for families with allergies.",
    owner: "Robert Martinez"
  },
  {
    id: 8,
    name: "Sophie",
    location: "Westside Canine Care",
    address: "777 Wag Way",
    phone: "+1 (555) 890-1234",
    gender: "Female",
    age: "4 years",
    breed: "Corgi",
    food: "Hill's Science Diet",
    img: "https://images.unsplash.com/photo-1575859431774-2e57ed632664?w=400&h=400&fit=facearea&facepad=4",
    description: "Sophie is a charming Corgi with a big personality. She loves to play and would make a wonderful companion for any family.",
    owner: "Jennifer Davis"
  }
];

const AdoptDog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdoptClick = (dog) => {
    navigate(`/pet/dog/${dog.id}`);
  };

  return (
    <div className="adopt-page">
      <div className="back-button">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
      <div className="adopt-header">
        <h1>Adopt a Dog</h1>
        <p>Find your perfect furry companion from our wonderful selection of dogs</p>
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
        {filteredDogs.map((dog) => (
          <div key={dog.id} className="pet-card">
            <div className="pet-card-header">
              <img src={dog.img} alt={dog.name} />
            </div>
            <div className="pet-info">
              <h3>{dog.name}</h3>
              <div className="pet-details">
                <div className="detail-item">
                  <FaUser className="detail-icon" />
                  <span>{dog.owner}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span>{dog.address}</span>
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
                  <span>{dog.food}</span>
                </div>
              </div>
              <button 
                className="adopt-btn"
                onClick={() => handleAdoptClick(dog)}
              >
                Adopt Me!
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDogs.length === 0 && (
        <div className="no-results">
          <p>No dogs found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdoptDog;