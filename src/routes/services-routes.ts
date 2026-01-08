import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateServiceById,
  deleteServiceById,
} from "../controllers/services-controller.js";

const router = express.Router();

// Get all services
router.route("/").get(getServices).post(createService);

// Get, update, or delete a specific service
router
  .route("/:id")
  .get(getServiceById)
  .put(updateServiceById)
  .delete(deleteServiceById);

export default router;
