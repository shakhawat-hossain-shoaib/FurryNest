import React, { useEffect, useMemo, useState } from "react";
import { FaCheck, FaShoppingBag, FaStar, FaTrash } from "react-icons/fa";
import { GiDogHouse, GiCat, GiTennisBall } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { shopService } from "../services/shopService";
import { useAuth } from "../context/useAuth";
import { resolveImageUrl } from "../utils/resolveImageUrl";
import "../assets/styles/Shop.css";

const categoryLabelMap = {
  "": "All Goodies",
  "Dog Food": "Tail-Wagging Treats",
  "Cat Food": "Purr-fect Meals",
  "Pet Toys": "Playtime Fun",
};

const fallbackByCategory = {
  "Dog Food":
    "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?auto=format&fit=crop&w=800&q=80",
  "Cat Food":
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
  "Pet Toys":
    "https://images.unsplash.com/photo-1546015028-7fd8981fb081?auto=format&fit=crop&w=800&q=80",
};

const getSessionId = () => {
  const key = "furrynest_cart_session";
  const existing = localStorage.getItem(key);
  if (existing) return existing;

  const generated = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem(key, generated);
  return generated;
};

const normalizeProduct = (product) => ({
  _id: product._id,
  name: product.name,
  category: product.category,
  price: product.price,
  rating: Number(product.rating || 0),
  stockQuantity: Number.isFinite(Number(product.stockQuantity)) ? Number(product.stockQuantity) : null,
  description: product.description,
  image: product.imageUrl || fallbackByCategory[product.category],
});

const normalizeCartItem = (item) => ({
  _id: item._id,
  productId: item.product?._id,
  name: item.product?.name || "Unknown product",
  category: item.product?.category || "Pet Toys",
  price: Number(item.product?.price || 0),
  quantity: Number(item.quantity || 1),
});

const Shop = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [addingProductId, setAddingProductId] = useState("");
  const [addedProductId, setAddedProductId] = useState("");
  const [cartBump, setCartBump] = useState(false);

  const sessionId = useMemo(() => getSessionId(), []);

  const fetchProducts = async (category = "") => {
    setLoadingProducts(true);
    try {
      const data = await shopService.getProducts(category);
      setProducts(data.map(normalizeProduct));
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCart = async () => {
    setLoadingCart(true);
    try {
      const data = await shopService.getCart(sessionId);
      setCart(data.map(normalizeCartItem));
    } catch (error) {
      console.error("Failed to fetch cart", error);
      setCart([]);
    } finally {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    fetchCart();
  }, [sessionId]);

  const addToCart = async (product) => {
    if (addingProductId === product._id || product.stockQuantity === 0) return;

    setAddingProductId(product._id);
    try {
      await shopService.addToCart({
        sessionId,
        productId: product._id,
        quantity: 1,
      });
      await fetchCart();
      setAddedProductId(product._id);
      setCartBump(true);
      window.setTimeout(() => setAddedProductId(""), 900);
      window.setTimeout(() => setCartBump(false), 420);
    } catch (error) {
      console.error("Failed to add item to cart", error);
      alert("Could not add item to cart. Please try again.");
    } finally {
      setAddingProductId("");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await shopService.removeFromCart(itemId);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      await shopService.updateCartQuantity({ itemId, quantity: newQuantity });
      await fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!cart.length) return;

    if (!isAuthenticated || isAdmin) {
      alert("Please sign in with a customer account to place an order.");
      navigate("/signin");
      return;
    }

    try {
      const response = await shopService.checkout(sessionId);
      const order = response.order;

      const summaryLines = order.items
        .map((item) => `- ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`)
        .join("\n");

      alert(
        `Order placed successfully!\n\nOrder ID: ${order._id}\n\nItems:\n${summaryLines}\n\nTotal: $${order.totalPrice.toFixed(2)}`
      );

      setShowCart(false);
      await fetchCart();
      await fetchProducts(selectedCategory);
    } catch (error) {
      console.error("Checkout failed", error);
      alert(error?.response?.data?.message || "Checkout failed. Please try again.");
    }
  };

  const categoryOptions = ["", "Dog Food", "Cat Food", "Pet Toys"];

  const CartModal = () => (
    <div className="cart-overlay" onClick={() => setShowCart(false)}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Pet's Picks</h3>
          <button onClick={() => setShowCart(false)} className="close-btn" aria-label="Close cart">
            ×
          </button>
        </div>
        <div className="cart-items">
          {!isAuthenticated || isAdmin ? (
            <p className="shop-signin-note">Checkout is available for signed-in customer accounts only.</p>
          ) : null}
          {loadingCart ? (
            <p className="empty-cart">Loading cart...</p>
          ) : cart.length === 0 ? (
            <p className="empty-cart">Ready to spoil your furry friend? Start shopping!</p>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-icon">
                  {item.category === "Dog Food" ? <GiDogHouse /> : item.category === "Cat Food" ? <GiCat /> : <GiTennisBall />}
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="remove-item" aria-label="Remove item">
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="shop-page">
      <header className="shop-page-header">
        <div className="shop-page-shell">
          <div className="shop-header-content">
            <div aria-hidden="true" />
            <button className={`cart-btn ${cartBump ? "bump" : ""}`} onClick={() => setShowCart(true)} aria-label="Shopping cart">
              <FaShoppingBag className="cart-icon" />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      <section className="shop-content">
        <div className="shop-page-shell shop-container">
          <div className="shop-header-text">
            <h2>Pawsome Picks for Your Pet</h2>
            <p>Carefully chosen treasures to keep your furry family happy, healthy, and loved</p>
          </div>

          <div className="category-filter">
            {categoryOptions.map((category) => (
              <button
                key={category || "all"}
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                <span>{categoryLabelMap[category]}</span>
              </button>
            ))}
          </div>

          <div className="product-grid">
            {loadingProducts ? (
              <p className="empty-cart">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="empty-cart">No products available in this category.</p>
            ) : (
              products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-content">
                    <div className="product-image">
                      <img
                        src={resolveImageUrl(product.image, fallbackByCategory[product.category] || fallbackByCategory["Pet Toys"])}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.src = fallbackByCategory[product.category] || fallbackByCategory["Pet Toys"];
                        }}
                      />
                    </div>

                    <div className="category-badge">{product.category}</div>

                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>

                    <div className="product-rating">
                      <FaStar className="star-icon" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>

                    <div className="product-footer">
                      <div className="product-meta">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        <span className={`stock-pill ${product.stockQuantity === 0 ? "empty" : ""}`}>
                          {product.stockQuantity === 0 ? "Sold out" : `${product.stockQuantity} left`}
                        </span>
                      </div>
                      <button
                        className={`add-to-cart-btn ${addingProductId === product._id ? "is-adding" : ""} ${addedProductId === product._id ? "is-added" : ""}`}
                        onClick={() => addToCart(product)}
                        disabled={product.stockQuantity === 0 || addingProductId === product._id}
                      >
                        {addedProductId === product._id ? <FaCheck /> : <FaShoppingBag />}
                        <span>
                          {product.stockQuantity === 0
                            ? "Out of Stock"
                            : addingProductId === product._id
                              ? "Adding..."
                              : addedProductId === product._id
                                ? "Added"
                                : "Add to Cart"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {showCart && <CartModal />}
    </div>
  );
};

export default Shop;
