import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cors from "cors";
app.use(
  cors({
    origin: [
      "https://platform.settlemyloan.in",
      "https://platform-admin.settlemyloan.in",
      "https://platform-delete.settlemyloan.in",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "./database/connection.js";
connectToDatabase();

app.get("/", (req, res) => {
  res.send("SML - Platform");
});

import userRoutes from "./routes/user.js";
app.use("/", userRoutes);

import paymentRoutes from "./routes/payment.js";
app.use("/", paymentRoutes);

import adminRoutes from "./routes/admin.js";
app.use("/", adminRoutes);

import zohoRoutes from "./routes/zoho.js";
app.use("/", zohoRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
