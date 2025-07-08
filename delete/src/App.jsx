import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/style.css";
import logo from "./assets/images/logo.png";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  //
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const submit = async () => {
    const { name, email, mobile } = inputs;
    if (!name) {
      setError(true);
      setMessage("Enter your full name");
    } else if (!email) {
      setError(true);
      setMessage("Enter your email address");
    } else if (!mobile) {
      setError(true);
      setMessage("Enter your mobile number");
    } else {
      try {
        const data = {
          name,
          email,
          mobile,
        };
        const res = await axios.post(
          `https://platform-api.settlemyloan.in/user/delete`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data.success === false) {
          setError(true);
          setMessage(res.data.message);
        } else {
          setError(false);
          setMessage(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  return (
    <>
      <nav className="container-fluid p-2">
        <div className="container p-0">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
        </div>
      </nav>
      <div className="container-fluid p-2">
        <div className="container form-container p-2 mt-2">
          <div className="form-div">
            <div>
              <h1>Delete Data</h1>
              <p>
                Enter your details below to delete your data from SML platform
              </p>
            </div>
            {/*  */}
            <div className="my-4">
              <div className="mb-4">
                <label className="label-flex">Full name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={inputs.name}
                  onChange={handleInputs}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="label-flex">Email address</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  value={inputs.email}
                  onChange={handleInputs}
                  autoComplete="off"
                  required
                />
              </div>
              <div>
                <label className="label-flex">Mobile number</label>
                <input
                  type="number"
                  className="input"
                  name="mobile"
                  value={inputs.mobile}
                  onChange={handleInputs}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-end">
            <p className={`mb-2 ${error ? "text-danger" : "text-success"}`}>
              {message}
            </p>
            <button className="button" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
