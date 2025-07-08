import React, { useContext, useMemo, useState } from "react";
import logo from "../assets/images/logo.png";
import { FaEnvelope, FaKey, FaPhoneAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SigninLeft from "../components/SigninLeft";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { url, getToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const utmSource = searchParams.get("utm_source");
  //
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
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
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const signup = async () => {
    const { firstName, lastName, email, mobile, password } = inputs;

    if (!firstName.trim()) {
      setErrors({
        ...errors,
        firstName: "Please enter your first name",
      });
      return;
    }

    if (!lastName.trim()) {
      setErrors({
        ...errors,
        firstName: "Please enter your last name",
      });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrors({
        ...errors,
        email: "Please enter a valid email",
      });
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setErrors({
        ...errors,
        mobile: "Mobile number must be 10 digits",
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
      const data = [
        {
          First_Name: inputs.firstName,
          Last_Name: inputs.lastName,
          Email: inputs.email,
          Phone: inputs.mobile,
          Unique: inputs.password,
          Sources:
            !utmSource || utmSource === "" ? "Enroll_Portal_Client" : utmSource,
          Account_Status: "Enrolled",
        },
      ];
      const res = await axios.post(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads`,
        data,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 202) {
        setError(true);
        if (res.data.data[0].code === "MANDATORY_NOT_FOUND") {
          setMessage(`Missing field: ${res.data.data[0].details.api_name}`);
        }
      } else if (res.status === 201) {
        setError(false);
        console.log(res.data.data[0].details.id);
        setMessage("Account created successfully.");
        sessionStorage.setItem(
          "sml-platform-email",
          JSON.stringify(inputs.email)
        );
        localStorage.setItem(
          "sml-platform-user",
          JSON.stringify(res.data.data[0].details.id)
        );
        setTimeout(() => {
          navigate("/welcome", { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            <div className="name-flex">
              {" "}
              <div className="form-div mb-4">
                <label className="label-flex">
                  <FaUser />
                  First name
                </label>
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  autoComplete="off"
                  value={inputs.firstName}
                  onChange={handleInputs}
                />
                <small className="text-danger">{errors.firstName}</small>
              </div>
              <div className="form-div mb-4">
                <label className="label-flex">
                  <FaUser />
                  Last name
                </label>
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  autoComplete="off"
                  value={inputs.lastName}
                  onChange={handleInputs}
                />
                <small className="text-danger">{errors.lastName}</small>
              </div>
            </div>

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
                <FaPhoneAlt />
                Mobile number
              </label>
              <input
                type="tel"
                className="input"
                name="mobile"
                autoComplete="off"
                value={inputs.mobile}
                onChange={handleInputs}
              />
              <small className="text-danger">{errors.mobile}</small>
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
            <button className="button" id="signup" onClick={signup}>
              Signup
            </button>
          </div>

          {/*  */}
          <p>
            Already have an account?{" "}
            <Link to="/login" className="fake-login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
