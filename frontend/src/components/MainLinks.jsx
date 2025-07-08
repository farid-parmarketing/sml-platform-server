import React from "react";
import { NavLink } from "react-router-dom";
import temp1 from "../assets/images/salary.png";
import temp2 from "../assets/images/chat.png";
import temp3 from "../assets/images/business-profile.png";

const MainLinks = () => {
  return (
    <>
      <ul className="main-links-flex my-4">
        <li>
          <NavLink to="/">
            <span>
              <img src={temp1} alt="" />
            </span>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/creditors">
            <span>
              <img src={temp2} alt="" />
            </span>{" "}
            Creditors
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile">
            <span>
              <img src={temp3} alt="" />
            </span>{" "}
            Profile
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default MainLinks;
