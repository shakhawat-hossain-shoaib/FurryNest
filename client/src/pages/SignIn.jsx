import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from '../context/useAuth';
import "../assets/styles/SignIn.css";

const SignIn = () => {
  const [form, setForm] = useState({ 
    email: "", 
    password: "",
    rememberMe: false 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === 'checkbox' ? checked : value 
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { login } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const authData = await login(form.email, form.password);
      
      if (form.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      const role = authData?.user?.role;
      navigate(role === "admin" ? "/dashboard" : "/");
    } catch (error) {
      setErrors({
        ...errors,
        submit: error.message || 'Invalid email or password. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page sign-in-page">
      <div className="auth-container sign-in-layout">
        <aside className="auth-visual-panel sign-in-panel" aria-hidden="true">
          <div className="auth-visual-overlay">
            <span className="auth-visual-badge">FurryNest</span>
            <h3>Every return means another tail wags today.</h3>
            <p>Your next rescued friend is waiting for your love.</p>
          </div>
        </aside>

        <div className="auth-card sign-in-card">
          <div className="auth-header">
            <h2>Welcome Back!</h2>
            <p className="auth-subtitle">Sign in to continue your adoption journey</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form sign-in-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                  required
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={form.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <span className="forgot-link" aria-disabled="true">
                Forgot password coming soon
              </span>
            </div>

            <button 
              type="submit" 
              className={`auth-submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {errors.submit && (
              <div className="auth-error-box" role="alert">
                {errors.submit}
              </div>
            )}
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup" className="link">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;