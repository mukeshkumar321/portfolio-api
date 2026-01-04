import type { Request, Response } from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// GET /api/v1/projects
export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .sort({
        isFeatured: -1,
        order: 1,
        createdAt: -1,
      })
      .lean();

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET /api/v1/projects/:id
export const getProject = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid project ID",
      });
    }

    const project = await Project.findById(req.params.id).lean();

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST /api/v1/projects
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      techStack: req.body.techStack,
      images: req.body.images,
      liveUrl: req.body.liveUrl,
      githubUrl: req.body.githubUrl,
      isFeatured: req.body.isFeatured ?? false,
      order: req.body.order ?? 0,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT /api/v1/projects/:id
export const updateProject = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid project ID",
      });
    }

    const updateData: any = {};

    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.shortDescription !== undefined)
      updateData.shortDescription = req.body.shortDescription;
    if (req.body.longDescription !== undefined)
      updateData.longDescription = req.body.longDescription;
    if (req.body.techStack !== undefined)
      updateData.techStack = req.body.techStack;
    if (req.body.images !== undefined) updateData.images = req.body.images;
    if (req.body.liveUrl !== undefined) updateData.liveUrl = req.body.liveUrl;
    if (req.body.githubUrl !== undefined)
      updateData.githubUrl = req.body.githubUrl;
    if (req.body.isFeatured !== undefined)
      updateData.isFeatured = req.body.isFeatured;
    if (req.body.order !== undefined) updateData.order = req.body.order;

    const project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
// DELETE /api/v1/projects/:id
export const deleteProject = async (req: Request, res: Response) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid project ID",
      });
    }

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
