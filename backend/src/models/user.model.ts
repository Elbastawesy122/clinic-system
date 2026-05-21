import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
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

export const User = mongoose.model("User", userSchema);
