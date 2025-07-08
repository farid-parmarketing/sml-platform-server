import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const GoBack = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="go-back-flex mb-4">
      <h2 className="text-center text-capitalize fw-bold">{title}</h2>
      <button className="secondary-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default GoBack;
