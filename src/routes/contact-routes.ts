import express from "express";
import {
  getContact,
  updateContact,
  getAllContacts,
} from "../controllers/contact-controller.js";

const router = express.Router();

router.get("/", getContact);
router.put("/", updateContact);
router.get("/all", getAllContacts);

export default router;
