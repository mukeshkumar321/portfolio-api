import express from "express";
import {
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  getAbout,
  updateAbout,
} from "../controllers/resume-controller.js";

const router = express.Router();

// Experience routes
router.get("/experience", getExperience);
router.post("/experience", createExperience);
router.put("/experience/:id", updateExperience);
router.delete("/experience/:id", deleteExperience);

// Education routes
router.get("/education", getEducation);
router.post("/education", createEducation);
router.put("/education/:id", updateEducation);
router.delete("/education/:id", deleteEducation);

// Skills routes
router.get("/skills", getSkills);
router.post("/skills", createSkill);
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);

// Certifications routes
router.get("/certifications", getCertifications);
router.post("/certifications", createCertification);
router.put("/certifications/:id", updateCertification);
router.delete("/certifications/:id", deleteCertification);

// About/Profile routes
router.get("/about", getAbout);
router.put("/about", updateAbout);

export default router;
