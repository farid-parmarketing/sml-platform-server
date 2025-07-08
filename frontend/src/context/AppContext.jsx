import axios from "axios";
import React, { createContext, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const url = "https://platform-api.settlemyloan.in";
  const [step, setStep] = useState("");
  const [user, setUser] = useState(null);
  //
  const preventChange = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };
  const preventScroll = (e) => {
    if (e.target.focus === true) {
      e.preventDefault();
    }
  };
  //
  const [plan, setPlan] = useState({
    months: "",
    emi: "",
    total: "",
  });
  //
  const infoData = [
    {
      data: "Please enter the total amount of all your personal loans",
    },
    {
      data: "Please provide the total amount of your credit card debts",
    },
    {
      data: "Enter the total amount for all your app loans, payday loans, and Buy Now Pay Later (BNPL) loans",
    },
    {
      data: "Include all sources of income, such as salary, business earnings, rental income, investments, etc., on a monthly basis",
    },
    {
      data: "Provide details of your monthly expenses, including essential expenses such as rent or home loan EMIs, EMIs for secured loans (e.g., LAP, car loans), utilities (electricity, gas), mobile bills, travel/fuel, household help, school fees, medical bills, and any other recurring expenditures",
    },
  ];
  //
  const infoTooltip = useRef(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalData, setInfoModalData] = useState(false);
  //
  const infoTags = useRef([]);
  const addInfoTags = (element) => {
    if (element && !infoTags.current.includes(element)) {
      infoTags.current.push(element);
    }
  };
  //
  const getToken = async () => {
    const res = await axios.get(`${url}/token`);
    return res.data.token[0].token.toString();
  };
  //
  const [welcomeDone, setWelcomeDone] = useState(false);
  //
  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  //
  return (
    <AppContext.Provider
      value={{
        url,
        step,
        setStep,
        user,
        setUser,
        preventChange,
        preventScroll,
        plan,
        setPlan,
        infoData,
        infoTooltip,
        showInfoModal,
        setShowInfoModal,
        infoModalData,
        setInfoModalData,
        infoTags,
        addInfoTags,
        getToken,
        welcomeDone,
        setWelcomeDone,
        notifySuccess,
      }}
    >
      <ToastContainer />
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
