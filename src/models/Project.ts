import mongoose, { Schema, Model } from "mongoose";

export interface IProject {
  title: string;
  shortDescription: string;
  longDescription?: string;
  techStack: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
  order: number;
}

const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    longDescription: {
      type: String,
      trim: true,
      maxlength: 5000,
    },
    techStack: {
      type: [String],
      required: true,
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: "Tech stack must contain at least one technology",
      },
    },
    images: {
      type: [String],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "At least one image is required",
      },
    },
    liveUrl: { type: String, match: urlRegex },
    githubUrl: { type: String, match: urlRegex },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.model("Project", projectSchema);
export default Project;
