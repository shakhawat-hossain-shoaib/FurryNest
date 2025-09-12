import React from "react";
import { useParams, Link } from "react-router-dom";
import "../style/PetDetails.css";
import { FaArrowLeft, FaPhone, FaMapMarkerAlt, FaVenusMars, FaBirthdayCake, FaPaw, FaUtensils, FaIdCard, FaBuilding, FaUser } from "react-icons/fa";

// Import the pets data from both components
const dogs = [
  {
    id: 1,
    name: "Max",
    location: "Downtown Shelter",
    address: "123 Main St, Downtown",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    age: "3 years",
    breed: "Golden Retriever",
    food: "Royal Canin Adult",
    img: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#A0E7E5",
    description: "Max is a friendly and energetic Golden Retriever who loves playing fetch and going for long walks. He's great with children and other dogs.",
    owner: "Sarah Johnson",
    rescueOrgNumber: "RO-2024-001",
    petRescueId: "DOG-001"
  },
  {
    id: 2,
    name: "Luna",
    location: "Westside Rescue",
    address: "456 Oak Ave, Westside",
    phone: "+1 (555) 234-5678",
    gender: "Female",
    age: "2 years",
    breed: "Husky",
    food: "Purina Pro Plan",
    img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=facearea&facepad=4",
    color: "#B4D8FD",
    description: "Luna is a beautiful Husky with striking blue eyes. She's very active and would love an owner who enjoys outdoor activities and hiking.",
    owner: "Michael Chen",
    rescueOrgNumber: "RO-2024-002",
    petRescueId: "DOG-002"
  },
  {
    id: 3,
    name: "Buddy",
    location: "Northside Animal Care",
    address: "789 Pine Rd, Northside",
    phone: "+1 (555) 345-6789",
    gender: "Male",
    age: "5 years",
    breed: "Labrador Retriever",
    food: "Hill's Science Diet",
    img: "https://plus.unsplash.com/premium_photo-1723708863829-7a079bbcc149?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#FFF6A1",
    description: "Buddy is a gentle and loyal Labrador who loves swimming and retrieving. He's perfect for families and gets along well with everyone.",
    owner: "David Rodriguez",
    rescueOrgNumber: "RO-2024-003",
    petRescueId: "DOG-003"
  },
  {
    id: 4,
    name: "Daisy",
    location: "Eastside Pet Haven",
    address: "321 Elm St, Eastside",
    phone: "+1 (555) 456-7890",
    gender: "Female",
    age: "1 year",
    breed: "Beagle",
    food: "Blue Buffalo",
    img: "https://plus.unsplash.com/premium_photo-1723708879915-d54e5fb31aca?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#FDE9F3",
    description: "Daisy is a playful Beagle puppy who loves to explore and sniff around. She's very curious and would make a great companion for active families.",
    owner: "Emily Thompson",
    rescueOrgNumber: "RO-2024-004",
    petRescueId: "DOG-004"
  },
  {
    id: 5,
    name: "Rocky",
    location: "Central Dog Rescue",
    address: "654 Maple Dr, Central",
    phone: "+1 (555) 567-8901",
    gender: "Male",
    age: "4 years",
    breed: "German Shepherd",
    food: "Eukanuba Adult",
    img: "https://images.unsplash.com/photo-1537815749002-de6a533c64db?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#C1FFD7",
    description: "Rocky is a smart and protective German Shepherd. He's well-trained and would be perfect for someone looking for a loyal guard dog.",
    owner: "James Wilson",
    rescueOrgNumber: "RO-2024-005",
    petRescueId: "DOG-005"
  },
  {
    id: 6,
    name: "Bella",
    location: "Southside Animal Shelter",
    address: "987 Cedar Ln, Southside",
    phone: "+1 (555) 678-9012",
    gender: "Female",
    age: "6 years",
    breed: "Border Collie",
    food: "Nutro Natural Choice",
    img: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#F3C4FB",
    description: "Bella is an intelligent Border Collie who loves to herd and play. She's very energetic and needs an active owner who can keep up with her.",
    owner: "Lisa Anderson",
    rescueOrgNumber: "RO-2024-006",
    petRescueId: "DOG-006"
  },
  {
    id: 7,
    name: "Charlie",
    location: "Downtown Pet Rescue",
    address: "555 Bark Ave, Downtown",
    phone: "+1 (555) 789-0123",
    gender: "Male",
    age: "2 years",
    breed: "Poodle",
    food: "Royal Canin Poodle",
    img: "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#FFE5B4",
    description: "Charlie is a smart and elegant Poodle who loves to learn new tricks. He's hypoallergenic and perfect for families with allergies.",
    owner: "Robert Martinez",
    rescueOrgNumber: "RO-2024-007",
    petRescueId: "DOG-007"
  },
  {
    id: 8,
    name: "Sophie",
    location: "Westside Canine Care",
    address: "777 Wag Way, Westside",
    phone: "+1 (555) 890-1234",
    gender: "Female",
    age: "4 years",
    breed: "Corgi",
    food: "Hill's Science Diet",
    img: "https://images.unsplash.com/photo-1575859431774-2e57ed632664?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#E6F3FF",
    description: "Sophie is a charming Corgi with a big personality. She loves to play and would make a wonderful companion for any family.",
    owner: "Jennifer Davis",
    rescueOrgNumber: "RO-2024-008",
    petRescueId: "DOG-008"
  },
  {
    id: 9,
    name: "Cooper",
    location: "Northside Dog Haven",
    address: "888 Paw Street, Northside",
    phone: "+1 (555) 901-2345",
    gender: "Male",
    age: "3 years",
    breed: "Australian Shepherd",
    food: "Purina Pro Plan",
    img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#F0E6FF",
    description: "Cooper is a beautiful Australian Shepherd with striking blue eyes. He's very active and loves outdoor adventures.",
    owner: "Christopher Lee",
    rescueOrgNumber: "RO-2024-009",
    petRescueId: "DOG-009"
  },
  {
    id: 10,
    name: "Jasper",
    location: "Northside Animal Shelter",
    address: "999 Bark Lane, Northside",
    phone: "+1 (555) 987-6543",
    gender: "Male",
    age: "3 years",
    breed: "Golden Retriever",
    food: "Purina Pro Plan",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=facearea&facepad=4",
    color: "#FFE4B5",
    description: "Jasper is a friendly Golden Retriever with a beautiful red collar. He loves to play fetch and is great with children.",
    owner: "Amanda White",
    rescueOrgNumber: "RO-2024-010",
    petRescueId: "DOG-010"
  }
];

const cats = [
  {
    id: 1,
    name: "Whiskers",
    location: "Downtown Cat Haven",
    address: "123 Main St, Downtown",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    age: "2 years",
    breed: "Persian",
    food: "Royal Canin Persian",
    img: "https://plus.unsplash.com/premium_photo-1723514553579-b589437b3b06?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    color: "#A0E7E5",
    description: "Whiskers is a beautiful Persian cat with long, luxurious fur. He's very calm and loves to be brushed and pampered.",
    owner: "Maria Garcia",
    rescueOrgNumber: "RO-2024-101",
    petRescueId: "CAT-001"
  },
  {
    id: 2,
    name: "Luna",
    location: "Westside Feline Rescue",
    address: "456 Oak Ave, Westside",
    phone: "+1 (555) 234-5678",
    gender: "Female",
    age: "1 year",
    breed: "Siamese",
    food: "Purina Pro Plan",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://plus.unsplash.com/premium_photo-1723514553579-b589437b3b06?w=400&h=400&fit=facearea&facepad=4",
    color: "#B4D8FD",
    description: "Luna is a vocal and intelligent Siamese cat. She loves to talk and would make a great companion for someone who enjoys interactive pets.",
    owner: "Daniel Brown",
    rescueOrgNumber: "RO-2024-102",
    petRescueId: "CAT-002"
  },
  {
    id: 3,
    name: "Shadow",
    location: "Northside Cat Care",
    address: "789 Pine Rd, Northside",
    phone: "+1 (555) 345-6789",
    gender: "Male",
    age: "4 years",
    breed: "Maine Coon",
    food: "Hill's Science Diet",
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://plus.unsplash.com/premium_photo-1723514553579-b589437b3b06?w=400&h=400&fit=facearea&facepad=4",
    color: "#FFF6A1",
    description: "Shadow is a large and gentle Maine Coon. He's very friendly and loves to follow his humans around the house.",
    owner: "Patricia Taylor",
    rescueOrgNumber: "RO-2024-103",
    petRescueId: "CAT-003"
  },
  {
    id: 4,
    name: "Mittens",
    location: "Eastside Pet Haven",
    address: "321 Elm St, Eastside",
    phone: "+1 (555) 456-7890",
    gender: "Female",
    age: "3 years",
    breed: "Ragdoll",
    food: "Blue Buffalo",
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    color: "#FDE9F3",
    description: "Mittens is a sweet Ragdoll cat who loves to be held and cuddled. She's very relaxed and gets along well with other pets.",
    owner: "Kevin Miller",
    rescueOrgNumber: "RO-2024-104",
    petRescueId: "CAT-004"
  },
  {
    id: 5,
    name: "Tiger",
    location: "Central Cat Rescue",
    address: "654 Maple Dr, Central",
    phone: "+1 (555) 567-8901",
    gender: "Male",
    age: "5 years",
    breed: "Tabby",
    food: "Eukanuba Adult",
    img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    color: "#C1FFD7",
    description: "Tiger is a playful tabby cat who loves to chase toys and climb cat trees. He's very active and would be perfect for an energetic household.",
    owner: "Nicole Clark",
    rescueOrgNumber: "RO-2024-105",
    petRescueId: "CAT-005"
  },
  {
    id: 6,
    name: "Princess",
    location: "Southside Animal Shelter",
    address: "987 Cedar Ln, Southside",
    phone: "+1 (555) 678-9012",
    gender: "Female",
    age: "6 years",
    breed: "British Shorthair",
    food: "Nutro Natural Choice",
    img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    color: "#F3C4FB",
    description: "Princess is a dignified British Shorthair who enjoys quiet time and gentle affection. She's perfect for a calm, peaceful home.",
    owner: "Steven Hall",
    rescueOrgNumber: "RO-2024-106",
    petRescueId: "CAT-006"
  },
  {
    id: 7,
    name: "Oliver",
    location: "Downtown Cat Rescue",
    address: "555 Meow Ave, Downtown",
    phone: "+1 (555) 789-0123",
    gender: "Male",
    age: "2 years",
    breed: "Orange Tabby",
    food: "Royal Canin Indoor",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://plus.unsplash.com/premium_photo-1723514553579-b589437b3b06?w=400&h=400&fit=facearea&facepad=4",
    color: "#FFE5B4",
    description: "Oliver is a friendly orange tabby who loves to cuddle and play. He's very social and gets along well with other pets.",
    owner: "Rachel Green",
    rescueOrgNumber: "RO-2024-107",
    petRescueId: "CAT-007"
  },
  {
    id: 8,
    name: "Lily",
    location: "Westside Feline Care",
    address: "777 Purr Way, Westside",
    phone: "+1 (555) 890-1234",
    gender: "Female",
    age: "1 year",
    breed: "Calico",
    food: "Hill's Science Diet",
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://plus.unsplash.com/premium_photo-1723514553579-b589437b3b06?w=400&h=400&fit=facearea&facepad=4",
    color: "#E6F3FF",
    description: "Lily is a beautiful calico cat with a sweet personality. She's playful and loves to chase toys around the house.",
    owner: "Thomas Allen",
    rescueOrgNumber: "RO-2024-108",
    petRescueId: "CAT-008"
  },
  {
    id: 9,
    name: "Simba",
    location: "Northside Cat Haven",
    address: "888 Whisker Street, Northside",
    phone: "+1 (555) 901-2345",
    gender: "Male",
    age: "3 years",
    breed: "Bengal",
    food: "Purina Pro Plan",
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    color: "#F0E6FF",
    description: "Simba is an exotic Bengal cat with stunning markings. He's very active and loves to climb and explore.",
    owner: "Jessica Moore",
    rescueOrgNumber: "RO-2024-109",
    petRescueId: "CAT-009"
  },
  {
    id: 10,
    name: "Nala",
    location: "Southside Cat Sanctuary",
    address: "777 Purr Place, Southside",
    phone: "+1 (555) 876-5432",
    gender: "Female",
    age: "2 years",
    breed: "Russian Blue",
    food: "Royal Canin Indoor",
    img: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&h=400&fit=facearea&facepad=4",
    img2: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=facearea&facepad=4",
    img3: "https://plus.unsplash.com/premium_photo-1723514553579-b589437b3b06?w=400&h=400&fit=facearea&facepad=4",
    color: "#E6F3FF",
    description: "Nala is a graceful Russian Blue with silvery fur and green eyes. She's quiet and elegant, perfect for a peaceful home.",
    owner: "Andrew Scott",
    rescueOrgNumber: "RO-2024-110",
    petRescueId: "CAT-010"
  }
];

const PetDetails = () => {
  const { type, id } = useParams();
  const pets = type === 'dog' ? dogs : cats;
  const pet = pets.find(p => p.id === parseInt(id));

  if (!pet) {
    return (
      <div className="pet-details-page">
        <div className="back-button">
          <Link to={`/adopt-${type}`} className="back-link">
            <FaArrowLeft /> Back to {type === 'dog' ? 'Dogs' : 'Cats'}
          </Link>
        </div>
        <div className="pet-not-found">
          <h1>Pet Not Found</h1>
          <p>Sorry, the pet you're looking for doesn't exist.</p>
          <Link to={`/adopt-${type}`} className="primary-btn">Browse More Pets</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-details-page">
      <div className="back-button">
        <Link to={`/adopt-${type}`} className="back-link">
          <FaArrowLeft /> Back to {type === 'dog' ? 'Dogs' : 'Cats'}
        </Link>
      </div>

      <div className="pet-details-container">
        <div className="pet-image-section">
          <div className="pet-images-grid">
            <img src={pet.img} alt={`${pet.name} - Photo 1`} className="pet-details-image" />
            <img src={pet.img2} alt={`${pet.name} - Photo 2`} className="pet-details-image" />
            <img src={pet.img3} alt={`${pet.name} - Photo 3`} className="pet-details-image" />
          </div>
        </div>

        <div className="pet-info-section">
          <h1 className="pet-details-title">{pet.name}</h1>
          <p className="pet-details-description">{pet.description}</p>

          <div className="pet-details-grid">
            <div className="detail-item">
              <FaUser className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Owner</span>
                <span className="detail-value">{pet.owner}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Address</span>
                <span className="detail-value">{pet.address}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaMapMarkerAlt className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Location</span>
                <span className="detail-value">{pet.location}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaPhone className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{pet.phone}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaVenusMars className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Gender</span>
                <span className="detail-value">{pet.gender}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaBirthdayCake className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Age</span>
                <span className="detail-value">{pet.age}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaPaw className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Breed</span>
                <span className="detail-value">{pet.breed}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaUtensils className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Food</span>
                <span className="detail-value">{pet.food}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaIdCard className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Pet Rescue ID</span>
                <span className="detail-value">{pet.petRescueId}</span>
              </div>
            </div>

            <div className="detail-item">
              <FaBuilding className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Rescue Organization Number</span>
                <span className="detail-value">{pet.rescueOrgNumber}</span>
              </div>
            </div>
          </div>

          <button className="contact-shelter-btn">
            <FaPhone /> Contact Shelter
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
