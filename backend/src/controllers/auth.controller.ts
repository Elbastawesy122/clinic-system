import { Request, Response } from "express";

import bcrypt from "bcryptjs";

import crypto from "crypto";

import { User } from "../models/user.model";

import { generateOTP } from "../utils/generateOTP";

import { sendMail } from "../utils/sendMail";

import { generateAccessToken } from "../utils/generateAccessToken";

import { generateRefreshToken } from "../utils/generateRefreshToken";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      verificationOTP: otp,

      verificationOTPExpire: Date.now() + 10 * 60 * 1000,
    });

    await sendMail(
      email,
      "Verify Your Email",
      `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
      `,
    );

    res.status(201).json({
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// VERIFY EMAIL
export const verifyEmail = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (user.verificationOTP !== otp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  if (user.verificationOTPExpire! < new Date()) {
    return res.status(400).json({
      message: "OTP Expired",
    });
  }

  user.isVerified = true;

  user.verificationOTP = undefined;

  await user.save();

  res.json({
    message: "Email verified successfully",
  });
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  if (!user.isVerified) {
    return res.status(400).json({
      message: "Please verify email first",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const accessToken = generateAccessToken(user._id.toString());

  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;

  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    accessToken,
    user,
  });
};

// REFRESH TOKEN
export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "No refresh token",
    });
  }

  const user = await User.findOne({
    refreshToken: token,
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  const accessToken = generateAccessToken(user._id.toString());

  res.json({
    accessToken,
  });
};

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  await User.findOneAndUpdate(
    { refreshToken: token },
    {
      refreshToken: null,
    },
  );

  res.clearCookie("refreshToken");

  res.json({
    message: "Logged out successfully",
  });
};

// FORGOT PASSWORD
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = resetToken;

  user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  await sendMail(
    email,
    "Reset Password",
    `
        <a href="${resetLink}">
          Reset Password
        </a>
      `,
  );

  res.json({
    message: "Reset link sent",
  });
};

// RESET PASSWORD
export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;

  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid token",
    });
  }

  if (user.resetPasswordExpire! < new Date()) {
    return res.status(400).json({
      message: "Token expired",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;

  user.resetPasswordToken = undefined;

  await user.save();

  res.json({
    message: "Password reset success",
  });
};
