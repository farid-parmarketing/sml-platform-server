import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    personalLoanDebt: {
      type: Number,
    },
    creditCardDebt: {
      type: Number,
    },
    appLoanDebt: {
      type: Number,
    },
    totalIncome: {
      type: Number,
    },
    totalExpense: {
      type: Number,
    },
    dispossibleIncome: {
      type: Number,
    },
    dispossibleIncomePercent: {
      type: Number,
    },
    merchantTransactionId: {
      type: String,
    },
    plan: {
      emi: {
        type: Number,
      },
      months: {
        type: Number,
      },
      subscription: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
    deleteData: {
      type: Boolean,
      default: false,
    },
    zohoID: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
