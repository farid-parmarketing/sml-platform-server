import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const AdvocateLawyers = () => {
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
            Department: "Legal",
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
        <GoBack title="Advocate & Lawyers" />

        <p className="fw-bold">
          You must tell us about any legal action that your creditor take when
          they happen.
        </p>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Harassment</p>
            <ul>
              <li>
                If you have evidence of creditor's harassment ie Call and video
                recordings
              </li>
              <li>Reply from creditors for harassment complaints</li>
            </ul>
          </div>
          <button className="button" onClick={() => openModal("Harassment")}>
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Legal notice</p>
            <ul>
              <li>Copies of legal notices received</li>
              <li>Respond to our reply of legal notice</li>
            </ul>
          </div>
          <button className="button" onClick={() => openModal("Legal notice")}>
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Arbitration</p>
            <ul>
              <li>Copies of arbitration notice</li>
              <li>Respond to our reply to the arbitration notice</li>
              <li>Notice of arbitration hearing</li>
              <li>Copies of arbitration Orders</li>
            </ul>
          </div>
          <button className="button" onClick={() => openModal("Arbitration")}>
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Bounced cheque</p>
            <ul>
              <li>Bounced cheque legal notice</li>
              <li>Bail</li>
              <li>Court hearings</li>
            </ul>
          </div>
          <button
            className="button"
            onClick={() => openModal("Bounced cheque")}
          >
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Other Legal Services</p>
            <ul>
              <li>Other legal matters</li>
              <li>Ombudsman reply</li>
              <li>Compensation awards</li>
            </ul>
          </div>
          <button
            className="button"
            onClick={() => openModal("Other Legal Services")}
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

export default AdvocateLawyers;
