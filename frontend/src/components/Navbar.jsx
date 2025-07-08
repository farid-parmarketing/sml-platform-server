import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import logo from "../assets/images/logo.png";
import { FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("sml-platform-user");
    navigate("/login", { replace: true });
  };
  //
  //
  const navbar = useRef(null);
  useEffect(() => {
    window.onscroll = () => {
      if (navbar.current) {
        if (window.scrollY > 100) {
          navbar.current.classList.add("shadow");
        } else if (window.scrollY < 100) {
          navbar.current.classList.remove("shadow");
        }
      }
    };
  }, []);
  return (
    <>
      <nav className="container-fluid p-2" ref={navbar}>
        {user !== null && (
          <div className="container p-0">
            <div className="d-flex align-items-center justify-content-between">
              {user.Step.toString() === "4" ? (
                <Link to="/" className="d-block logo">
                  <img src={logo} alt="" />
                </Link>
              ) : (
                <div className="logo">
                  <img src={logo} alt="" />
                </div>
              )}

              <ul className="list-unstyled">
                <li
                  className="setting"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser />
                  <div className="dropdown">
                    <ul className="dropdown-menu p-2">
                      <li className="text-capitalize label-flex">
                        <FaUser />
                        {user.First_Name} {user.Last_Name}
                      </li>
                      <li className=" label-flex">
                        <FaEnvelope />
                        {user.Email}
                      </li>
                      <li className=" label-flex">
                        <FaPhoneAlt />
                        {user.Phone}
                      </li>
                      <hr />
                      <li>
                        <button className="red-button w-100" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
