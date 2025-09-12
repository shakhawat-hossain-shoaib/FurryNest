import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdoptDog from "./pages/AdoptDog";
import AdoptCat from "./pages/AdoptCat";
import PetDetails from "./pages/PetDetails";
import WaysToHelp from "./pages/WaysToHelp";
import Blog from "./pages/Blog";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adopt-dog" element={<AdoptDog />} />
        <Route path="/adopt-cat" element={<AdoptCat />} />
        <Route path="/pet/:type/:id" element={<PetDetails />} />
        <Route path="/ways-to-help" element={<WaysToHelp />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
