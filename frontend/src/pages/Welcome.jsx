import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import step1 from "../assets/images/welcome-icons/step1.png";
import step2 from "../assets/images/welcome-icons/step2.png";
import step3 from "../assets/images/welcome-icons/step3.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const { user, setWelcomeDone } = useContext(AppContext);
  const navigate = useNavigate();
  const goToSteps = () => {
    setWelcomeDone(true);
    navigate("/steps", { replace: true });
  };
  return (
    <>
      <div className="container-fluid full-height-container p-2 pt-md-2 pt-4">
        <div className="container p-0">
          <div className="mb-3">
            <h2>Hello {user !== null && user.Name}, Check your eligibility</h2>
            <p>
              Take the followig three steps towards a stress-free life. Find out
              if you qualify for our tailored debt solutions designed to help
              you become debt-free.
            </p>
          </div>

          <h2 className="mb-4">Let's get started with three simple steps</h2>

          <div className="welcome-grid pt-2">
            <div className="welcome-grid-box1 welcome-grid-box glass">
              <div className="step-number">
                <h1>1</h1>
              </div>
              <h2>Share your Debts</h2>
              <div className="welcome-image">
                <img src={step1} alt="" />
              </div>
              <p>
                Provide us with information about your current debts. This helps
                us understand your situation and tailor a solution that fits
                your needs.
              </p>
            </div>
            <div className="welcome-grid-box2">
              <div className="arrow1-box"></div>
            </div>
            <div className="welcome-grid-box3 welcome-grid-box glass">
              <div className="step-number">
                <h1>2</h1>
              </div>
              <h2>Outline your Income & Expense</h2>
              <div className="welcome-image">
                <img src={step2} alt="" />
              </div>
              <p>
                Provide us with information about your current debts. This helps
                us understand your situation and tailor a solution that fits
                your needs.
              </p>
            </div>
            <div className="welcome-grid-box4">
              <div className="arrow1-box arrow-flipped"></div>
            </div>
            <div className="welcome-grid-box5 welcome-grid-box glass">
              <div className="step-number">
                <h1>3</h1>
              </div>
              <h2>Explore your Debt Solutions</h2>
              <div className="welcome-image">
                <img src={step3} alt="" />
              </div>
              <p>
                Provide us with information about your current debts. This helps
                us understand your situation and tailor a solution that fits
                your needs.
              </p>
            </div>
          </div>

          <button
            className="secondary-button welcome-page-button mt-3"
            id="welcome"
            onClick={goToSteps}
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
