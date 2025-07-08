import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { FaInfoCircle } from "react-icons/fa";
import LabelInfo from "../LabelInfo";
import Introduction from "../Introduction";
import Steps from "../Steps";

const Step2 = () => {
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
    totalIncome:
      user.Total_monthly_income === "" ? "" : user.Total_monthly_income,
    totalExpense:
      user.Total_of_living_expenses === "" ? "" : user.Total_of_living_expenses,
  });
  const [errors, setErrors] = useState({
    totalIncome: "",
    totalExpense: "",
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
  const proceed = () => {
    const { totalIncome, totalExpense } = inputs;
    if (!totalIncome) {
      setErrors({
        ...errors,
        totalIncome: "Please enter your total income",
      });
      return;
    }
    if (!totalExpense) {
      setErrors({
        ...errors,
        totalExpense: "Please enter your total exponse",
      });
      return;
    }

    setErrors({
      totalIncome: "",
      totalExpense: "",
    });
    setModalVisible(true);
  };
  //
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    try {
      setLoading(true);
      const { totalIncome, totalExpense } = inputs;
      const dispossibleIncome = totalIncome - totalExpense;
      const dispossibleIncomePercent = (
        ((totalIncome - totalExpense) / totalIncome) *
        100
      ).toFixed(2);
      //
      const data = [
        {
          id: user.zohoID,
          Step: "2",
          Total_monthly_income: totalIncome.toString(),
          Total_of_living_expenses: totalExpense.toString(),
          DI: dispossibleIncomePercent.toString(),
          Disposable_Income_DI: dispossibleIncome.toString(),
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
        setStep("2");
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
    if (message !== "") {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, []);
  //
  useEffect(() => {
    if (user !== null) {
      if (user.totalIncome && user.totalExpense) {
        setInputs({
          totalIncome: user.totalIncome,
          totalExpense: user.totalExpense,
        });
      }
    }
  }, [user]);
  //
  useEffect(() => {
    if (infoTags.current.length !== 0) {
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
    <div className="container">
      <div className="p-2">
        <Introduction
          content={"Please share about your income and expense details."}
        />
        <Steps />
      </div>
      <div className="p-2">
        <div>
          <h1 className="mb-4">Total Income & Total expense</h1>

          <div className="mb-4">
            <div className="info-label">
              <label>
                Total income <span className="text-danger">*</span>
              </label>
              <div className="info-tag" ref={addInfoTags}>
                <FaInfoCircle />
              </div>
            </div>
            <input
              type="number"
              className="input"
              name="totalIncome"
              value={inputs.totalIncome}
              onChange={handleInputs}
              onKeyDown={preventChange}
              onWheel={preventScroll}
            />
            <small className="text-danger">{errors.totalIncome}</small>
          </div>
          <div className="mb-4">
            <div className="info-label">
              <label>
                Total expense <span className="text-danger">*</span>
              </label>
              <div className="info-tag" ref={addInfoTags}>
                <FaInfoCircle />
              </div>
            </div>
            <input
              type="number"
              className="input"
              name="totalExpense"
              value={inputs.totalExpense}
              onChange={handleInputs}
              onKeyDown={preventChange}
              onWheel={preventScroll}
            />
            <small className="text-danger">{errors.totalExpense}</small>
          </div>
        </div>
        <div className="text-end mt-2">
          <p className="text-danger">{message !== "" && `${message}`}</p>
          <button className="button" onClick={proceed}>
            Proceed
          </button>
        </div>

        {/*  */}
        <div className={`modal-background ${modalVisible ? "active" : ""}`}>
          <div className="modal-container">
            <div className="step1-summary">
              <h2 className="mb-2 fw-bold">Total Income & total expense</h2>
              <div className="summary-flex">
                <p className="text-capitalize">Total income</p>
                <p>
                  Rs {parseFloat(inputs.totalIncome).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="summary-flex">
                <p className="text-capitalize">Total expense</p>
                <p>
                  Rs. {parseFloat(inputs.totalExpense).toLocaleString("en-IN")}
                </p>
              </div>

              <hr />
              <div className="summary-flex mt-2">
                <p className="fw-bold text-capitalize">Dispossible amount</p>
                <p
                  className="primary-pill text-center"
                  style={{ minWidth: "100px" }}
                >
                  Rs.{" "}
                  {(
                    parseFloat(inputs.totalIncome) -
                    parseFloat(inputs.totalExpense)
                  ).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="summary-flex mt-2">
                <p className="fw-bold text-capitalize">Dispossible percent</p>
                <p
                  className="primary-pill text-center"
                  style={{ minWidth: "100px" }}
                >
                  {(
                    ((parseFloat(inputs.totalIncome) -
                      parseFloat(inputs.totalExpense)) /
                      parseFloat(inputs.totalIncome)) *
                    100
                  ).toFixed(2)}
                  %
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
                id="step2-submit"
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

export default Step2;
