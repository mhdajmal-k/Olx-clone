import React from "react";
import "./shimmer.css";

const Shimmer = () => {
  return (
    <div className="shimmer-grid-container">
      <div className="shimmer-card">
        <div className="shimmer-thumbnail"></div>
        <div className="shimmer-details">
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
        </div>
      </div>
      <div className="shimmer-card">
        <div className="shimmer-thumbnail"></div>
        <div className="shimmer-details">
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
        </div>
      </div>
      <div className="shimmer-card">
        <div className="shimmer-thumbnail"></div>
        <div className="shimmer-details">
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
        </div>
      </div>

    </div>
  );
};

export default Shimmer;
