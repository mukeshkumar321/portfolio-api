import { Request, Response } from "express";
import mongoose from "mongoose";
import Experience from "../models/experience-model.js";
import Education from "../models/education-model.js";
import Skill from "../models/skill-model.js";
import Certification from "../models/certification-model.js";
import Profile from "../models/profile-model.js";

// Experience handlers
export const getExperience = async (_req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.status(200).json({
      success: true,
      message: "Experience fetched successfully",
      data: experiences,
    });
  } catch (error) {
    console.error("Error fetching experience:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch experience",
    });
  }
};

export const createExperience = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Error creating experience:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create experience",
    });
  }
};

export const updateExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid experience ID format",
      });
    }

    const experience = await Experience.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    console.error("Error updating experience:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update experience",
    });
  }
};

export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid experience ID format",
      });
    }

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: "Experience not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting experience:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete experience",
    });
  }
};

// Education handlers
export const getEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.status(200).json({
      success: true,
      message: "Education fetched successfully",
      data: education,
    });
  } catch (error) {
    console.error("Error fetching education:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch education",
    });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education,
    });
  } catch (error) {
    console.error("Error creating education:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create education",
    });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid education ID format",
      });
    }

    const education = await Education.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!education) {
      return res.status(404).json({
        success: false,
        error: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    console.error("Error updating education:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update education",
    });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid education ID format",
      });
    }

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        error: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting education:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete education",
    });
  }
};

// Skills handlers
export const getSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
    res.status(200).json({
      success: true,
      message: "Skills fetched successfully",
      data: skills,
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch skills",
    });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create skill",
    });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid skill ID format",
      });
    }

    const skill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update skill",
    });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid skill ID format",
      });
    }

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete skill",
    });
  }
};

// Certifications handlers
export const getCertifications = async (req: Request, res: Response) => {
  try {
    const certifications = await Certification.find().sort({
      order: 1,
      issueDate: -1,
    });
    res.status(200).json({
      success: true,
      message: "Certifications fetched successfully",
      data: certifications,
    });
  } catch (error) {
    console.error("Error fetching certifications:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch certifications",
    });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const certification = await Certification.create(req.body);
    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification,
    });
  } catch (error) {
    console.error("Error creating certification:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create certification",
    });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid certification ID format",
      });
    }

    const certification = await Certification.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!certification) {
      return res.status(404).json({
        success: false,
        error: "Certification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification,
    });
  } catch (error) {
    console.error("Error updating certification:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update certification",
    });
  }
};

export const deleteCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid certification ID format",
      });
    }

    const certification = await Certification.findByIdAndDelete(id);

    if (!certification) {
      return res.status(404).json({
        success: false,
        error: "Certification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting certification:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete certification",
    });
  }
};

// Profile/About handlers
export const getAbout = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json({
      success: true,
      message: "Profile info fetched successfully",
      data: profile || {},
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch profile info",
    });
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Profile info updated successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update profile info",
    });
  }
};
