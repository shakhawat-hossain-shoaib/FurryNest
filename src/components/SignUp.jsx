import React, { useState } from "react";

const SignUp = ({ onClose, onSwitchToSignIn }) => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "" 
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert(`Welcome ${form.name}! Your account has been created.`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="signup-section">
          <h2>Join Our Community!</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email Address
              <input
                name="e-mail"
                type="e-mail"
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
            <label>
              Confirm Password
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </label>
            <button className="primary-btn" type="submit">
              Create Account
            </button>
          </form>
          <p className="switch-text">
            Already have an account?{" "}
            <button className="switch-btn" onClick={onSwitchToSignIn}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
