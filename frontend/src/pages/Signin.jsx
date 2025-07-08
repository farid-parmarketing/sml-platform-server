import React from "react";
import logo from "../assets/images/logo.png";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <>
      <div className="signin-container p-2">
        <div className="glass text-center p-4" data-aos="zoom-in">
          <div className="big-logo">
            <img src={logo} alt="" />
          </div>

          <div className="my-5">
            <h1 className="mb-4">Debt Free Solutions </h1>
            <ul className="list-unstyled">
              <li>Would you like to become debt free?</li>
              <li className="my-2">Stop creditors calls and visits?</li>
              <li>Stop them harassing you, your family and friends?</li>
            </ul>
          </div>

          <div>
            <Link to="/signup" className="button signin-button">
              Let's get started <FaArrowRight />
            </Link>

            <div className="mt-5">
              <p className="mb-2">Already have an account?</p>
              <Link to="/login" className="button login-button">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
