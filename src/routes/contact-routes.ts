import express from "express";
import { getContact, updateContact } from "../controllers/contactController.js";

const router = express.Router();

router.route("/").get(getContact).post(updateContact).put(updateContact);

export default router;
