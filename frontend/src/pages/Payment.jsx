import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import PaymentCard from "../components/PaymentCard";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loader from "../components/Loader";

const Payment = () => {
  const { url, user, getToken, notifySuccess } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProforma = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${user.id}/Proforma_Invoice`,
        {
          headers: {
            Authorization: `Zoho-oauthtoken ${token}`,
          },
        }
      );
      if (res.status === 200) {
        const data = res.data.data;
        data.forEach((item) => {
          Object.keys(item).forEach((key) => {
            item[key] = item[key] ?? "";
          });
        });
        console.log(data);
        //
        setData(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user !== null) {
      getProforma();
    }
  }, [user]);
  return (
    <>
      <div className="container full-height-container p-2">
        <GoBack title="Payments" />

        <div>
          {loading === true ? (
            <Loader message="payments" />
          ) : (
            <>
              {data.length === 0 ? (
                <p className="text-center">No payments found</p>
              ) : (
                <div className="payment-grid">
                  {data.map((item, index) => {
                    return <PaymentCard item={item} key={index} />;
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Payment;
