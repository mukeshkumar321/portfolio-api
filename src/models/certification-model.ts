import mongoose, { Schema } from "mongoose";
import { ICertification } from "../types";

const certificationSchema = new Schema<ICertification>(
  {
    name: {
      type: String,
      required: [true, "Certification name is required"],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, "Issuer is required"],
      trim: true,
    },
    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
    },
    expiryDate: {
      type: Date,
      validate: {
        validator: function (this: ICertification, value: Date) {
          return !value || value > this.issueDate;
        },
        message: "Expiry date must be after issue date",
      },
    },
    credentialId: {
      type: String,
      trim: true,
    },
    credentialUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (value: string) {
          if (!value) return true;
          const urlPattern = /^https?:\/\/.+/;
          return urlPattern.test(value);
        },
        message: "Please provide a valid URL",
      },
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

const Certification = mongoose.model<ICertification>(
  "Certification",
  certificationSchema
);

export default Certification;
