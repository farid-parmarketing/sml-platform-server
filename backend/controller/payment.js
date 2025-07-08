import axios from "axios";
import sha256 from "sha256";
import fetch from "node-fetch";

const initiatePayment = async (req, res) => {
  try {
    const { name, amount, mobile, merchantUserID, merchantTransactionID } =
      req.body;

    const data = {
      merchantId: process.env.MERCHANT_ID,
      merchantTransactionId: merchantTransactionID,
      merchantUserId: merchantUserID,
      amount: amount * 100,
      redirectUrl: `http://localhost:3000/thankyou/${merchantTransactionID}`,
      redirectMode: "REDIRECT",
      name,
      mobileNumber: mobile,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64EncodedPayload = Buffer.from(
      JSON.stringify(data),
      "utf8"
    ).toString("base64");
    const xVerify =
      sha256(base64EncodedPayload + "/pg/v1/pay" + process.env.SALT_KEY) +
      "###" +
      process.env.KEY_INDEX;

    const options = {
      method: "POST",
      url: process.env.HOST_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      data: {
        request: base64EncodedPayload,
      },
    };

    const response = await axios.request(options);

    if (response.data.success) {
      // Send the URL back to the frontend instead of opening it in a new tab
      return res.json({
        success: true,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment initiation failed" });
    }
  } catch (error) {
    console.error("Payment initiation error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

const confirmPayment = async (req, res) => {
  try {
    const { merchantTransactionId, userID, token } = req.body;

    if (!merchantTransactionId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing transaction ID" });
    }

    const xVerify =
      sha256(
        `/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}${process.env.SALT_KEY}`
      ) +
      "###" +
      process.env.KEY_INDEX;

    const options = {
      method: "GET",
      url: `https://api.phonepe.com/apis/hermes/pg/v1/status/${process.env.MERCHANT_ID}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-MERCHANT-ID": process.env.MERCHANT_ID,
        "X-VERIFY": xVerify,
      },
    };

    const response = await axios.request(options);
    if (response.data.code === "PAYMENT_SUCCESS") {
      const today = new Date();
      let formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(
        today.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${today.getFullYear()}`;

      const data = [
        {
          Payment_Status: "Paid",
          Payment_Date: formattedDate.split("/").reverse().join("-"),
          Payment_Mode: response.data.data.paymentInstrument.type,
          Payment_Amount: (
            parseFloat(response.data.data.amount) / 100
          ).toString(),
          Transaction_Reference_No: response.data.data.merchantTransactionId,
          Step: "4",
        },
      ];

      const zres = await fetch(
        `https://www.zohoapis.in/crm/v2/Settlement/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Zoho-oauthtoken ${token}`,
          },
          body: JSON.stringify({ data }),
        }
      );

      const zresJson = await zres.json();
      if (zresJson.data && zresJson.data.length > 0) {
        return res.status(200).json({ success: true, response: response.data });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Failed to update Zoho" });
      }
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { initiatePayment, confirmPayment };
