import React, { useContext } from "react";
import Step1 from "../components/step1/Step1";
import Step2 from "../components/step2/Step2";
import Step3 from "../components/step3/Step3";
import { AppContext } from "../context/AppContext";

const Steps = () => {
  const { step } = useContext(AppContext);
  //
  return (
    <div className="full-height-container">
      {step.toString() === "" && <Step1 />}
      {step.toString() === "1" && <Step2 />}
      {(step.toString() === "2" || step.toString() === "3") && <Step3 />}
    </div>
  );
};

export default Steps;
