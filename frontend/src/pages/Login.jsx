import React, { useContext, useEffect, useMemo, useState } from "react";
import logo from "../assets/images/logo.png";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import SigninLeft from "../components/SigninLeft";

const Login = () => {
  const { url, getToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const login = async () => {
    const { email, password } = inputs;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email",
      });
      return;
    }

    if (password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters long",
      });
      return;
    }

    try {
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Email:equals:${inputs.email}))&email=${inputs.email}&unique=${inputs.password}`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const data = res.data.data[0];
        for (let item in data) {
          if (data[item] === null) {
            data[item] = "";
          }
        }
        //
        if (data.Unique.toLowerCase() !== inputs.password.toLowerCase()) {
          setError(true);
          setMessage("Incorrect credentials");
        } else {
          setError(false);
          localStorage.setItem("sml-platform-user", JSON.stringify(data.id));
          setMessage("Login successful");
          setTimeout(() => {
            if (data.Step.toString() === "4") {
              navigate("/", { replace: true });
            } else {
              navigate("/steps", { replace: true });
            }
          }, 2000);
        }
      } else if (res.status === 204) {
        setError(true);
        setMessage("Account not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  useEffect(() => {
    const email = sessionStorage.getItem("sml-platform-email");
    if (email) {
      setInputs({
        ...inputs,
        email: JSON.parse(email),
      });
    }
  }, []);
  //
  useMemo(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  return (
    <>
      <div className="login-container">
        <SigninLeft />
        <div className="login-right" data-aos="fade-left">
          <div className="login-logo">
            <img src={logo} alt="" />
          </div>
          <div className="my-4">
            <h1 className="fw-bold fst-italic">Hello,</h1>
            <h2>Start your debt free journey NOW!</h2>
          </div>

          <div className="my-4">
            <div className="form-div mb-4">
              <label className="label-flex">
                <FaEnvelope />
                Email address
              </label>
              <input
                type="email"
                className="input"
                name="email"
                autoComplete="off"
                value={inputs.email}
                onChange={handleInputs}
              />
              <small className="text-danger">{errors.email}</small>
            </div>
            <div className="form-div mb-4">
              <label className="label-flex">
                <FaKey />
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                name="password"
                autoComplete="off"
                value={inputs.password}
                onChange={handleInputs}
              />
              <small className="text-danger">{errors.password}</small>
              <label
                className="label-flex"
                style={{ userSelect: "none", cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  onClick={() => setShowPassword(!showPassword)}
                />
                Show password
              </label>
            </div>
            <p className={`mt-2 ${error ? "text-danger" : "text-success"}`}>
              {message}
            </p>
            <button className="button" id="login" onClick={login}>
              Login
            </button>
          </div>

          {/*  */}
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="fake-login-link">
              Signup
            </Link>
          </p>
          <p>
            Forgot password?{" "}
            <Link to="/forgotpassword" className="fake-login-link">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
