import React, { useContext } from "react";
import MainLinks from "../components/MainLinks";
import Banner from "../components/Banner";
import { AppContext } from "../context/AppContext";
import CircularBar from "../components/CircularBar";
import { FaRupeeSign } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <div className="container full-height-container p-2">
        <Banner />
        <div className="home-page-div">
          <MainLinks />
        </div>

        {/*  */}
        {user !== null && (
          <>
            <div>
              <p className="fw-bold mb-2">Personal details</p>
              <div className="profile-details-grid">
                <div>
                  <p>Name</p>
                  <p className="fw-bold">{user.Full_Name || "-"}</p>
                </div>
                <div>
                  <p>Phone number</p>
                  <p className="fw-bold">{user.Phone || "-"}</p>
                </div>
                <div className="profile-email-div">
                  <p>Email address</p>
                  <p className="fw-bold">{user.Email || "-"}</p>
                </div>
                <div>
                  <p>Date of birth</p>
                  <p className="fw-bold">
                    {user.Date_Of_Birth !== "" && <FaRupeeSign />}
                    {user.Date_Of_Birth || "-"}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p className="fw-bold mb-2">Finances</p>
              <div className="profile-details-grid">
                <div>
                  <p>App loan</p>
                  <p className="fw-bold">
                    {user.App_Loan_Debt !== "" && <FaRupeeSign />}
                    {user.App_Loan_Debt || "-"}
                  </p>
                </div>
                <div>
                  <p>Personal loan</p>
                  <p className="fw-bold">
                    {user.Personal_Loan_Debt !== "" && <FaRupeeSign />}
                    {user.Personal_Loan_Debt || "-"}
                  </p>
                </div>
                <div>
                  <p>Credit card debt</p>
                  <p className="fw-bold">
                    {user.Credit_Card_Debt !== "" && <FaRupeeSign />}
                    {user.Credit_Card_Debt || "-"}
                  </p>
                </div>
                <div>
                  <p>Total outstanding amount</p>
                  <p className="fw-bold">
                    {user.Total_OS_Amount !== "" && <FaRupeeSign />}
                    {user.Total_OS_Amount || "-"}
                  </p>
                </div>
                <div>
                  <p>Income</p>
                  <p className="fw-bold">
                    {user.Total_monthly_income !== "" && <FaRupeeSign />}
                    {user.Total_monthly_income || "-"}
                  </p>
                </div>
                <div>
                  <p>Expense</p>
                  <p className="fw-bold">
                    {user.Total_of_living_expenses !== "" && <FaRupeeSign />}
                    {user.Total_of_living_expenses || "-"}
                  </p>
                </div>
                <div>
                  <p>Dispossible income</p>
                  <p className="fw-bold">
                    {user.Disposable_Income_DI !== "" && <FaRupeeSign />}
                    {user.Disposable_Income_DI || "-"}
                  </p>
                </div>
                <div className="di-percent-flex">
                  <p>DI percentage</p>
                  <CircularBar percent={parseFloat(user.DI)} />
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p className="fw-bold mb-2">Plan details</p>
              <div className="profile-details-grid">
                <div>
                  <p>Subscription Period</p>
                  <p className="fw-bold">
                    {`${user.Choose_your_Debt_Free_Plan_DFP} months`}
                  </p>
                </div>
                <div>
                  <p>SML EMI</p>
                  <p className="fw-bold">
                    {user.SML_EMI !== "" && <FaRupeeSign />}
                    {user.SML_EMI || "-"}
                  </p>
                </div>
                <div>
                  <p>Subscription fee</p>
                  <p className="fw-bold">
                    {user.Subscription_Fees !== "" && <FaRupeeSign />}
                    {user.Subscription_Fees || "-"}
                  </p>
                </div>
                <div>
                  <p>Final Amount</p>
                  <p className="fw-bold">
                    {user.Total_SML_EMI !== "" && <FaRupeeSign />}
                    {user.Total_SML_EMI || "-"}
                  </p>
                </div>
                <div>
                  <p>Amount paid</p>
                  <p className="fw-bold">
                    {user.Payment_Amount !== "" && <FaRupeeSign />}
                    {user.Payment_Amount || "-"}
                  </p>
                </div>

                <div>
                  <p>Payment date</p>
                  <p className="fw-bold">
                    {user.Payment_Date.split("-").reverse().join("-") || "-"}
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p className="fw-bold mb-2">Account details</p>
              <div className="profile-details-grid">
                <div>
                  <p>Account status</p>
                  <p className="fw-bold">{user.Account_Status || "-"}</p>
                </div>
                <div>
                  <p>Reference number</p>
                  <p className="fw-bold">{user.Reference_Number || "-"}</p>
                </div>
                <div>
                  <p>Source</p>
                  <p className="fw-bold">{user.Sources || "-"}</p>
                </div>
                <div>
                  <p>Account ID</p>
                  <p className="fw-bold">{user.id || "-"}</p>
                </div>
                <div>
                  <p>Transaction number</p>
                  <p className="fw-bold">
                    {user.Transaction_Reference_No || "-"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
