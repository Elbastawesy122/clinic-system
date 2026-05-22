import mongoose from "mongoose";

export interface IUser
  extends mongoose.Document {

  name: string;

  email: string;

  password: string;

  isVerified: boolean;

  verificationOTP?: string;

  verificationOTPExpire?: Date;

  resetPasswordToken?: string;

  resetPasswordExpire?: Date;

  refreshToken?: string;
}

const userSchema =
  new mongoose.Schema<IUser>(
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

export const User =
  mongoose.model<IUser>(
    "User",
    userSchema
  );