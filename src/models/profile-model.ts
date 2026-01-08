import mongoose, { Schema } from "mongoose";
import { IProfile } from "../types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-+()]+$/;
const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

const profileSchema = new Schema<IProfile>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [emailRegex, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [phoneRegex, "Please provide a valid phone number"],
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        trim: true,
      },
    },
    socialLinks: {
      linkedin: {
        type: String,
        trim: true,
        match: [urlRegex, "Please provide a valid LinkedIn URL"],
      },
      github: {
        type: String,
        trim: true,
        match: [urlRegex, "Please provide a valid GitHub URL"],
      },
      twitter: {
        type: String,
        trim: true,
        match: [urlRegex, "Please provide a valid Twitter URL"],
      },
      instagram: {
        type: String,
        trim: true,
        match: [urlRegex, "Please provide a valid Instagram URL"],
      },
      portfolio: {
        type: String,
        trim: true,
        match: [urlRegex, "Please provide a valid portfolio URL"],
      },
    },
    resume: {
      type: String,
      trim: true,
      match: [urlRegex, "Please provide a valid resume URL"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual to get formatted phone number
profileSchema.virtual("formattedPhone").get(function (
  this: IProfile & mongoose.Document
) {
  return this.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
});

// Virtual to get full address
profileSchema.virtual("fullAddress").get(function (
  this: IProfile & mongoose.Document
) {
  const parts = [];
  if (this.address?.street) parts.push(this.address.street);
  if (this.address?.city) parts.push(this.address.city);
  if (this.address?.state) parts.push(this.address.state);
  if (this.address?.zipCode) parts.push(this.address.zipCode);
  if (this.address?.country) parts.push(this.address.country);
  return parts.join(", ");
});

// Virtual to get location string
profileSchema.virtual("location").get(function (
  this: IProfile & mongoose.Document
) {
  const parts = [];
  if (this.address?.city) parts.push(this.address.city);
  if (this.address?.state) parts.push(this.address.state);
  if (this.address?.country) parts.push(this.address.country);
  return parts.join(", ") || null;
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export default Profile;
