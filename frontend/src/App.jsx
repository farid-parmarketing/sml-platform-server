import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Steps from "./pages/Steps";
import Auth from "./auth/Auth";
import ConfirmPayment from "./pages/ConfirmPayment";
import AOS from "aos";
import "aos/dist/aos.css";
import Signin from "./pages/Signin";
import Welcome from "./pages/Welcome";
import ForgotPassword from "./pages/ForgotPassword";
import Creditors from "./pages/Creditors";
import Profile from "./pages/Profile";
import AccountManager from "./pages/AccountManager";
import Journal from "./pages/Journal";
import ReportChange from "./pages/ReportChange";
import AdvocateLawyers from "./pages/AdvocateLawyers";
import ParaLegal from "./pages/ParaLegal";
import ToDo from "./pages/ToDo";
import Tickets from "./pages/Tickets";
import Payment from "./pages/Payment";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth Component={Home} />} />
        <Route path="/creditors" element={<Auth Component={Creditors} />} />
        <Route path="/profile" element={<Auth Component={Profile} />} />

        <Route
          path="/accountmanager"
          element={<Auth Component={AccountManager} />}
        />
        <Route path="/journal" element={<Auth Component={Journal} />} />
        <Route
          path="/reportchange"
          element={<Auth Component={ReportChange} />}
        />
        <Route
          path="/payments"
          element={<Auth Component={Payment} />}
        />
        <Route
          path="/advocatelawyers"
          element={<Auth Component={AdvocateLawyers} />}
        />
        <Route path="/paralegal" element={<Auth Component={ParaLegal} />} />
        <Route path="/todo" element={<Auth Component={ToDo} />} />
        <Route path="/tickets" element={<Auth Component={Tickets} />} />

        <Route path="/welcome" element={<Auth Component={Welcome} />} />
        <Route path="/steps" element={<Auth Component={Steps} />} />

        <Route
          path="/thankyou/:merchantTransactionId"
          element={<Auth Component={ConfirmPayment} />}
        />

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
