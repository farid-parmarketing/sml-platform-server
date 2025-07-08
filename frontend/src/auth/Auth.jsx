import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Auth = ({ Component }) => {
  const { url, user, setUser, setStep, getToken, welcomeDone } =
    useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const auth = async () => {
    try {
      const storedUser = localStorage.getItem("sml-platform-user");
      if (!storedUser) return navigate("/login", { replace: true });

      const token = await getToken();
      if (!token) return navigate("/login", { replace: true });

      const userId = JSON.parse(storedUser);
      const res = await axios.get(
        `${url}/proxy?url=https://www.zohoapis.in/crm/v2/Leads/${userId}`,
        {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
        }
      );

      if (res.status === 204) {
        localStorage.removeItem("sml-platform-user");
        return navigate("/login", { replace: true });
      }

      const data = { ...res.data.data[0] };

      // Replace nulls with empty strings
      Object.keys(data).forEach((key) => {
        data[key] = data[key] ?? "";
      });
      setUser(data);
      setStep(data.Step?.toString() || "");

      const step = data.Step?.toString();
      const isPaid = data.Payment_Status?.toLowerCase() === "paid";

      if (!step && !welcomeDone) {
        navigate("/welcome", { replace: true });
      } else if (step < "4" && !data.Payment_Status) {
        if (!location.pathname.startsWith("/thankyou")) {
          navigate("/steps", { replace: true });
        }
      } else if (step === "4" && isPaid) {
        // All good, stay on page
        return;
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  useEffect(() => {
    auth();
    window.scrollTo(0, 0);
  }, [location.pathname, welcomeDone]);

  return user ? (
    <>
      <Navbar />
      <Component />
      <Footer />
    </>
  ) : null;
};

export default Auth;
