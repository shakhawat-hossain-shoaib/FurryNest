import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickNav from "./components/QuickNav";
import About from "./components/About";
import FeaturedPets from "./components/FeaturedPets";
import Blog from "./components/Blog";
import SuccessStories from "./components/SuccessStories";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <QuickNav />
      <About />
      <FeaturedPets />
      <Blog />
      <SuccessStories />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
