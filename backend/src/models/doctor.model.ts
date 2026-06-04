import mongoose, { Types } from "mongoose";

export interface IDoctor extends mongoose.Document {
  user: Types.ObjectId;
  clinic: Types.ObjectId;
  specialization: string;
  experience: number;
  fees: number;
  bio: string;
  image?: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

const doctorSchema = new mongoose.Schema<IDoctor>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
    },
    fees: {
      type: Number,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    image: String,
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Doctor = mongoose.model<IDoctor>("Doctor", doctorSchema);
