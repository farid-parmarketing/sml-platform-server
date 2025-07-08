import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { FaInfoCircle } from "react-icons/fa";
import LabelInfo from "../LabelInfo";
import Introduction from "../Introduction";
import Steps from "../Steps";

const Step1 = () => {
  const {
    url,
    user,
    step,
    setStep,
    preventChange,
    preventScroll,
    infoData,
    infoTooltip,
    showInfoModal,
    setShowInfoModal,
    infoModalData,
    setInfoModalData,
    infoTags,
    addInfoTags,
    getToken,
  } = useContext(AppContext);
  //
  const [inputs, setInputs] = useState({
    personalLoanDebt:
      user.Personal_Loan_Debt === "" ? "" : user.Personal_Loan_Debt,
    creditCardDebt: user.Credit_Card_Debt === "" ? "" : user.Credit_Card_Debt,
    appLoanDebt: user.App_Loan_Debt === "" ? "" : user.App_Loan_Debt,
  });
  const [errors, setErrors] = useState({
    personalLoanDebt: "",
    creditCardDebt: "",
    appLoanDebt: "",
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
  const [modalVisible, setModalVisible] = useState(false);
  //
  const [message, setMessage] = useState("");
  const proceed = () => {
    const { personalLoanDebt, creditCardDebt, appLoanDebt } = inputs;

    if (!personalLoanDebt) {
      setErrors({
        ...errors,
        personalLoanDebt:
          "Please enter personal loan debt amount. (Enter 0 if you don't have any personal loan debt)",
      });
      return;
    }
    if (!creditCardDebt) {
      setErrors({
        ...errors,
        creditCardDebt:
          "Enter credit card debt amount. (Enter 0 if you don't have any credit card loan debt)",
      });
      return;
    }
    if (!appLoanDebt) {
      setErrors({
        ...errors,
        appLoanDebt:
          "Enter app loan debt amount. (Enter 0 if you don't have any app loan debt)",
      });
      return;
    }

    setErrors({
      personalLoanDebt: "",
      creditCardDebt: "",
      appLoanDebt: "",
    });
    setModalVisible(true);
  };
  //
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  //
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    try {
      setLoading(true);
      const data = [
        {
          id: user.id,
          Step: "1",
          Personal_Loan_Debt: inputs.personalLoanDebt.toString(),
          Credit_Card_Debt: inputs.creditCardDebt.toString(),
          App_Loan_Debt: inputs.appLoanDebt.toString(),
          Total_OS_Amount: (
            parseFloat(inputs.personalLoanDebt) +
            parseFloat(inputs.creditCardDebt) +
            parseFloat(inputs.appLoanDebt)
          ).toString(),
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
        setModalVisible(false);
        setStep("1");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };
  //
  useEffect(() => {
    if (modalVisible) {
      setMessage("");
    }
  }, [modalVisible]);
  //
  //
  useEffect(() => {
    if (user !== null) {
      if (user.personalLoanDebt) {
        setInputs({
          personalLoanDebt: user.personalLoanDebt,
          creditCardDebt: user.creditCardDebt,
          appLoanDebt: user.appLoanDebt,
        });
      }
    }
  }, [user]);
  //
  useEffect(() => {
    if (infoTags.current.length !== 0 && infoData) {
      infoTags.current.forEach((item, index) => {
        item.addEventListener("mouseenter", function (e) {
          setShowInfoModal(true);
          setInfoModalData(infoData[index].data);
          infoTooltip.current.style.top = e.clientY + "px";
          infoTooltip.current.style.left = e.clientX + "px";
        });
      });
      //
      infoTags.current.forEach((item) => {
        item.addEventListener("mouseleave", function (e) {
          setShowInfoModal(false);
        });
      });
    }
  }, [step, infoTags]);
  return (
    <div className="container p-2">
      <div>
        <Introduction content={"Please share details about your debts."} />
        <Steps />
      </div>
      <div>
        <h1>Tell us about your debts</h1>
        <div className="step1-container mt-4">
          <div className="mb-4">
            <div className="info-label">
              <label>
                Personal loan debt amount <span className="text-danger">*</span>
              </label>
              <div className="info-tag" ref={addInfoTags}>
                <FaInfoCircle />
              </div>
            </div>
            <input
              type="number"
              className="input"
              name="personalLoanDebt"
              value={inputs.personalLoanDebt}
              onChange={handleInputs}
              onKeyDown={preventChange}
              onWheel={preventScroll}
            />
            <small className="text-danger">{errors.personalLoanDebt}</small>
          </div>
          <div className="mb-4">
            <div className="info-label">
              <label>
                Credit card debt amount <span className="text-danger">*</span>
              </label>
              <div className="info-tag" ref={addInfoTags}>
                <FaInfoCircle />
              </div>
            </div>
            <input
              type="number"
              className="input"
              name="creditCardDebt"
              value={inputs.creditCardDebt}
              onChange={handleInputs}
              onKeyDown={preventChange}
              onWheel={preventScroll}
            />
            <small className="text-danger">{errors.creditCardDebt}</small>
          </div>
          <div className="mb-4">
            <div className="info-label">
              <label>
                App loan debt amount <span className="text-danger">*</span>
              </label>
              <div className="info-tag" ref={addInfoTags}>
                <FaInfoCircle />
              </div>
            </div>
            <input
              type="number"
              className="input"
              name="appLoanDebt"
              value={inputs.appLoanDebt}
              onChange={handleInputs}
              onKeyDown={preventChange}
              onWheel={preventScroll}
            />
            <small className="text-danger">{errors.appLoanDebt}</small>
          </div>
        </div>
        <p className="text-danger text-end">{message}</p>
        <div className="d-flex align-items-center justify-content-end gap-2 mt-2">
          <button className="button" onClick={proceed}>
            Proceed
          </button>
        </div>

        {/*  */}
        <div className={`modal-background ${modalVisible ? "active" : ""}`}>
          <div className="modal-container">
            <div className="step1-summary">
              <h2 className="mb-2 fw-bold">Debt Details Summary</h2>
              <div className="summary-flex">
                <p>Personal loan debt amount</p>
                <p>
                  Rs{" "}
                  {parseFloat(inputs.personalLoanDebt).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="summary-flex">
                <p>Credit card debt amount</p>
                <p>
                  Rs.{" "}
                  {parseFloat(inputs.creditCardDebt).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="summary-flex">
                <p>app loan debt amount</p>
                <p>
                  Rs. {parseFloat(inputs.appLoanDebt).toLocaleString("en-IN")}
                </p>
              </div>
              <hr />
              <div className="summary-flex mt-2">
                <p className="fw-bold">Total debts outstanding</p>
                <p
                  className="primary-pill text-center"
                  style={{ minWidth: "100px" }}
                >
                  Rs.{" "}
                  {(
                    parseFloat(inputs.personalLoanDebt) +
                    parseFloat(inputs.creditCardDebt) +
                    parseFloat(inputs.appLoanDebt)
                  ).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
              <button
                className="red-button w-100"
                onClick={() => setModalVisible(false)}
              >
                cancel
              </button>
              <button
                className="button w-100"
                id="step1-submit"
                onClick={submit}
              >
                {loading ? (
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
          </div>
        </div>

        {/*  */}
        <LabelInfo
          showInfoModal={showInfoModal}
          infoModalData={infoModalData}
        />
      </div>
    </div>
  );
};

export default Step1;
