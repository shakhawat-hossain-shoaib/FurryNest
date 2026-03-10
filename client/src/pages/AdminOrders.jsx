import React, { useEffect, useState } from "react";
import { FaFilter, FaMoneyBillWave, FaSearch, FaShoppingCart, FaTrash } from "react-icons/fa";
import { shopService } from "../services/shopService";
import "../assets/styles/AdminShop.css";

const statusOptions = ["", "placed", "processing", "completed", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const loadOrders = async (nextStatus = status, nextSearch = search) => {
    try {
      setLoading(true);
      const [orderData, statsData] = await Promise.all([
        shopService.getOrders({ status: nextStatus, search: nextSearch }),
        shopService.getOrderStats(),
      ]);
      setOrders(Array.isArray(orderData) ? orderData : []);
      setStats(statsData);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusUpdate = async (orderId, nextStatus) => {
    try {
      await shopService.updateOrderStatus(orderId, nextStatus);
      await loadOrders();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update order status");
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Delete this order record?")) return;
    try {
      await shopService.deleteOrder(orderId);
      await loadOrders();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to delete order");
    }
  };

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    await loadOrders(status, search);
  };

  return (
    <div className="admin-shop-page orders-page">
      <div className="admin-shop-shell">
        <div className="admin-shop-hero">
          <div>
            <p className="admin-shop-kicker">Marketplace Control</p>
            <h1>Orders</h1>
            <p>Track revenue, process fulfillment, and manage every order from one place.</p>
          </div>
          <div className="admin-shop-badge">
            <FaShoppingCart />
            <span>{stats?.totalOrders || 0} orders</span>
          </div>
        </div>

        <div className="admin-orders-stats">
          <div className="admin-shop-mini-stat">
            <FaShoppingCart />
            <div>
              <strong>{stats?.totalOrders || 0}</strong>
              <span>Total orders</span>
            </div>
          </div>
          <div className="admin-shop-mini-stat">
            <FaMoneyBillWave />
            <div>
              <strong>${Number(stats?.totalRevenue || 0).toFixed(2)}</strong>
              <span>Revenue</span>
            </div>
          </div>
          <div className="admin-shop-mini-stat">
            <FaFilter />
            <div>
              <strong>{stats?.processingOrders || 0}</strong>
              <span>Processing</span>
            </div>
          </div>
          <div className="admin-shop-mini-stat">
            <FaShoppingCart />
            <div>
              <strong>{stats?.lowStockItems || 0}</strong>
              <span>Low stock items</span>
            </div>
          </div>
        </div>

        <section className="admin-shop-panel">
          <div className="panel-header orders-header">
            <h2>Order list</h2>
            <form className="admin-orders-filters" onSubmit={handleFilterSubmit}>
              <div className="admin-shop-search">
                <FaSearch />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer or item" />
              </div>
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option || "all"} value={option}>
                    {option || "All statuses"}
                  </option>
                ))}
              </select>
              <button type="submit" className="primary-button">Apply</button>
            </form>
          </div>

          {loading ? (
            <p className="admin-shop-empty">Loading orders...</p>
          ) : orders.length === 0 ? (
            <p className="admin-shop-empty">No orders found for this filter.</p>
          ) : (
            <div className="admin-orders-list">
              {orders.map((order) => (
                <article key={order._id} className="admin-order-card">
                  <div className="admin-order-head">
                    <div>
                      <h3>{order.customerName}</h3>
                      <p>{order.customerEmail}</p>
                    </div>
                    <span className={`status-chip ${order.status}`}>{order.status}</span>
                  </div>
                  <div className="admin-order-meta">
                    <span>Order ID: {order._id}</span>
                    <span>Payment: {order.paymentStatus}</span>
                    <span>Total: ${Number(order.totalPrice || 0).toFixed(2)}</span>
                  </div>
                  <div className="admin-order-items">
                    {order.items?.map((item) => (
                      <div key={`${order._id}-${item.product}`} className="admin-order-item">
                        <span>{item.name}</span>
                        <span>{item.quantity} x ${Number(item.price || 0).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="admin-order-actions">
                    <select value={order.status} onChange={(event) => handleStatusUpdate(order._id, event.target.value)}>
                      {statusOptions.filter(Boolean).map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    <button type="button" className="danger-button" onClick={() => handleDelete(order._id)}>
                      <FaTrash /> Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminOrders;