import React from "react";
import girl from "../assets/images/login-girl.png";
import settlementImg from "../assets/images/signin-icons/Settlement.svg";
import legalImg from "../assets/images/signin-icons/Legal.svg";
import harassmentImg from "../assets/images/signin-icons/Harassment.svg";

const SigninLeft = () => {
  return (
    <>
      <div className="login-left">
        <div className="glass p-4 pb-0" data-aos="zoom-in">
          <h1 className="fw-bold fst-italic mb-4">Debt Free Solutions</h1>
          <h2 className="mb-4">
            Join Settle my loan for your mental <br /> & financial freedom!
          </h2>

          <ul className="list-unstyled">
            <li className="signin-list-flex">
              <img src={settlementImg} alt="" />
              settlement on lower EMI
            </li>
            <li className="signin-list-flex">
              <img src={legalImg} alt="" />
              legal support
            </li>
            <li className="signin-list-flex">
              <img src={harassmentImg} alt="" />
              creditor harassment reflief
            </li>
          </ul>

          <div className="girl">
            <img src={girl} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninLeft;
