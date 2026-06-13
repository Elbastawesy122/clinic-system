"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logout = exports.refreshToken = exports.login = exports.verifyEmail = exports.register = exports.updateMe = exports.getMe = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const user_model_1 = require("../models/user.model");
const generateOTP_1 = require("../utils/generateOTP");
const sendMail_1 = require("../utils/sendMail");
const generateAccessToken_1 = require("../utils/generateAccessToken");
const generateRefreshToken_1 = require("../utils/generateRefreshToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getMe = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.user?._id).select("-password -refreshToken");
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
    }
    catch (error) {
        console.error("Get Me Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.getMe = getMe;
const updateMe = async (req, res) => {
    try {
        const { name, phone, image } = req.body;
        const user = await user_model_1.User.findByIdAndUpdate(req.user?._id, {
            ...(name && { name }),
            ...(phone && { phone }),
            ...(image && { image }),
        }, {
            new: true,
            runValidators: true,
        }).select("-password -refreshToken");
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
    }
    catch (error) {
        console.error("Update Me Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.updateMe = updateMe;
// REGISTER
const register = async (req, res) => {
    try {
        const { name, email, phone, image, password, role } = req.body;
        const existUser = await user_model_1.User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const otp = (0, generateOTP_1.generateOTP)();
        const user = await user_model_1.User.create({
            name,
            email,
            phone,
            image,
            password: hashedPassword,
            role,
            verificationOTP: otp,
            verificationOTPExpire: Date.now() + 10 * 60 * 1000,
        });
        await (0, sendMail_1.sendMail)(email, "Verify Your Email", `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
      `);
        res.status(201).json({
            message: "Account created successfully",
        });
    }
    catch (error) {
        console.log("EMAIL ERROR:", error);
        return res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};
exports.register = register;
// VERIFY EMAIL
const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;
    const user = await user_model_1.User.findOne({ email });
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
    if (user.verificationOTPExpire < new Date()) {
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
exports.verifyEmail = verifyEmail;
// LOGIN
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.User.findOne({ email });
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
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
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
    const accessToken = (0, generateAccessToken_1.generateAccessToken)(user._id.toString());
    const refreshToken = (0, generateRefreshToken_1.generateRefreshToken)(user._id.toString());
    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const userData = await user_model_1.User.findById(user._id).select("-password -refreshToken");
    res.json({
        accessToken,
        user: userData,
    });
};
exports.login = login;
// REFRESH TOKEN
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({
                message: "No refresh token",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await user_model_1.User.findById(decoded.id);
        if (!user || user.refreshToken !== token) {
            return res.status(401).json({
                message: "Invalid refresh token",
            });
        }
        const newAccessToken = (0, generateAccessToken_1.generateAccessToken)(user._id.toString());
        res.status(200).json({
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        res.status(401).json({
            message: "Refresh token expired",
        });
    }
};
exports.refreshToken = refreshToken;
// LOGOUT
const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (token) {
        const user = await user_model_1.User.findOne({
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
exports.logout = logout;
// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();
    const resetLink = `${process.env.CLIENT_URL}/user/reset-password/${resetToken}`;
    await (0, sendMail_1.sendMail)(email, "Reset Your Password", `
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
  `);
    res.json({
        message: "Reset link sent",
    });
};
exports.forgotPassword = forgotPassword;
// RESET PASSWORD
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    const user = await user_model_1.User.findOne({
        resetPasswordToken: token,
    });
    if (!user) {
        return res.status(400).json({
            message: "Invalid token",
        });
    }
    if (user.resetPasswordExpire < new Date()) {
        return res.status(400).json({
            message: "Token expired",
        });
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.refreshToken = undefined;
    await user.save();
    res.json({
        message: "Password reset success",
    });
};
exports.resetPassword = resetPassword;
