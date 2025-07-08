import React, { useContext, useEffect, useState } from "react";
import SubscriptionCard from "./SubscriptionCard";
import happy from "../../assets/images/customer-service.png";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Introduction from "../Introduction";
import Steps from "../Steps";
import { FaRupeeSign, FaTimes } from "react-icons/fa";
import congratspoints from "../../assets/data/congratspoints";
import confetti from "../../assets/images/confetti.png";

const Step3 = () => {
  const { url, user, setUser, getToken } = useContext(AppContext);

  const [congratsModal, setCongratsModal] = useState(false);
  const getUser = async () => {
    try {
      const smlUser = localStorage.getItem("sml-platform-user");
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${JSON.parse(
          smlUser
        )}`,
        {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
        }
      );
      const data = res.data.data[0];
      for (let item in data) {
        if (data[item] === null) {
          data[item] = "";
        }
      }
      //
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  const [cardDetails, setCardDetails] = useState([
    {
      emi: 0,
      months: 12,
      subscription: 0,
      total: 0,
    },
    {
      emi: 0,
      months: 24,
      subscription: 0,
      total: 0,
    },
    {
      emi: 0,
      months: 36,
      subscription: 0,
      total: 0,
    },
    {
      emi: 0,
      months: 48,
      subscription: 0,
      total: 0,
    },
  ]);
  //
  useEffect(() => {
    const updatedCardDetails = cardDetails.map((item) => {
      const totalOutstanding =
        parseFloat(user.Personal_Loan_Debt) +
        parseFloat(user.Credit_Card_Debt) +
        parseFloat(user.App_Loan_Debt);
      const emi = (parseFloat(totalOutstanding) / 2 / item.months).toFixed(0);
      //
      let subscription = 0;
      if (totalOutstanding >= 3000000) {
        subscription = 2999;
      } else if (totalOutstanding >= 2000000) {
        subscription = 2599;
      } else if (totalOutstanding >= 1000000) {
        subscription = 1999;
      } else if (totalOutstanding >= 500000) {
        subscription = 1299;
      } else if (totalOutstanding >= 100000 || totalOutstanding < 100000) {
        subscription = 649;
      }
      //
      const total = parseFloat(emi) + parseFloat(subscription);
      //
      return {
        ...item,
        emi: parseFloat(emi),
        total,
        subscription,
      };
    });
    setCardDetails(updatedCardDetails);
  }, [user]);
  //
  const payment = async () => {
    try {
      const data = {
        name: user.Full_Name,
        amount: 599,
        mobile: user.Phone,
        merchantUserID: `MUID${Date.now()}`,
        merchantTransactionID: `T${Date.now()}`,
      };
      const res = await axios.post(`${url}/initiatepayment`, data);
      if (res.data.success === true) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  return (
    <>
      <div className="container p-2">
        <div>
          <Introduction
            content={
              "After reviewing all the information, your tailored solutions are below"
            }
          />
          <Steps />
        </div>
        <div>
          <div>
            <h1 className="text-center">
              Congratulations! You qualify for a debt free plan
            </h1>
            <div className="congrats-flex">
              <div className="p-2">
                <img src={happy} alt="" />
              </div>
              <div>
                <p>
                  We will negotiate with all your creditors to settle debts for
                  less than the owed amount. This can involve lump-sum payments
                  or structured settlements, reducing the total debt and making
                  it easier for you to become debt-free.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-center mb-3">Choose your debt free plan</h2>
            <div className="subscription-container">
              <div className="subscription-container-grid">
                {cardDetails.map((item, index) => {
                  return (
                    <SubscriptionCard
                      key={index}
                      item={item}
                      setCongratsModal={setCongratsModal}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal-background ${congratsModal ? "active" : ""}`}>
        <div className="modal-container">
          <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-start gap-2">
                <h2>Congratulations</h2>
                <div className="confetti">
                  <img src={confetti} alt="" />
                </div>
              </div>
              <div
                className="close-modal"
                onClick={() => setCongratsModal(false)}
              >
                <FaTimes />
              </div>
            </div>
            <p className="fw-bold">
              Enroll now for only ₹599 to become debt free
            </p>
          </div>

          <div className="mt-2">
            <div className="my-4">
              {congratspoints.map((item, index) => {
                return (
                  <div className="important-flex" key={index}>
                    <p className="circle-list">{index + 1}</p>
                    <p>{item.point}</p>
                  </div>
                );
              })}
            </div>
            <button
              className="button w-100"
              id="initiate-checkout"
              onClick={payment}
            >
              <span>Start Now!</span>
              <br />
              <span>
                Pay <FaRupeeSign />
                599
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3;
