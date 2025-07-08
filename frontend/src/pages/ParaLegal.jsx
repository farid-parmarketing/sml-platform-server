import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ParaLegal = () => {
  const { url, user, getToken, notifySuccess } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  //
  const openModal = (title) => {
    setModalTitle(title);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalTitle("");
    setInput("");
    setError("");
    setModalVisible(false);
  };
  //
  const sendReply = async () => {
    if (input === "") {
      setError("Enter your message");
    } else {
      setLoading(true);
      try {
        const data = [
          {
            Client_Comments: input,
            Lead_Name: user.id,
            Department: "Para legal",
            Title: modalTitle,
          },
        ];
        const token = await getToken();
        const res = await axios.post(
          `${url}/proxy?url=https://www.zohoapis.in/crm/v2/SML_Portal`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Zoho-oauthtoken ${token}`,
            },
          }
        );
        if (res.status === 201) {
          notifySuccess("Message sent!");
          setModalVisible(false);
          setModalTitle("");
          setInput("");
          setError("");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  //
  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);
  return (
    <>
      <div className="container full-height-container p-2">
        <GoBack title="Para Legal" />

        <p className="fw-bold">
          You must tell us about any legal action that your creditor take when
          they happen.
        </p>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Call</p>
            <ul>
              <li>Unable to get through to us</li>
              <li>Have recordings of abusive calls</li>
              <li>Other issues with calls</li>
            </ul>
          </div>
          <button className="button" onClick={() => openModal("Call")}>
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Visits (Home / Office / Work place)</p>
            <ul>
              <li>Video of creditors harassment</li>
              <li>If creditors are at home or place of work and need help</li>
            </ul>
          </div>
          <button
            className="button"
            onClick={() => openModal("Visits (Home / Office / Work place)")}
          >
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Call forwarding</p>
            <ul>
              <li>Need help with call forwarding</li>
              <li>Having problems to forward calls</li>
            </ul>
          </div>
          <button
            className="button"
            onClick={() => openModal("Call forwarding")}
          >
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Other Creditor Issues</p>
            <ul>
              <li>Other issues you are experiencing with creditors</li>
            </ul>
          </div>
          <button
            className="button"
            onClick={() => openModal("Other Creditor Issues")}
          >
            Report change
          </button>
        </div>
        <hr />
      </div>

      <div className={`modal-background ${modalVisible ? "active" : ""}`}>
        <div className="modal-container">
          <div>
            <p className="fw-bold mb-2">{modalTitle}</p>
            <textarea
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <p className="text-danger">{error}</p>
          </div>
          <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
            <button className="red-button w-100" onClick={closeModal}>
              cancel
            </button>
            <button
              className="button w-100"
              id="step1-submit"
              onClick={sendReply}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParaLegal;
