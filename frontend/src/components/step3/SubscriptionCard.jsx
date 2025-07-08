import React, { useContext, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const SubscriptionCard = ({ item, setCongratsModal }) => {
  const { url, setPlan, user, getToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    setPlan({
      months: parseFloat(item.months),
      emi: parseFloat(item.emi),
      total: parseFloat(item.total),
    });
    //
    try {
      setLoading(true);
      const data = [
        {
          id: user.zohoID,
          Subscription_Fees: item.subscription.toString(),
          Choose_your_Debt_Free_Plan_DFP: item.months.toString(),
          SML_EMI: item.emi.toString(),
          Total_SML_EMI: item.total.toString(),
          Step: "3",
        },
      ];
      const token = await getToken();
      const res = await axios.put(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${user.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setCongratsModal(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="subscription-card">
        <div className="subscription-header">
          <h1>{item.months.toLocaleString()} months</h1>
        </div>
        {/*  */}
        <div className="subscription-body">
          <div className="subscription-flex">
            <p>Monthly EMI</p>
            <p>
              <FaRupeeSign />
              {item.emi.toLocaleString()}
            </p>
          </div>
          <div className="subscription-flex">
            <p>Subscription</p>
            <p>
              <FaRupeeSign />
              {item.subscription.toLocaleString()}
            </p>
          </div>
          <div className="subscription-flex total">
            <p>One Time Fee</p>
            <p>
              <FaRupeeSign />
              599
            </p>
          </div>
          <div className="subscription-flex">
            <p>Total</p>
            <p>
              <FaRupeeSign />
              {item.total.toLocaleString()}
            </p>
          </div>
        </div>
        {/*  */}
        <div className="text-center">
          <button
            className="secondary-button"
            id="select-plan"
            style={{ minWidth: "150px" }}
            onClick={submit}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Select Plan"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCard;
