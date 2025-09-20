import React, { useState } from 'react';
import { FaShoppingBag, FaHeart, FaStar, FaArrowLeft, FaTruck, FaUserMd, FaCrown } from 'react-icons/fa';
import { GiDogHouse, GiCat, GiTennisBall } from 'react-icons/gi';
import { MdPets } from 'react-icons/md';
import './Shop.css';

const Shop = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Premium Dog Food",
      category: "Dog Food",
      price: 29.99,
      icon: <GiDogHouse className="product-icon" />,
      rating: 4.8,
      description: "High-quality nutrition for healthy dogs"
    },
    {
      id: 2,
      name: "Gourmet Cat Food",
      category: "Cat Food", 
      price: 24.99,
      icon: <GiCat className="product-icon" />,
      rating: 4.9,
      description: "Delicious meals cats absolutely love"
    },
    {
      id: 3,
      name: "Interactive Ball Toy",
      category: "Pet Toys",
      price: 12.99,
      icon: <GiTennisBall className="product-icon" />,
      rating: 4.6,
      description: "Keeps pets active and entertained"
    },
    {
      id: 4,
      name: "Organic Puppy Treats",
      category: "Dog Food",
      price: 18.99,
      icon: <GiDogHouse className="product-icon" />,
      rating: 4.7,
      description: "Natural treats for growing puppies"
    },
    {
      id: 5,
      name: "Catnip Mouse Toy",
      category: "Pet Toys",
      price: 8.99,
      icon: <GiTennisBall className="product-icon" />,
      rating: 4.5,
      description: "Irresistible fun for curious cats"
    },
    {
      id: 6,
      name: "Senior Cat Formula",
      category: "Cat Food",
      price: 32.99,
      icon: <GiCat className="product-icon" />,
      rating: 4.8,
      description: "Specially formulated for older cats"
    },
    {
      id: 7,
      name: "Rope Chew Toy",
      category: "Pet Toys",
      price: 15.99,
      icon: <GiTennisBall className="product-icon" />,
      rating: 4.4,
      description: "Durable toy for strong chewers"
    },
    {
      id: 8,
      name: "Grain-Free Dog Food",
      category: "Dog Food",
      price: 34.99,
      icon: <GiDogHouse className="product-icon" />,
      rating: 4.9,
      description: "Perfect for dogs with sensitive stomachs"
    }
  ];

  const HomePage = () => (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <MdPets className="logo-icon" />
              <h1>PetStore</h1>
            </div>
            <nav className="nav">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Shopping Section */}
      <section className="hero-section">
        <div className="hero-container">
          {/* Main Headlines */}
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

          {/* Product Categories Preview */}
          <div className="category-grid">
            <div className="category-card">
              <GiDogHouse className="category-icon" />
              <h3>Dog Food</h3>
              <p>Premium nutrition for healthy, happy dogs</p>
            </div>
            <div className="category-card">
              <GiCat className="category-icon" />
              <h3>Cat Food</h3>
              <p>Gourmet meals your cats will love</p>
            </div>
            <div className="category-card">
              <GiTennisBall className="category-icon" />
              <h3>Pet Toys</h3>
              <p>Interactive toys for endless fun</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setCurrentPage('shop')}
            className="shop-now-btn"
          >
            <FaShoppingBag />
            <span>Shop Now</span>
          </button>
        </div>
      </section>

      {/* Additional Features */}
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
      {/* Header */}
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
          </div>
        </div>
      </header>

      {/* Shop Content */}
      <section className="shop-content">
        <div className="shop-container">
          <div className="shop-header-text">
            <h2>Our Products</h2>
            <p>Everything your pet needs for a healthy, happy life</p>
          </div>

          {/* Product Grid */}
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-content">
                  {/* Product Icon */}
                  <div className="product-image">
                    {product.icon}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="category-badge">
                    {product.category}
                  </div>
                  
                  {/* Product Info */}
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="product-rating">
                    <FaStar className="star-icon" />
                    <span>{product.rating}</span>
                  </div>
                  
                  {/* Price and Actions */}
                  <div className="product-footer">
                    <span className="product-price">${product.price}</span>
                    <button className="add-to-cart-btn">
                      <FaShoppingBag />
                      <span>Add to Cart</span>
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
    </div>
  );
};

export default Shop;