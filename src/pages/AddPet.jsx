import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPet = () => {
  const [form, setForm] = useState({
    name: "",
    type: "dog",
    breed: "",
    age: "",
    description: "",
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Cloudinary upload and backend POST
    setTimeout(() => {
      setLoading(false);
      alert("Pet added! (Cloudinary upload and backend integration needed)");
      navigate("/dashboard");
    }, 1200);
  };

  return (
    <div className="add-pet-page" style={{ maxWidth: 500, margin: "40px auto", background: "#fff", borderRadius: 16, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", padding: 32 }}>
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Add New Pet</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Breed</label>
          <input name="breed" value={form.breed} onChange={handleChange} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Age</label>
          <input name="age" value={form.age} onChange={handleChange} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #eee" }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Photo</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} style={{ width: "100%" }} />
          {preview && <img src={preview} alt="Preview" style={{ width: "100%", marginTop: 10, borderRadius: 8 }} />}
        </div>
        <button type="submit" disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 8, background: "linear-gradient(90deg,#667eea,#764ba2)", color: "#fff", fontWeight: 600, fontSize: 18, border: "none", cursor: "pointer" }}>
          {loading ? "Adding..." : "Add Pet"}
        </button>
      </form>
    </div>
  );
};

export default AddPet;
