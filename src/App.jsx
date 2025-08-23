import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickNav from "./components/QuickNav";
import About from "./components/About";
import FeaturedPets from "./components/FeaturedPets";
import Blog from "./components/Blog";
import SuccessStories from "./components/SuccessStories";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import "./App.css";

function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleJoinUsClick = () => {
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  return (
    <div className="container">
      <Header onJoinUsClick={handleJoinUsClick} />
      <Hero />
      <QuickNav />
      <About />
      <FeaturedPets />
      <Blog />
      <SuccessStories />
      <Newsletter />
      <Footer />
      
      {showSignIn && <SignIn onClose={handleCloseSignIn} />}
    </div>
  );
}

export default App;
