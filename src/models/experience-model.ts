import mongoose, { Schema } from "mongoose";
import { IExperience } from "../types";

const experienceSchema = new Schema<IExperience>(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (this: IExperience, value: Date) {
          return !value || value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    responsibilities: [
      {
        type: String,
        trim: true,
      },
    ],
    technologies: [
      {
        type: String,
        trim: true,
      },
    ],
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

const Experience = mongoose.model<IExperience>("Experience", experienceSchema);

export default Experience;
