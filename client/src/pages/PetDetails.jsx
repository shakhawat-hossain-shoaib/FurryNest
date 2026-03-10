import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/styles/PetDetails.css";
import {
  FaArrowLeft,
  FaPhone,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaPaw,
  FaUtensils,
  FaUser,
} from "react-icons/fa";
import { petService } from "../services/petService";
import { resolveImageUrl } from "../utils/resolveImageUrl";

const FALLBACK_DOG =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4";
const FALLBACK_CAT =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face";

const PetDetails = () => {
  const { type, id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchPet = async () => {
      try {
        setLoading(true);
        const data = await petService.getPetById(id);
        if (mounted) {
          setPet(data);
          setError("");
        }
      } catch (fetchError) {
        if (mounted) {
          setError(fetchError?.response?.data?.message || "Unable to load pet details");
          setPet(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPet();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="pet-details-page">
        <div className="pet-not-found fade-in">
          <h1>Loading...</h1>
          <p>Fetching pet details from the shelter database.</p>
        </div>
      </div>
    );
  }

  if (error || !pet) {
    return (
      <div className="pet-details-page">
        <div className="back-button">
          <Link to={`/adopt-${type}`} className="back-link">
            <FaArrowLeft /> Back to {type === "dog" ? "Dogs" : "Cats"}
          </Link>
        </div>
        <div className="pet-not-found fade-in">
          <h1>Pet Not Found</h1>
          <p>{error || "Sorry, the pet you're looking for doesn't exist."}</p>
          <Link to={`/adopt-${type}`} className="primary-btn">
            Browse More Pets
          </Link>
        </div>
      </div>
    );
  }

  const imageSrc = resolveImageUrl(
    pet.imageUrl,
    pet.type === "dog" ? FALLBACK_DOG : FALLBACK_CAT
  );

  return (
    <div className="pet-details-page fade-in">
      <div className="back-button">
        <Link to={`/adopt-${pet.type || type}`} className="back-link">
          <FaArrowLeft /> Back to {(pet.type || type) === "dog" ? "Dogs" : "Cats"}
        </Link>
      </div>

      <div className="pet-details-container">
        <div className="pet-image-section">
          <div className="pet-images-grid">
            <img src={imageSrc} alt={pet.name} className="pet-details-image" />
          </div>
        </div>

        <div className="pet-info-section">
          <h1 className="pet-details-title">{pet.name}</h1>
          <p className="pet-details-description">
            {pet.description || "This lovely pet is looking for a caring forever home."}
          </p>

          <div className="pet-details-grid">
            <div className="detail-item">
              <FaUser className="detail-icon" />
              <div className="detail-content">
                <span className="detail-label">Owner</span>
                <span className="detail-value">{pet.owner || "FurryNest Shelter"}</span>
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
                <span className="detail-label">Diet</span>
                <span className="detail-value">{pet.diet}</span>
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
