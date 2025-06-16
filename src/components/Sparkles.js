import React, { useEffect } from "react";
import "./Sparkles.css";

const Sparkles = ({ mode }) => {
  useEffect(() => {
    const createSparkle = () => {
      const sparkle = document.createElement("div");
      sparkle.className = `sparkle ${mode}`;
      sparkle.style.left = `${Math.random() * 100}vw`;
      sparkle.style.top = `${Math.random() * 100}vh`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 3000);
    };

    const interval = setInterval(createSparkle, 500);
    return () => clearInterval(interval);
  }, [mode]);

  return null;
};

export default Sparkles;
