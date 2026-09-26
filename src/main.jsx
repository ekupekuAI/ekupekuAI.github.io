import React from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import App from "./App.jsx";
import "./styles.css";

// reducedMotion="user" honours the OS "reduce motion" setting app-wide:
// transform-based movement is dropped, opacity fades are kept.
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);
