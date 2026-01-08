import mongoose, { Schema } from "mongoose";
import { IEducation } from "../types";

const educationSchema = new Schema<IEducation>(
  {
    institution: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: [true, "Field of study is required"],
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
        validator: function (this: IEducation, value: Date) {
          return !value || value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    grade: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
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

const Education = mongoose.model<IEducation>("Education", educationSchema);

export default Education;
