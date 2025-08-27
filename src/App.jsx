import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickNav from "./components/QuickNav";
import About from "./components/About";
import FeaturedPets from "./components/FeaturedPets";
import Blog from "./components/Blog";
import SuccessStories from "./components/SuccessStories";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import AdoptDog from "./components/AdoptDog";
import AdoptCat from "./components/AdoptCat";
import PetDetails from "./components/PetDetails";
import "./App.css";

function App() {
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleJoinUsClick = () => {
    setShowAuthPage(true);
  };

  const handleCloseAuth = () => {
    setShowAuthPage(false);
  };

  const handleSignInSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthPage(false);
    // You can redirect to a dashboard or show a success message
    alert(`Welcome ${userData}! You have successfully signed in.`);
  };

  return (
    <div className="container">
      <Header onJoinUsClick={handleJoinUsClick} />
      
      {showAuthPage ? (
        <AuthPage onClose={handleCloseAuth} onSignInSuccess={handleSignInSuccess} />
      ) : (
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <QuickNav />
              <About />
              <FeaturedPets />
              <Blog />
              <SuccessStories />
              <Newsletter />
              <Footer />
            </>
          } />
          <Route path="/adopt-dog" element={<AdoptDog />} />
          <Route path="/adopt-cat" element={<AdoptCat />} />
          <Route path="/pet/:type/:id" element={<PetDetails />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
