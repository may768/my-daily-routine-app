import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./Auth.css";

const Login = ({ onLogin, switchToRegister }) => {
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = {
          name: result.user.displayName,
          email: result.user.email,
        };
        onLogin(user);
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed!");
        onLogin(null);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>👋 Welcome Back!</h2>
        <p>Log in to manage your expenses</p>
        <button className="google-btn" onClick={handleGoogleLogin}>
          Sign In with Google
        </button>
        <p className="switch-text">
          New user?{" "}
          <span onClick={switchToRegister} className="link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

