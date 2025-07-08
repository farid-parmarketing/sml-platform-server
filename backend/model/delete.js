import mongoose from "mongoose";

const deleteSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Delete = mongoose.model("Delete", deleteSchema);
export default Delete;
