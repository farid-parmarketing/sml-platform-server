import React, { useContext, useState } from "react";
import SigninLeft from "../components/SigninLeft";
import logo from "../assets/images/logo.png";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import successPayment from "../assets/data/SuccessPayment.json";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { url, getToken } = useContext(AppContext);
  const navigate = useNavigate();
  //
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [sent, setSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  //
  const [inputs, setInputs] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    newPassword: "",
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
  //
  const getOTP = async () => {
    if (!inputs.email) {
      setErrors({
        ...errors,
        email: "Enter your registered email address",
      });
    } else {
      setLoading1(true);
      try {
        const token = await getToken();
        const res1 = await axios.get(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Email:equals:${inputs.email}))`,
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        if (res1.status === 204) {
          setErrors({
            ...errors,
            email: "Account not found",
          });
        } else if (res1.status === 200) {
          const data = res1.data.data[0];
          for (let item in data) {
            if (data[item] === null) {
              data[item] = "";
            }
          }
          //
          const fp_data = [
            {
              Forget_Password: true,
            },
          ];
          const res2 = await axios.put(
            `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${data.id}`,
            fp_data,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Zoho-oauthtoken ${token}`,
              },
            }
          );
          if (res2.status === 200) {
            setSent(true);
            setTimeout(() => {
              setModalVisible(false);
            }, 10000);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading1(false);
      }
    }
  };
  //
  const forgotPassword = async () => {
    if (!inputs.otp) {
      setErrors({
        ...errors,
        otp: "Enter the unique id",
      });
    } else if (!inputs.newPassword) {
      setErrors({
        ...errors,
        newPassword: "Enter a new password",
      });
    }
    try {
      setLoading2(true);
      const token = await getToken();
      const res1 = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/search?criteria=((Email:equals:${inputs.email}))`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      const data = res1.data.data[0];
      if (data.Reference_Number === inputs.otp) {
        const p_data = [
          {
            Unique: inputs.newPassword,
          },
        ];
        const res2 = await axios.put(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${data.id}`,
          p_data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        if (res2.status === 200) {
          setMessage(
            "Password updated successfully. Please login to continue."
          );
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };
  //
  const successPaymentOption = {
    loop: true,
    autoplay: true,
    animationData: successPayment,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  //
  return (
    <>
      <div className="login-container">
        <SigninLeft />
        <div className="login-right" data-aos="fade-left">
          <div className="login-logo">
            <img src={logo} alt="" />
          </div>
          <div className="my-4">
            <h2 className="fw-bold">Forgot Password</h2>
            <p>An email has been sent to you which has a unique ID</p>
          </div>
          <div className="my-4">
            <div className="form-div mb-4">
              <label className="label-flex">
                <FaEnvelope />
                Unique ID
              </label>
              <input
                type="text"
                className="input"
                name="otp"
                autoComplete="off"
                value={inputs.otp}
                onChange={handleInputs}
              />
              <p className="text-danger">{errors.otp}</p>
            </div>
            <div className="form-div mb-4">
              <label className="label-flex">
                <FaKey />
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="input"
                name="newPassword"
                autoComplete="off"
                value={inputs.newPassword}
                onChange={handleInputs}
              />
              <p className="text-danger">{errors.newPassword}</p>
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
            <p className="mt-2 text-success">{message}</p>
            <button
              className="button"
              onClick={forgotPassword}
              style={{ minWidth: "100px" }}
            >
              {loading2 ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`modal-background ${modalVisible ? "active" : ""}`}>
        <div className="modal-container">
          {sent === false ? (
            <>
              <p className="fw-bold">Enter your email address to continue</p>
              <div className="form-div my-4">
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
                <p className="text-danger">{errors.email}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                <button
                  className="red-button flex-grow-1"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  Cancel
                </button>
                <button className="button flex-grow-1" onClick={getOTP}>
                  {loading1 ? (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-center">
                A unique code has been sent to you on your email address:{" "}
                <span className="fw-bold">{inputs.email}</span>
              </p>
              <div className="lottie-box">
                <Lottie options={successPaymentOption} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
