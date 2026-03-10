import React, { useState } from "react";
import { petService } from "../services/petService";
import "../assets/styles/Add.css";

const Add = () => {
  const [petType, setPetType] = useState("");
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    address: "",
    owner: "FurryNest Shelter",
    phone: "",
    gender: "",
    age: "",
    breed: "",
    diet: "",
    status: "approved"
  });
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePetType = (type) => {
    setPetType(type);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!petType || !image) {
      setMessage("Please select pet type and upload an image");
      return;
    }
    const data = new FormData();
    data.append("image", image);
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("location", form.location);
    data.append("address", form.address);
    data.append("owner", form.owner);
    data.append("phone", form.phone);
    data.append("gender", form.gender);
    data.append("age", form.age);
    data.append("breed", form.breed);
    data.append("diet", form.diet);
    data.append("status", form.status);
    data.append("type", petType);
    try {
      await petService.addPet(data);
      setMessage("Pet added successfully!");
      setForm({
        name: "",
        description: "",
        location: "",
        address: "",
        owner: "FurryNest Shelter",
        phone: "",
        gender: "",
        age: "",
        breed: "",
        diet: "",
        status: "approved"
      });
      setImage(null);
      setPetType("");
    } catch {
      setMessage("Error uploading pet. Please try again.");
    }
  };

  return (
    <div className="add-pet-page">
      <h2 className="add-title">Add Pets</h2>
      <div className="add-btn-row">
        <button
          className={`add-btn${petType === "dog" ? " selected" : ""}`}
          onClick={() => handlePetType("dog")}
        >
          Add Dog
        </button>
        <button
          className={`add-btn${petType === "cat" ? " selected" : ""}`}
          onClick={() => handlePetType("cat")}
        >
          Add Cat
        </button>
      </div>
      {petType && (
        <form className="add-form" onSubmit={handleSubmit}>
          <div className="add-image-box">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <span className="file-name">{image.name}</span>}
          </div>
          <div className="add-fields">
            {[
              "name",
              "description",
              "location",
              "address",
              "owner",
              "phone",
              "gender",
              "age",
              "breed",
              "diet",
              "status"
            ].map((field) => (
              <div className="add-field-row" key={field}>
                <label className="add-label" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                {field === "status" ? (
                  <select
                    className="add-input"
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="approved">approved</option>
                    <option value="pending">pending</option>
                    <option value="adopted">adopted</option>
                    <option value="rejected">rejected</option>
                  </select>
                ) : field === "description" ? (
                  <textarea
                    className="add-input"
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    required
                  />
                ) : (
                  <input
                    className="add-input"
                    type="text"
                    id={field}
                    name={field}
                    value={form[field]}
                    onChange={handleInputChange}
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
          {message && <div className="add-message">{message}</div>}
        </form>
      )}
    </div>
  );
};

export default Add;
