import React, { useState } from "react";
import SignUp from "./SignUp";

const SignIn = ({ onClose }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showSignUp, setShowSignUp] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome back! Signing in with ${form.email}`);
    onClose();
  };

  const handleSwitchToSignUp = () => {
    setShowSignUp(true);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
  };

  if (showSignUp) {
    return <SignUp onClose={handleCloseSignUp} onSwitchToSignIn={handleSwitchToSignIn} />;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="signin-section">
          <h2>Welcome Back!</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email Address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </label>
            <button className="primary-btn" type="submit">
              Sign In
            </button>
          </form>
          <p className="switch-text">
            Don't have an account?{" "}
            <button className="switch-btn" onClick={handleSwitchToSignUp}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
