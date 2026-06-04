import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  image?: string;
  role: "admin" | "doctor" | "patient";
  isVerified: boolean;
  isBlocked: boolean;
  verificationOTP?: string;
  verificationOTPExpire?: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  refreshToken?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    verificationOTP: String,
    verificationOTPExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("User", userSchema);
