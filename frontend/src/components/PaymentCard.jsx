import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const PaymentCard = ({ item }) => {
  console.log(item.Status.slice(1));

  return (
    <div className={`payment-card payment-status-${item.Status.toLowerCase()}`}>
      <p>
        <span>Invoice name:</span> {item.Name}
      </p>
      <p>
        <span>Amount:</span> <FaRupeeSign />
        {item.Invoice_Amount}
      </p>
      <p>
        <span>Status:</span>{" "}
        {item.Status.slice(0, 1).toUpperCase() +
          item.Status.slice(1).toLowerCase()}
      </p>
      <p>
        <span>Payment mode:</span>
        {item.Payment_Mode}
      </p>
      <p>
        <span>Payment date:</span>
        {item.Payment_Date}
      </p>
    </div>
  );
};

export default PaymentCard;
