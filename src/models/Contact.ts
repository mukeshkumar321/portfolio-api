import mongoose, { Schema, Model, Document } from "mongoose";

export interface IContact {
  name: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  bio?: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    portfolio?: string;
  };
  resume?: string;
}

export interface IContactDocument extends IContact, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-\+\(\)]+$/;
const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const contactSchema = new Schema<IContactDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
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
    address: {
      street: {
        type: String,
        trim: true,
        maxlength: [200, "Street cannot exceed 200 characters"],
      },
      city: {
        type: String,
        trim: true,
        maxlength: [100, "City cannot exceed 100 characters"],
      },
      state: {
        type: String,
        trim: true,
        maxlength: [100, "State cannot exceed 100 characters"],
      },
      country: {
        type: String,
        trim: true,
        maxlength: [100, "Country cannot exceed 100 characters"],
      },
      zipCode: {
        type: String,
        trim: true,
        maxlength: [20, "Zip code cannot exceed 20 characters"],
      },
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [1000, "Bio cannot exceed 1000 characters"],
    },
    social: {
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
contactSchema.virtual("formattedPhone").get(function (this: IContactDocument) {
  return this.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
});

// Virtual to get full formatted address
contactSchema.virtual("fullAddress").get(function (this: IContactDocument) {
  const parts = [];
  if (this.address?.street) parts.push(this.address.street);
  if (this.address?.city) parts.push(this.address.city);
  if (this.address?.state) parts.push(this.address.state);
  if (this.address?.zipCode) parts.push(this.address.zipCode);
  if (this.address?.country) parts.push(this.address.country);
  return parts.join(", ");
});

const Contact: Model<IContactDocument> = mongoose.model<IContactDocument>(
  "Contact",
  contactSchema
);

export default Contact;
