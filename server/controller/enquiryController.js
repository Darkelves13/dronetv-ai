import mongoose from "mongoose";
import enquiryModel from "../models/enquiryModel.js";

const sanitizeInput = (str) => {
  if (typeof str !== "string") return str;

  return str
    .trim()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
};

export const fetchAllEnquiries = async (req, res) => {
  try {
    const allEnquiries = await enquiryModel.find().sort({ createdAt: -1 });

    if (allEnquiries.length === 0)
      return res
        .status(200)
        .json({ success: true, message: "No enquiries found!", data: [] });

    res.status(200).json({
      success: true,
      message: "All qequiries fetched successfully!!",
      data: allEnquiries,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Internal server errors",
    });
  }
};

export const fetchEnquiryByUserType = async (req, res) => {
  try {
    const { userType } = req.params;

    if (!["Student", "Customer", "Other"].includes(userType))
      return res
        .status(400)
        .json({ success: false, message: "Invalid user type" });

    const enquiriesByUserType = await enquiryModel
      .find({ userType: userType })
      .sort({ createdAt: -1 });

    if (enquiriesByUserType.length === 0)
      return res
        .status(200)
        .json({ success: true, message: "No enquiries found!!", data: [] });

    res.status(200).json({
      success: true,
      message: "All enquiries fetched successfully",
      data: enquiriesByUserType,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const fetchEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ success: false, message: "Invalid Id" });

    const enquiry = await enquiryModel.findById(id);

    if (!enquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found!!" });

    res.status(200).json({
      success: true,
      message: "Enquiry found",
      data: enquiry,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, userType, interest, message } = req.body;

    if (!name || !email || !phone || !userType || !interest || !message)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    if (!["Student", "Customer", "Other"].includes(userType))
      return res
        .status(400)
        .json({ success: false, message: "Invalid user type" });

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim()))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });

    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(String(phone).trim()))
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number format" });

    const newEnquiry = {
      name: sanitizeInput(name),
      email: email.trim().toLowerCase(),
      phone: String(phone).trim(),
      userType: userType,
      interest: sanitizeInput(interest),
      message: sanitizeInput(message),
    };

    const updatedEnquiries = await enquiryModel.create(newEnquiry);

    res.status(200).json({
      success: true,
      message: "Enquiry is created",
      data: updatedEnquiries,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const updateEnquiry = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid Id" });

    if (
      !status ||
      !["New", "Contacted", "In Progress", "Closed"].includes(status)
    )
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });

    const updatedEnquiry = await enquiryModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!updatedEnquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });

    res.status(200).json({
      success: true,
      message: "Enquiry updated",
      data: updatedEnquiry,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid Id" });

    const deletedEnquiry = await enquiryModel.findByIdAndDelete(id);

    if (!deletedEnquiry)
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found" });

    res.status(200).json({
      success: true,
      message: "Enquiry deleted",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
