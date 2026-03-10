import React, { useEffect, useMemo, useState } from "react";
import "../assets/styles/Dashboard.css";
import { FaBoxOpen, FaEdit, FaPaw, FaSave, FaShoppingCart, FaTimes, FaTrash } from "react-icons/fa";
import { GiCat, GiDogHouse } from "react-icons/gi";
import { Link } from "react-router-dom";
import { petService } from "../services/petService";
import { shopService } from "../services/shopService";
import { contactService } from "../services/contactService";
import { resolveImageUrl } from "../utils/resolveImageUrl";

const STATUS_OPTIONS = ["pending", "approved", "adopted", "rejected"];
const CONTACT_STATUS_OPTIONS = ["unread", "read", "responded"];
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=400&fit=facearea&facepad=4";

const emptyEditForm = {
  name: "",
  breed: "",
  age: "",
  description: "",
  location: "",
  phone: "",
  gender: "",
  diet: "",
  owner: "",
  address: "",
  type: "dog",
  status: "pending",
};

const Dashboard = () => {
  const [petCounts, setPetCounts] = useState({
    total: 0,
    dogs: 0,
    cats: 0,
    adoptedDogs: 0,
    adoptedCats: 0,
    adoptedTotal: 0,
    pending: 0,
  });
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState("");
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [editImage, setEditImage] = useState(null);
  const [marketStats, setMarketStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    processingOrders: 0,
    lowStockItems: 0,
  });
  const [contacts, setContacts] = useState([]);
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setContactLoading(true);
      const [allPets, countResponse, orderStats, contactMessages] = await Promise.all([
        petService.getAllPets(),
        petService.getPetCount(),
        shopService.getOrderStats(),
        contactService.getContacts(),
      ]);
      const countData = await countResponse.json();

      setPets(Array.isArray(allPets) ? allPets : []);
      setContacts(Array.isArray(contactMessages) ? contactMessages : []);
      setPetCounts({
        total: countData.total || 0,
        dogs: countData.dogs || 0,
        cats: countData.cats || 0,
        adoptedDogs: countData.adoptedDogs || 0,
        adoptedCats: countData.adoptedCats || 0,
        adoptedTotal: countData.adoptedTotal || 0,
        pending: countData.pending || 0,
      });
      setMarketStats({
        totalOrders: orderStats.totalOrders || 0,
        totalRevenue: orderStats.totalRevenue || 0,
        processingOrders: orderStats.processingOrders || 0,
        lowStockItems: orderStats.lowStockItems || 0,
      });
      setContactError("");
      setError("");
    } catch (fetchError) {
      const errorMessage = fetchError?.response?.data?.message || "Failed to load dashboard data";
      setError(errorMessage);
      setContactError(errorMessage);
    } finally {
      setLoading(false);
      setContactLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredPets = useMemo(() => {
    if (statusFilter === "all") return pets;
    return pets.filter((pet) => pet.status === statusFilter);
  }, [pets, statusFilter]);

  const handleStatusChange = async (petId, nextStatus) => {
    const response = await petService.updatePetStatus(petId, nextStatus);
    if (!response.ok) {
      const data = await response.json();
      alert(data.message || "Failed to update pet status");
      return;
    }
    await fetchDashboardData();
  };

  const handleDelete = async (petId) => {
    const confirmed = window.confirm("Delete this pet record?");
    if (!confirmed) return;

    const response = await petService.deletePet(petId);
    if (!response.ok) {
      const data = await response.json();
      alert(data.message || "Failed to delete pet");
      return;
    }

    if (editingId === petId) {
      setEditingId("");
      setEditForm(emptyEditForm);
      setEditImage(null);
    }

    await fetchDashboardData();
  };

  const startEdit = (pet) => {
    setEditingId(pet._id);
    setEditImage(null);
    setEditForm({
      name: pet.name || "",
      breed: pet.breed || "",
      age: pet.age || "",
      description: pet.description || "",
      location: pet.location || "",
      phone: pet.phone || "",
      gender: pet.gender || "",
      diet: pet.diet || "",
      owner: pet.owner || "",
      address: pet.address || "",
      type: pet.type || "dog",
      status: pet.status || "pending",
    });
  };

  const cancelEdit = () => {
    setEditingId("");
    setEditForm(emptyEditForm);
    setEditImage(null);
  };

  const saveEdit = async (petId) => {
    try {
      const formData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (editImage) {
        formData.append("image", editImage);
      }

      await petService.updatePet(petId, formData);
      cancelEdit();
      await fetchDashboardData();
    } catch (updateError) {
      alert(updateError?.response?.data?.message || "Failed to update pet info");
    }
  };

  const totalRecords = pets.length;

  const formatContactDate = (value) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleString();
  };

  const handleContactStatusChange = async (contactId, nextStatus) => {
    try {
      const result = await contactService.updateContactStatus(contactId, nextStatus);
      if (result?.contact) {
        setContacts((prev) => prev.map((contact) => (contact._id === contactId ? result.contact : contact)));
      }
    } catch (statusError) {
      alert(statusError?.response?.data?.message || "Failed to update contact status");
    }
  };

  const handleDeleteContact = async (contactId) => {
    const confirmed = window.confirm("Delete this contact message?");
    if (!confirmed) return;

    try {
      await contactService.deleteContact(contactId);
      setContacts((prev) => prev.filter((contact) => contact._id !== contactId));
    } catch (deleteError) {
      alert(deleteError?.response?.data?.message || "Failed to delete contact message");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <p className="dashboard-sub">Manage pets dynamically from database records</p>
          </div>
          <Link to="/add" className="action-card" style={{ textDecoration: "none" }}>
            Add New Pet
          </Link>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <FaPaw />
            </div>
            <div className="stat-content">
              <h3>{petCounts.total}</h3>
              <p>Available Pets</p>
              <div className="pet-type-details">
                <div className="pet-type-item">
                  <GiDogHouse className="pet-type-icon" />
                  <div className="pet-info">
                    <span className="pet-count">{petCounts.dogs}</span>
                    <span className="pet-label">Dogs</span>
                  </div>
                </div>
                <div className="pet-type-item">
                  <GiCat className="pet-type-icon" />
                  <div className="pet-info">
                    <span className="pet-count">{petCounts.cats}</span>
                    <span className="pet-label">Cats</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaPaw />
            </div>
            <div className="stat-content">
              <h3>{petCounts.adoptedTotal}</h3>
              <p>Adopted Pets</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaPaw />
            </div>
            <div className="stat-content">
              <h3>{petCounts.pending}</h3>
              <p>Pending Review</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingCart />
            </div>
            <div className="stat-content">
              <h3>{marketStats.totalOrders}</h3>
              <p>Shop Orders</p>
              <div className="market-stat-meta">Revenue ${Number(marketStats.totalRevenue || 0).toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Marketplace</h3>
          <div className="market-overview-grid">
            <div className="market-summary-card">
              <div>
                <span className="market-summary-label">Orders in progress</span>
                <strong>{marketStats.processingOrders}</strong>
              </div>
              <FaShoppingCart />
            </div>
            <div className="market-summary-card">
              <div>
                <span className="market-summary-label">Low stock alerts</span>
                <strong>{marketStats.lowStockItems}</strong>
              </div>
              <FaBoxOpen />
            </div>
            <Link to="/admin/products" className="market-link-card">
              <FaBoxOpen />
              <div>
                <strong>Manage Products</strong>
                <span>Add items, upload images, update stock</span>
              </div>
            </Link>
            <Link to="/admin/orders" className="market-link-card">
              <FaShoppingCart />
              <div>
                <strong>Manage Orders</strong>
                <span>Filter orders and update fulfillment status</span>
              </div>
            </Link>
          </div>
        </div>

        <div className="dashboard-section">
          <h3>Pet Management</h3>
          <div className="pet-filter-bar">
            <label htmlFor="status-filter" style={{ marginRight: "0.5rem" }}>
              Filter by status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pet-filter-select"
            >
              <option value="all">All</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {loading && <div className="pets-loading">Loading pets...</div>}
          {!loading && error && <div className="volunteers-error">{error}</div>}

          {!loading && !error && filteredPets.length === 0 && (
            <div className="pets-empty">No pets found for this filter.</div>
          )}

          {!loading && !error && filteredPets.length > 0 && (
            <div className="pet-reviews-grid">
              {filteredPets.map((pet) => (
                <div key={pet._id} className="pet-review-card">
                  {pet.imageUrl && (
                    <div className="pet-review-image">
                      <img src={resolveImageUrl(pet.imageUrl, FALLBACK_IMAGE)} alt={pet.name} />
                    </div>
                  )}

                  <div className="pet-review-content">
                    {editingId === pet._id ? (
                      <>
                        <div className="pet-review-details pet-edit-form">
                          <input className="pet-edit-input" value={editForm.name} onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Name" />
                          <input className="pet-edit-input" value={editForm.breed} onChange={(e) => setEditForm((prev) => ({ ...prev, breed: e.target.value }))} placeholder="Breed" />
                          <input className="pet-edit-input" value={editForm.age} onChange={(e) => setEditForm((prev) => ({ ...prev, age: e.target.value }))} placeholder="Age" />
                          <input className="pet-edit-input" value={editForm.gender} onChange={(e) => setEditForm((prev) => ({ ...prev, gender: e.target.value }))} placeholder="Gender" />
                          <input className="pet-edit-input" value={editForm.location} onChange={(e) => setEditForm((prev) => ({ ...prev, location: e.target.value }))} placeholder="Location" />
                          <input className="pet-edit-input" value={editForm.phone} onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="Phone" />
                          <input className="pet-edit-input" value={editForm.diet} onChange={(e) => setEditForm((prev) => ({ ...prev, diet: e.target.value }))} placeholder="Diet" />
                          <input className="pet-edit-input" value={editForm.owner} onChange={(e) => setEditForm((prev) => ({ ...prev, owner: e.target.value }))} placeholder="Owner" />
                          <input className="pet-edit-input" value={editForm.address} onChange={(e) => setEditForm((prev) => ({ ...prev, address: e.target.value }))} placeholder="Address" />
                          <textarea className="pet-edit-input pet-edit-textarea" value={editForm.description} onChange={(e) => setEditForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="Description" />
                          <select className="pet-edit-input" value={editForm.type} onChange={(e) => setEditForm((prev) => ({ ...prev, type: e.target.value }))}>
                            <option value="dog">dog</option>
                            <option value="cat">cat</option>
                          </select>
                          <select className="pet-edit-input" value={editForm.status} onChange={(e) => setEditForm((prev) => ({ ...prev, status: e.target.value }))}>
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                          <input className="pet-edit-file" type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files?.[0] || null)} />
                        </div>
                        <div className="pet-review-actions pet-edit-actions">
                          <button className="approve-button" onClick={() => saveEdit(pet._id)}>
                            <FaSave /> Save
                          </button>
                          <button className="reject-button" onClick={cancelEdit}>
                            <FaTimes /> Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4>{pet.name}</h4>
                        <div className="pet-review-details">
                          <p><strong>Type:</strong> {pet.type}</p>
                          <p><strong>Status:</strong> {pet.status}</p>
                          <p><strong>Breed:</strong> {pet.breed}</p>
                          <p><strong>Age:</strong> {pet.age}</p>
                          <p><strong>Location:</strong> {pet.location}</p>
                          <p><strong>Phone:</strong> {pet.phone}</p>
                          <p><strong>Description:</strong> {pet.description || "N/A"}</p>
                        </div>

                        <div className="pet-review-actions pet-status-actions">
                          {STATUS_OPTIONS.map((status) => (
                            <button
                              key={status}
                              className={status === "approved" ? "approve-button" : "reject-button"}
                              onClick={() => handleStatusChange(pet._id, status)}
                              disabled={pet.status === status}
                              style={{ opacity: pet.status === status ? 0.6 : 1 }}
                            >
                              {status}
                            </button>
                          ))}
                        </div>

                        <div className="pet-review-actions">
                          <button className="approve-button" onClick={() => startEdit(pet)}>
                            <FaEdit /> Edit
                          </button>
                          <button className="reject-button" onClick={() => handleDelete(pet._id)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h3>Contact Messages</h3>
          {contactLoading && <div className="pets-loading">Loading contact messages...</div>}
          {!contactLoading && contactError && <div className="volunteers-error">{contactError}</div>}

          {!contactLoading && !contactError && contacts.length === 0 && (
            <div className="pets-empty">No contact messages found.</div>
          )}

          {!contactLoading && !contactError && contacts.length > 0 && (
            <div className="contact-messages-grid">
              {contacts.map((contact) => (
                <div key={contact._id} className="contact-message-card">
                  <div className="contact-message-header">
                    <div>
                      <h4>{contact.subject}</h4>
                      <p>
                        <strong>{contact.name}</strong> ({contact.email})
                      </p>
                    </div>
                    <span className={`contact-status-badge status-${contact.status}`}>{contact.status}</span>
                  </div>

                  <p className="contact-message-text">{contact.message}</p>
                  <p className="contact-message-date">Received: {formatContactDate(contact.createdAt)}</p>

                  <div className="contact-actions-row">
                    <select
                      value={contact.status}
                      onChange={(event) => handleContactStatusChange(contact._id, event.target.value)}
                      className="contact-status-select"
                    >
                      {CONTACT_STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button className="reject-button" onClick={() => handleDeleteContact(contact._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
