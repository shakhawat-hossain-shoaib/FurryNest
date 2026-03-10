import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdoptDog from "./pages/AdoptDog";
import AdoptCat from "./pages/AdoptCat";
import PetDetails from "./pages/PetDetails";
import WaysToHelp from "./pages/WaysToHelp";
import Blog from "./pages/Blog";
import Add from "./pages/Add";
import ContactUs from "./pages/ContactUs";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RequestPet from "./pages/RequestPet";
import Dashboard from "./pages/Dashboard";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminRoute from "./components/AdminRoute";
import "./assets/styles/App.css";

function App() {
  return (
    <AuthProvider>
      <div className="page-wrapper">
        <Header />
        <div className="content-wrapper">
          <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adopt-dog" element={<AdoptDog />} />
            <Route path="/adopt-cat" element={<AdoptCat />} />
            <Route path="/pet/:type/:id" element={<PetDetails />} />
            <Route path="/ways-to-help" element={<WaysToHelp />} />
            <Route path="/blog" element={<Blog />} />
            <Route
              path="/add"
              element={
                <AdminRoute>
                  <Add />
                </AdminRoute>
              }
            />
            <Route path="/request-pet" element={<RequestPet />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <AdminOrders />
                </AdminRoute>
              }
            />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
    </AuthProvider>
  );
}

export default App;
