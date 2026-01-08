import type { Request, Response } from "express";
import mongoose from "mongoose";
import Service from "../models/service-model.js";

// Get all services
export const getServices = async (_req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Services fetched successfully",
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch services",
    });
  }
};

// Create new service
export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description, order, icon } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: "Title and description are required",
      });
    }

    const newService = await Service.create({
      title,
      description,
      order,
      icon,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: newService,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create service",
    });
  }
};

// Get single service by ID
export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid service ID format",
      });
    }

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch service",
    });
  }
};

// Update existing service
export const updateServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, order, icon } = req.body;

    // Validate mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid service ID format",
      });
    }

    // Validate at least one field to update
    if (!title && !description && icon === undefined && order === undefined) {
      return res.status(400).json({
        success: false,
        error: "At least one field is required to update",
      });
    }

    const updateData: Partial<{
      title: string;
      description: string;
      order: number;
      icon: string;
    }> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (order !== undefined) updateData.order = order;
    if (icon !== undefined) updateData.icon = icon;

    const updatedService = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update service",
    });
  }
};

// Delete service
export const deleteServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Validate mongoose ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid service ID format",
      });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete service",
    });
  }
};
