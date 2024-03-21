import React from "react";

function CardFallback({ numCards = 6 }) {
  return (
    <div className="card-grid">
      {Array.from({ length: numCards }, (_, idx) => idx).map((idx) => (
        <div key={idx} className="card">
          <div className="card-header">
            <div className="skeleton"></div>
          </div>
          <div className="card-body">
            <div className="card-preview-text ">
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </div>
          </div>
          <div className="card-footer">
            <div className="skeleton skeleton-btn"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardFallback;
