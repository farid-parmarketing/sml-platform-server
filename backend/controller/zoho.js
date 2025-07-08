import fetch from "node-fetch";
import request from "request";

import Token from "../model/token.js";

export const generateToken = async (req, res) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append(
      "refresh_token",
      "1000.a530d33e4a344e47acfc1084c66e7e72.d1be5c5eadffbdcf72f6ad6f891c9f5a"
    );
    urlencoded.append("client_id", "1000.FJVT66QNSRUXJOLZEYRRVUOAKP064T");
    urlencoded.append(
      "client_secret",
      "c46217b322daa316db60f7c6319dd7ca088b7e49d2"
    );
    urlencoded.append("grant_type", "refresh_token");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("https://accounts.zoho.in/oauth/v2/token", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        await Token.deleteMany();
        const newToken = new Token({ token: result.access_token });
        await newToken.save();
        return res.status(200).send(newToken);
      })
      .catch((error) => console.error(error));
  } catch (error) {
    console.error("Error generating token:", error);
  }
};

export const getToken = async (req, res) => {
  try {
    const token = await Token.find({});
    if (!token) {
      return res.status(400).json({ message: "Failed to fetch token" });
    } else {
      return res.status(200).json({ token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export const postProxy = async (req, res) => {
  const url = req.query.url;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    let response;
    const headers = {
      Authorization: authorization,
    };

    if (req.is("multipart/form-data")) {
      // Handle multipart/form-data
      const form = new FormData();
      for (const key in req.body) {
        form.append(key, req.body[key]);
      }
      req.files.forEach((file) => {
        form.append(file.fieldname, file.buffer, file.originalname);
      });

      headers["Content-Type"] = form.getHeaders()["content-type"];

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: form,
      });
    } else {
      // Handle application/json
      headers["Content-Type"] = "application/json";

      response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          data: req.body,
        }),
      });
    }

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error occurred while proxying request:", error);
    return res.status(500).send({
      message: "Error occurred while proxying request",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const putProxy = async (req, res) => {
  const url = req.query.url;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  try {
    let response;
    const headers = {
      Authorization: authorization,
    };

    if (req.is("multipart/form-data")) {
      // Handle multipart/form-data
      const form = new FormData();
      for (const key in req.body) {
        form.append(key, req.body[key]);
      }
      req.files.forEach((file) => {
        form.append(file.fieldname, file.buffer, file.originalname);
      });

      headers["Content-Type"] = form.getHeaders()["content-type"];

      response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: form,
      });
    } else {
      // Handle application/json
      headers["Content-Type"] = "application/json";

      response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          data: req.body,
        }),
      });
    }

    const data = await response.text();
    return res.status(response.status).send(data);
  } catch (error) {
    console.error("Error occurred while proxying request:", error);
    return res.status(500).send({
      message: "Error occurred while proxying request",
      error: error.message,
      stack: error.stack,
    });
  }
};

export const getProxy = async (req, res) => {
  let url = req.query.url;
  const email = req.query.email;
  const unique = req.query.unique;
  const authorization = req.header("Authorization");

  if (!url) {
    return res.status(400).send("URL query parameter is required");
  }

  const headers = {
    Authorization: authorization,
  };

  const urlObj = new URL(url);

  if (email) {
    urlObj.searchParams.append("email", email);
  }

  url = urlObj.toString();

  const options = {
    url: url,
    headers: headers,
  };

  request(options).pipe(res);
};
