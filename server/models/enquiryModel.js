import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      enum: {
        values: ["Student", "Customer", "Other"],
      },
    },
    interest: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["New", "Contacted", "In Progress", "Closed"],
      },
      default: "New",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

enquirySchema.index({ userType: 1, createdAt: -1 });

enquirySchema.index({ name: "text", email: "text", interest: "text" });

const enquiryModel = mongoose.model("enquiry", enquirySchema);
export default enquiryModel;
