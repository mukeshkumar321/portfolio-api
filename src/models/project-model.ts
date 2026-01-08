import mongoose, { Schema } from "mongoose";
import { IProject } from "../types";

const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, "Tech stack is required"],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Tech stack must contain at least one technology",
      },
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "At least one image is required",
      },
    },
    liveUrl: {
      type: String,
      trim: true,
      match: [urlRegex, "Please provide a valid live URL"],
    },
    githubUrl: {
      type: String,
      trim: true,
      match: [urlRegex, "Please provide a valid GitHub URL"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      min: [0, "Order must be a positive number"],
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<IProject>("Project", projectSchema);
export default Project;
