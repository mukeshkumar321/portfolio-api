import mongoose, { Schema } from "mongoose";
import { ISkill } from "../types";

const skillSchema = new Schema<ISkill>(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
      minlength: [2, "Skill name must be at least 2 characters long"],
      maxlength: [50, "Skill name cannot exceed 50 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: [2, "Category must be at least 2 characters long"],
      maxlength: [50, "Category cannot exceed 50 characters"],
    },
    proficiency: {
      type: Number,
      min: [0, "Proficiency must be at least 0"],
      max: [100, "Proficiency cannot exceed 100"],
    },
    icon: {
      type: String,
      trim: true,
      maxlength: [100, "Icon cannot exceed 100 characters"],
    },
    order: {
      type: Number,
      default: 0,
      min: [0, "Order must be a positive number"],
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
