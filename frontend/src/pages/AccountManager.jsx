import React from "react";
import { Link } from "react-router-dom";
import GoBack from "../components/GoBack";

const AccountManager = () => {
  return (
    <>
      <div className="container full-height-container p-2">
        <GoBack title="Account manager" />
        <p>
          Your account manager is <span className="fw-bold">Reema Pandey</span>,
          who will be your one point of contact, if you have any queries, you
          can call or chat with him.
        </p>

        <div className="am-btn-flex mt-2 mb-4">
          <button className="button">Call</button>
          <button className="button">Chat</button>
          <button className="secondary-button">Rate Us</button>
        </div>

        <p className="fw-bold">PDP management</p>
        <p>
          Your account manager will be your one point of contact with regards to
          your PDP management and any queries that you have.{" "}
          <span className="fw-bold">
            Legal matters, creditors call or visits.
          </span>
          <br />
          <br />
          With regards to any legal matters, creditors call or visit, you will
          initially need to contact your account manager who will direct you to
          our advocates and para legal, who will deal with any of these matters
          thereafter.
          <br />
          <br />
          If you have any queries you might find the answer in our FAQ and our
          service brochure, please check these out first.
        </p>

        <ul className="list-unstyled mt-4">
          <li>
            <Link to="/">Terms & Conditions</Link>
          </li>
          <li>
            <Link to="/">Privacy policy</Link>
          </li>
          <li>
            <Link to="/">FAQ</Link>
          </li>
          <li>
            <Link to="/">SML service brochure</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AccountManager;
