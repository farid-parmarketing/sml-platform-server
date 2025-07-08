import React from "react";

const Loader = ({ message, color }) => {
  return (
    <div className="d-flex align-items-center justify-content-center gap-2 flex-column">
      <div className={`spinner-border text-${color}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className={`text-${color} fw-bold`}>{message}</p>
    </div>
  );
};

export default Loader;
