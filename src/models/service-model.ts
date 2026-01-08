import mongoose, { Schema } from "mongoose";
import { IService } from "../types";

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
      default: "default",
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

const Service = mongoose.model<IService>("Service", serviceSchema);

export default Service;
