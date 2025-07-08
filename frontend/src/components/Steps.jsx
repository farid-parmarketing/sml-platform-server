import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Steps = () => {
  const { step } = useContext(AppContext);
  const steps = ["step 1", "step 2", "step 3"];
  return (
    <>
      <div className="steps-counter-container my-4">
        {steps.map((item, index) => (
          <div
            key={index}
            className={`step-button ${step > index ? "active" : ""}`}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default Steps;
