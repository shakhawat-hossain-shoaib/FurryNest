import React, { useEffect, useState } from "react";
import { FaBoxOpen, FaEdit, FaPlus, FaSave, FaSearch, FaTrash } from "react-icons/fa";
import { shopService } from "../services/shopService";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import "../assets/styles/AdminShop.css";

const categories = ["Dog Food", "Cat Food", "Pet Toys"];
const fallbackImage = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80";

const emptyForm = {
  name: "",
  category: "Dog Food",
  price: "",
  description: "",
  stockQuantity: "",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  const loadProducts = async (term = "") => {
    try {
      setLoading(true);
      const data = await shopService.getProducts("", term);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setEditingId("");
    setForm(emptyForm);
    setImageFile(null);
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      if (imageFile) {
        payload.append("image", imageFile);
      }

      if (editingId) {
        await shopService.updateProduct(editingId, payload);
      } else {
        await shopService.createProduct(payload);
      }

      resetForm();
      await loadProducts(search);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      category: product.category || "Dog Food",
      price: String(product.price ?? ""),
      description: product.description || "",
      stockQuantity: String(product.stockQuantity ?? ""),
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await shopService.deleteProduct(productId);
      await loadProducts(search);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete product");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await loadProducts(search);
  };

  return (
    <div className="admin-shop-page">
      <div className="admin-shop-shell">
        <div className="admin-shop-hero">
          <div>
            <p className="admin-shop-kicker">Marketplace Control</p>
            <h1>Products</h1>
            <p>Manage stock, upload product images, and keep the storefront current.</p>
          </div>
          <div className="admin-shop-badge">
            <FaBoxOpen />
            <span>{products.length} items</span>
          </div>
        </div>

        <div className="admin-shop-grid">
          <section className="admin-shop-panel admin-shop-form-panel">
            <div className="panel-header">
              <h2>{editingId ? "Edit product" : "Add new product"}</h2>
              <button type="button" className="ghost-button" onClick={resetForm}>
                <FaPlus /> New form
              </button>
            </div>

            <form className="admin-shop-form" onSubmit={submitProduct}>
              <label>
                Product name
                <input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required />
              </label>
              <label>
                Category
                <select value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Price
                <input type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm((prev) => ({ ...prev, price: event.target.value }))} required />
              </label>
              <label>
                Stock quantity
                <input type="number" min="0" step="1" value={form.stockQuantity} onChange={(event) => setForm((prev) => ({ ...prev, stockQuantity: event.target.value }))} required />
              </label>
              <label className="full-width">
                Description
                <textarea value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} required />
              </label>
              <label className="full-width">
                Product image
                <input type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
              </label>
              <button type="submit" className="primary-button full-width" disabled={submitting}>
                {editingId ? <FaSave /> : <FaPlus />}
                <span>{submitting ? "Saving..." : editingId ? "Update product" : "Create product"}</span>
              </button>
            </form>
          </section>

          <section className="admin-shop-panel">
            <div className="panel-header">
              <h2>Inventory</h2>
              <form className="admin-shop-search" onSubmit={handleSearch}>
                <FaSearch />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" />
              </form>
            </div>

            {loading ? (
              <p className="admin-shop-empty">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="admin-shop-empty">No products found.</p>
            ) : (
              <div className="admin-product-list">
                {products.map((product) => (
                  <article key={product._id} className="admin-product-card">
                    <img src={resolveImageUrl(product.imageUrl, fallbackImage)} alt={product.name} />
                    <div className="admin-product-content">
                      <div className="admin-product-topline">
                        <span className="category-chip">{product.category}</span>
                        <span className={`stock-chip ${product.stockQuantity < 10 ? "low" : ""}`}>{product.stockQuantity} in stock</span>
                      </div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="admin-product-footer">
                        <strong>${Number(product.price || 0).toFixed(2)}</strong>
                        <div className="admin-product-actions">
                          <button type="button" className="ghost-button" onClick={() => handleEdit(product)}>
                            <FaEdit /> Edit
                          </button>
                          <button type="button" className="danger-button" onClick={() => handleDelete(product._id)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;