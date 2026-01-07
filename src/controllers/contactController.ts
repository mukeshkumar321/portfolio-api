import type { Request, Response } from "express";
import Contact from "../models/Contact.js";

// GET /api/v1/contact - Get the contact information
export const getContact = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Find the first (and only) contact document
    const contact = await Contact.findOne().lean();

    if (!contact) {
      res.status(404).json({
        success: false,
        error: "Contact information not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
};

// POST /api/v1/contact - Create or update contact information (upsert)
export const updateContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const updateData: any = {};

    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.email !== undefined) updateData.email = req.body.email;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.address !== undefined) updateData.address = req.body.address;
    if (req.body.bio !== undefined) updateData.bio = req.body.bio;
    if (req.body.resume !== undefined) updateData.resume = req.body.resume;
    
    // Handle nested social object
    if (req.body.social !== undefined) {
      updateData.social = {
        linkedin: req.body.social.linkedin,
        github: req.body.social.github,
        twitter: req.body.social.twitter,
        instagram: req.body.social.instagram,
        portfolio: req.body.social.portfolio,
      };
    }

    // Update the first document, or create it if it doesn't exist
    const contact = await Contact.findOneAndUpdate(
      {}, // Empty filter matches the first document
      updateData,
      { 
        new: true, 
        runValidators: true,
        upsert: true // Create if doesn't exist
      }
    );

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: (error as Error).message,
    });
  }
};
