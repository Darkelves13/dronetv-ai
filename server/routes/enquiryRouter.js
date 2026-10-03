import express from "express";
import {
  fetchAllEnquiries,
  fetchEnquiryByUserType,
  fetchEnquiryById,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
} from "../controller/enquiryController.js";

const router = express.Router();

router.get("/", fetchAllEnquiries);
router.get("/type/:userType", fetchEnquiryByUserType);
router.get("/:id", fetchEnquiryById);
router.post("/", createEnquiry);
router.put("/:id", updateEnquiry);
router.delete("/:id", deleteEnquiry);

export default router;
