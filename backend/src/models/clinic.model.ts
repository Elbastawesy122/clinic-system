import mongoose from "mongoose";

export interface IClinic extends mongoose.Document {
  name: string;
  description: string;
  image?: string;
  location: string;
  phone: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
  isActive: boolean;
}

const clinicSchema = new mongoose.Schema<IClinic>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: String,
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    workingDays: [
      {
        type: String,
      },
    ],
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Clinic = mongoose.model<IClinic>("Clinic", clinicSchema);
