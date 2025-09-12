import React, { useState } from "react";
import "../style/AuthPage.css";

const AuthPage = ({ onClose, onSignInSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignInChange = (e) =>
    setSignInForm({ ...signInForm, [e.target.name]: e.target.value });

  const handleSignUpChange = (e) =>
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Redirect to dashboard or main page after successful sign in
    onSignInSuccess(signInForm.email);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Redirect to dashboard or main page after successful sign up
    onSignInSuccess(signUpForm.name);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${!isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${isSignUp ? "active" : ""}`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {!isSignUp ? (
          <div className="auth-form-section">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue your adoption journey</p>
            <form onSubmit={handleSignInSubmit}>
              <label>
                Email Address
                <input
                  name="email"
                  type="email"
                  value={signInForm.email}
                  onChange={handleSignInChange}
                  required
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={signInForm.password}
                  onChange={handleSignInChange}
                  required
                />
              </label>
              <button className="auth-submit-btn" type="submit">
                Sign In
              </button>
            </form>
          </div>
        ) : (
          <div className="auth-form-section">
            <h2>Join Our Community!</h2>
            <p>Create an account to start your adoption journey</p>
            <form onSubmit={handleSignUpSubmit}>
              <label>
                Full Name
                <input
                  name="name"
                  type="text"
                  value={signUpForm.name}
                  onChange={handleSignUpChange}
                  required
                />
              </label>
              <label>
                Email Address
                <input
                  name="email"
                  type="email"
                  value={signUpForm.email}
                  onChange={handleSignUpChange}
                  required
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={signUpForm.password}
                  onChange={handleSignUpChange}
                  required
                />
              </label>
              <label>
                Confirm Password
                <input
                  name="confirmPassword"
                  type="password"
                  value={signUpForm.confirmPassword}
                  onChange={handleSignUpChange}
                  required
                />
              </label>
              <button className="auth-submit-btn" type="submit">
                Create Account
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
