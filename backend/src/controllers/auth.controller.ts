import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/user.model";
import { generateOTP } from "../utils/generateOTP";
import { sendMail } from "../utils/sendMail";
import { generateAccessToken } from "../utils/generateAccessToken";
import { generateRefreshToken } from "../utils/generateRefreshToken";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/auth-request";

interface JwtPayload {
  id: string;
}

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select(
      "-password -refreshToken",
    );

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Me Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateMe = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { name, phone, image } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(image && { image }),
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password -refreshToken");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update Me Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, image, password } = req.body;

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
      phone,
      image,
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
    console.log("EMAIL ERROR:", error);

    return res.status(500).json({
      message: "Server Error",
      error,
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
  user.verificationOTPExpire = undefined;

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

  if (user.isBlocked) {
    return res.status(403).json({
      message: "Your account has been blocked",
    });
  }

  const accessToken = generateAccessToken(user._id.toString());

  const refreshToken = generateRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;

  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const userData = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  res.json({
    accessToken,
    user: userData,
  });
};

// REFRESH TOKEN
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "No refresh token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!,
    ) as JwtPayload;

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== token) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user._id.toString());

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(401).json({
      message: "Refresh token expired",
    });
  }
};

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const user = await User.findOne({
      refreshToken: token,
    });

    if (user) {
      user.refreshToken = "";

      await user.save();
    }
  }

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged out",
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

  const resetLink = `${process.env.CLIENT_URL}/user/reset-password/${resetToken}`;

  await sendMail(
    email,
    "Reset Your Password",
    `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: auto;
      padding: 40px 30px;
      background: #f8fafc;
      border-radius: 16px;
      border: 1px solid #e2e8f0;
    ">

      <h1 style="
        color: #0f172a;
        margin-bottom: 20px;
        text-align: center;
      ">
        Reset Your Password
      </h1>

      <p style="
        color: #475569;
        font-size: 16px;
        line-height: 28px;
      ">
        Hello,
      </p>

      <p style="
        color: #475569;
        font-size: 16px;
        line-height: 28px;
      ">
        We received a request to reset your password for your account.
        Click the button below to create a new password.
      </p>

      <div style="text-align: center; margin: 35px 0;">
        <a
          href="${resetLink}"
          style="
            background: #409D9B;
            color: white;
            padding: 14px 28px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: bold;
            display: inline-block;
            font-size: 16px;
          "
        >
          Reset Password
        </a>
      </div>

      <p style="
        color: #64748b;
        font-size: 14px;
        line-height: 26px;
      ">
        This password reset link will expire in 10 minutes.
      </p>

      <p style="
        color: #64748b;
        font-size: 14px;
        line-height: 26px;
      ">
        If you did not request a password reset, you can safely ignore this email.
      </p>

      <hr style="
        margin: 30px 0;
        border: none;
        border-top: 1px solid #e2e8f0;
      " />

      <p style="
        text-align: center;
        color: #94a3b8;
        font-size: 13px;
      ">
        Eye Care Clinic © 2026
      </p>

    </div>
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
  user.resetPasswordExpire = undefined;
  user.refreshToken = undefined;

  await user.save();

  res.json({
    message: "Password reset success",
  });
};
