import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Lottie from "react-lottie";
import successPayment from "../assets/data/SuccessPayment.json";
import failedPayment from "../assets/data/FailedPayment.json";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FaHome, FaPhoneAlt } from "react-icons/fa";

const ConfirmPayment = () => {
  const { url, user, setUser, getToken } = useContext(AppContext);
  const { merchantTransactionId } = useParams();
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const confirmPayment = async () => {
    try {
      const token = await getToken();
      const data = {
        merchantTransactionId,
        userID: user.id,
        token,
      };

      const res = await axios.post(`${url}/confirmpayment`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success === true) {
        setPaymentSuccess(true);
        setPaymentSummary(res.data.response);

        // Update user step and navigate properly
        setUser((prevUser) => ({
          ...prevUser,
          Step: "4",
          Payment_Status: "Paid",
        }));
      } else {
        setPaymentSuccess(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    confirmPayment();
  }, []);

  //
  const successPaymentOption = {
    loop: true,
    autoplay: true,
    animationData: successPayment,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const failedPaymentOption = {
    loop: true,
    autoplay: true,
    animationData: failedPayment,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="full-height-container p-2">
        {paymentSuccess === null ? (
          <Loader message="Loading payment status" color={"white"} />
        ) : (
          <div
            className="container successful-payment-grid glass pt-4 p-2"
            data-aos="zoom-in"
          >
            {paymentSuccess === false ? (
              <div className="text-center">
                <h2>Payment Failed</h2>
                <div className="lottie-box">
                  <Lottie options={failedPaymentOption} />
                </div>
                <Link to="/steps" className="secondary-button d-inline-block">
                  Try again
                </Link>
              </div>
            ) : (
              <>
                {paymentSummary !== null ? (
                  <>
                    <div>
                      <div className="text-center">
                        <h2 className="mb-2">{paymentSummary.message}</h2>
                        <h2 className="mb-2">
                          Amount: Rs.{paymentSummary.data.amount / 100}
                        </h2>
                      </div>
                      <div className="lottie-box">
                        <Lottie options={successPaymentOption} />
                      </div>
                      <h2>Thank You for Choosing Settle My Loan!</h2>
                      <p>
                        Your enrollment has been successfully confirmed! We're
                        excited to help you take the first step toward financial
                        freedom.
                      </p>
                    </div>
                    <div className="my-4">
                      <h2>What's Next?</h2>
                      <ul>
                        <li>
                          Our team will review your details and reach out to
                          discuss your customized{" "}
                          <span>loan settlement plan</span>.
                        </li>
                        <li className="my-2">
                          We'll negotiate with your <span>creditors</span> to
                          reduce your debt burden and{" "}
                          <span>stop harassment</span>.
                        </li>
                        <li>
                          You'll receive a <span>clear</span>,{" "}
                          <span>actionable plan</span> to settle your loans
                          faster and stress-free
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="mb-2">Need Immediate Assistance?</h2>
                      <p className=" mb-2">
                        <FaPhoneAlt className="secondary-text me-2" />
                        <span>
                          Call us at{" "}
                          <a
                            href="tel:+918657953453"
                            className="button secondary-button mx-3 d-inline-block text-white"
                          >
                            8657953453
                          </a>{" "}
                          (9 AM - 7 PM, Monday to Saturday)
                        </span>
                      </p>
                    </div>
                    <div className="text-end mt-4">
                      <Link
                        to="/"
                        className="secondary-button green-hover d-inline-block"
                      >
                        Home <FaHome />
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ConfirmPayment;
