import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { petService } from '../services/petService';
import '../assets/styles/RequestPet.css';

const RequestPet = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog',
    location: '',
    phone: '',
    gender: '',
    age: '',
    breed: '',
    diet: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (image) {
        payload.append('image', image);
      }

      const response = await petService.requestPet(payload);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to submit pet request');
      }

      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to submit pet request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-pet-container">
      <h2>Request to Add a Pet</h2>
      <p className="request-pet-info">
        Fill out this form to request adding a pet for adoption. Our team will review your submission.
      </p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="request-pet-form">
        <div className="form-group">
          <label htmlFor="type">Pet Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">Pet Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="diet">Diet</label>
          <textarea
            id="diet"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Pet Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default RequestPet;