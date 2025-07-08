import React, { useContext, useEffect, useState } from "react";
import MainLinks from "../components/MainLinks";
import Banner from "../components/Banner";
import "../assets/css/creditors.css";
import { AppContext } from "../context/AppContext";

const Creditors = () => {
  const { user } = useContext(AppContext);
  //
  const [data, setData] = useState([]);
  useEffect(() => {
    if (user !== null) {
      setData(user.Other_Debt_Details);
    }
  }, [user]);
  return (
    <>
      <div className="container full-height-container p-2">
        <Banner />
        <div className="home-page-div">
          <MainLinks />
        </div>
        <div className="p-2 table-container creditors-table">
          <div className="my-table-head mb-2">
            <p>Sr</p>
            <p>Creditors Name</p>
            <p>Loan Account Number</p>
            <p>Bank Type</p>
            <p>Loan Type</p>
            <p>Account Status</p>
            <p>No. of EMI Missed</p>
            <p>Balance O/S</p>
            <p>New Balance O/S</p>
            <p>Our Fees + GST</p>
            <p>Actual Settlement</p>
            <p>Settlement Date</p>
            <p>Settlement Waiver</p>
            <p>Old Subform Record ID</p>
          </div>
          {data.map((item, index) => {
            return (
              <div
                className={`my-table-body mb-2 ${
                  index % 2 === 0 ? "even" : "odd"
                }`}
                key={index}
              >
                <p>{index + 1}</p>
                <p>{item.Creditors_Name?.name || "-"}</p>
                <p>{item.Loan_Account_Number || "-"}</p>
                <p>{item.Bank_Type || "-"}</p>
                <p>{item.Loan_Type || "-"}</p>
                <p>{item.Account_Status1 || "-"}</p>
                <p>{item.No_of_EMI_Missed || "-"}</p>
                <p>{item.Balance_O_S || "-"}</p>
                <p>{item.New_Balance_O_S || "-"}</p>
                <p>{item.Our_Fees_Inclusive_Of_GST || "-"}</p>
                <p>{item.Actual_Settlement || "-"}</p>
                <p>{item.Settlement_Date || "-"}</p>
                <p>{item.Settlement_Waiver || "-"}</p>
                <p>{item.Old_Subform_Record_ID || "-"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Creditors;
