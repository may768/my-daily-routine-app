import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Auth.css";

const Register = ({ onRegister, switchToLogin }) => {
  const handleGoogleRegister = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
        };
        onRegister(user);
      })
      .catch((error) => {
        console.error("Registration error:", error);
        alert("Registration failed!");
        onRegister(null);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>🚀 Join Us</h2>
        <p>Create your budget account</p>
        <button className="google-btn" onClick={handleGoogleRegister}>
          Sign Up with Google
        </button>
        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={switchToLogin} className="link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
