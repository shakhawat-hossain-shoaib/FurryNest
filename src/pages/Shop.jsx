import React, { useState } from 'react';
import { FaShoppingBag, FaStar, FaArrowLeft, FaTruck, FaUserMd, FaCrown, FaTrash } from 'react-icons/fa';
import { GiDogHouse, GiCat, GiTennisBall } from 'react-icons/gi';
import { MdPets } from 'react-icons/md';
import '../style/Shop.css';

const Shop = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Local product data
  const allProducts = [
    {
      _id: 1,
      name: "Premium Dog Food",
      category: "Dog Food",
      price: 29.99,
      rating: 4.8,
      stockQuantity: 100,
      description: "High-quality nutrition for healthy dogs, made with real meat and vegetables"
    },
    {
      _id: 2,
      name: "Gourmet Cat Food",
      category: "Cat Food",
      price: 24.99,
      rating: 4.9,
      stockQuantity: 100,
      description: "Delicious meals cats absolutely love, with premium ingredients"
    },
    {
      _id: 3,
      name: "Interactive Ball Toy",
      category: "Pet Toys",
      price: 12.99,
      rating: 4.6,
      stockQuantity: 50,
      description: "Durable and interactive ball that keeps pets active and entertained"
    },
    {
      _id: 4,
      name: "Organic Puppy Treats",
      category: "Dog Food",
      price: 18.99,
      rating: 4.7,
      stockQuantity: 75,
      description: "Natural, organic treats perfect for training growing puppies"
    },
    {
      _id: 5,
      name: "Catnip Mouse Toy",
      category: "Pet Toys",
      price: 8.99,
      rating: 4.5,
      stockQuantity: 80,
      description: "Irresistible fun for curious cats, filled with premium catnip"
    },
    {
      _id: 6,
      name: "Senior Cat Formula",
      category: "Cat Food",
      price: 32.99,
      rating: 4.8,
      stockQuantity: 60,
      description: "Specially formulated food for older cats with added supplements"
    }
  ];

  // Filter products based on selected category
  const products = selectedCategory
    ? allProducts.filter(product => product.category === selectedCategory)
    : allProducts;

  // Cart functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setShowCart(true); // Show cart when item is added
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Cart Modal Component
  const CartModal = () => (
    <div className="cart-overlay" onClick={() => setShowCart(false)}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button onClick={() => setShowCart(false)} className="close-btn">×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item._id} className="cart-item">
                <div className="item-icon">
                  {item.category === 'Dog Food' ? <GiDogHouse /> :
                   item.category === 'Cat Food' ? <GiCat /> :
                   <GiTennisBall />}
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
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="remove-item"
                >
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
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="homepage">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <MdPets className="logo-icon" />
              <h1>PetStore</h1>
            </div>
            <nav className="nav">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <button 
                className="cart-btn"
                onClick={() => setShowCart(true)}
              >
                <FaShoppingBag />
                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h2 className="hero-title">
              Healthy Bites,
              <br />
              <span className="hero-title-gradient">Happy Pets</span>
            </h2>
            <p className="hero-subtitle">
              Nutritious food and fun toys for your pets—all in one place.
            </p>
          </div>

          <div className="category-grid">
            <div className="category-card" onClick={() => { setCurrentPage('shop'); setSelectedCategory('Dog Food'); }}>
              <GiDogHouse className="category-icon" />
              <h3>Dog Food</h3>
              <p>Premium nutrition for healthy, happy dogs</p>
            </div>
            <div className="category-card" onClick={() => { setCurrentPage('shop'); setSelectedCategory('Cat Food'); }}>
              <GiCat className="category-icon" />
              <h3>Cat Food</h3>
              <p>Gourmet meals your cats will love</p>
            </div>
            <div className="category-card" onClick={() => { setCurrentPage('shop'); setSelectedCategory('Pet Toys'); }}>
              <GiTennisBall className="category-icon" />
              <h3>Pet Toys</h3>
              <p>Interactive toys for endless fun</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('shop')}
            className="shop-now-btn"
          >
            <FaShoppingBag />
            <span>Shop Now</span>
          </button>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="features-grid">
            <div className="feature-item">
              <FaTruck className="feature-icon" />
              <h3>Free Delivery</h3>
              <p>Free shipping on orders over $50</p>
            </div>
            <div className="feature-item">
              <FaUserMd className="feature-icon" />
              <h3>Pet Care Experts</h3>
              <p>Professional advice for your pet's health</p>
            </div>
            <div className="feature-item">
              <FaCrown className="feature-icon" />
              <h3>Premium Quality</h3>
              <p>Only the best products for your pets</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ShopPage = () => (
    <div className="shop-page">
      <header className="header">
        <div className="container">
          <div className="shop-header-content">
            <button
              onClick={() => setCurrentPage('home')}
              className="back-btn"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </button>
            <div className="logo">
              <MdPets className="logo-icon" />
              <h1>Shop</h1>
            </div>
            <button 
              className="cart-btn"
              onClick={() => setShowCart(true)}
            >
              <FaShoppingBag />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      <section className="shop-content">
        <div className="shop-container">
          <div className="shop-header-text">
            <h2>Our Products</h2>
            <p>Everything your pet needs for a healthy, happy life</p>
          </div>

          <div className="category-filter">
            <button 
              className={selectedCategory === '' ? 'active' : ''}
              onClick={() => setSelectedCategory('')}
            >
              All Products
            </button>
            <button 
              className={selectedCategory === 'Dog Food' ? 'active' : ''}
              onClick={() => setSelectedCategory('Dog Food')}
            >
              Dog Food
            </button>
            <button 
              className={selectedCategory === 'Cat Food' ? 'active' : ''}
              onClick={() => setSelectedCategory('Cat Food')}
            >
              Cat Food
            </button>
            <button 
              className={selectedCategory === 'Pet Toys' ? 'active' : ''}
              onClick={() => setSelectedCategory('Pet Toys')}
            >
              Pet Toys
            </button>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-content">
                  <div className="product-image">
                    {product.category === 'Dog Food' ? <GiDogHouse className="product-icon" /> :
                     product.category === 'Cat Food' ? <GiCat className="product-icon" /> :
                     <GiTennisBall className="product-icon" />}
                  </div>
                  
                  <div className="category-badge">
                    {product.category}
                  </div>
                  
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-rating">
                    <FaStar className="star-icon" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="product-footer">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                      disabled={product.stockQuantity === 0}
                    >
                      <FaShoppingBag />
                      <span>
                        {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  return (
    <div>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {showCart && <CartModal />}
    </div>
  );
};

export default Shop;