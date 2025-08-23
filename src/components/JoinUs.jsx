import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const JoinUs = ({ onClose }) => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const handleCloseSignUp = () => {
    setShowSignUp(false);
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  if (showSignIn) {
    return <SignIn onClose={handleCloseSignIn} onSwitchToSignUp={switchToSignUp} />;
  }

  if (showSignUp) {
    return <SignUp onClose={handleCloseSignUp} onSwitchToSignIn={switchToSignIn} />;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="joinus-section">
          <h2>Join Our Community!</h2>
          <p className="joinus-description">
            Connect with fellow animal lovers and start your adoption journey today.
          </p>
          <div className="joinus-buttons">
            <button className="joinus-btn signin-btn" onClick={handleSignInClick}>
              Sign In
            </button>
            <button className="joinus-btn signup-btn" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
          <p className="joinus-note">
            Join thousands of families who have found their perfect companions through FurryNest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
