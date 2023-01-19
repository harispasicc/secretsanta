import mongoose from "mongoose";

const ForgotPasswordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: "User ID is required",
    },
    uuid: {
      type: String,
      required: "UUID is required",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ForgotPassword", ForgotPasswordSchema);
