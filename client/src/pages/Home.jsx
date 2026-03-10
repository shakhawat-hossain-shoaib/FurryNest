import React from "react";
import { Link } from "react-router-dom";
import { GiDogHouse, GiCat, GiTennisBall } from "react-icons/gi";
import QuickNav from "../components/QuickNav";
import FeaturedPets from "../components/FeaturedPets";
import SuccessStories from "../components/SuccessStories";
import Newsletter from "../components/Newsletter";
import "../assets/styles/Home.css";

export default function Home() {
  const scrollToFeatured = () => {
    const featuredSection = document.getElementById("featured-fluff-balls");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Connecting vulnerable animals with their forever families
          </h1>
          <button className="hero-btn" onClick={scrollToFeatured}>
            Adopt, don't shop
          </button>
        </div>
      </section>

      {/* Quick Navigation */}
      <QuickNav />

      {/* Shop Section */}
      <section className="shop-section">
        <div className="shop-content">
          <h2 className="shop-title">Healthy Bites, Happy Pets</h2>
          <p className="shop-description">
            Discover premium pet food and playful accessories for your furry friends
          </p>
          <div className="shop-categories">
            <div className="category-card">
              <div className="category-icon">
                <GiDogHouse className="icon" />
              </div>
              <h3>Dog Food</h3>
              <p>Premium nutrition for your canine companion</p>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <GiCat className="icon" />
              </div>
              <h3>Cat Food</h3>
              <p>Quality meals for your feline friend</p>
            </div>
            <div className="category-card">
              <div className="category-icon">
                <GiTennisBall className="icon" />
              </div>
              <h3>Pet Toys</h3>
              <p>Fun and engaging toys for active pets</p>
            </div>
          </div>
          <Link to="/shop" className="shop-btn">
            Shop Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="about-title">
            A little bit about us.
          </h2>
          <p className="about-description">
            We are dedicated to connecting loving families with pets in need. Our
            mission is to make every adoption a success story filled with hope and
            care.
          </p>
          <Link to="/contact" className="about-btn">
            Contact Us
          </Link>
        </div>
      </section>

      {/* Featured Pets */}
      <FeaturedPets />

      {/* Success Stories */}
      <SuccessStories />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
