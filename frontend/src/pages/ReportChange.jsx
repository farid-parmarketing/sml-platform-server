import React, { useContext, useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const ReportChange = () => {
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
            Department: "CC",
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
        <GoBack title="Report Change" />

        <p className="fw-bold">What do you need to tell us about?</p>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Work & earnings</p>
            <p>
              Includes employment, self-employment, sick pay, and maternity
              allowence
            </p>
          </div>
          <button
            className="button"
            onClick={() => openModal("Work & earnings")}
          >
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Creditor's details</p>
            <p>
              change in any of your creditor's, creditor's NEFT details,
              settlements of any of the debts we are managing
            </p>
          </div>
          <button
            className="button"
            onClick={() => openModal("Creditor's details")}
          >
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Bank details</p>
            <p>Includes bank, NEFT, and account number</p>
          </div>
          <button className="button" onClick={() => openModal("Bank details")}>
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Personal details</p>
            <p>Includes name, date of birth, email, and phone number</p>
          </div>
          <button
            className="button"
            onClick={() => openModal("Personal details")}
          >
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">Where you live and what it cost</p>
            <p>
              Includes address, rent or home loan (mortgage), and service
              (maintenance) charges
            </p>
          </div>
          <button
            className="button"
            onClick={() => openModal("Where you live and what it cost")}
          >
            Report change
          </button>
        </div>
        <hr />
        <div className="rc-ques-flex">
          <div>
            <p className="fw-bold">
              Any other changes that would affect the PDP
            </p>
            <p>hospitalised, caring for family, medication cost</p>
          </div>
          <button
            className="button"
            onClick={() =>
              openModal("Any other changes that would affect the PDP")
            }
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

export default ReportChange;
