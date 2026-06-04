import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/auth-request";
import { User } from "../models/user.model";

import bcrypt from "bcryptjs";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      req.user?.role !== "admin" &&
      req.user?._id.toString() !== req.params.id
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, image } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (
      req.user?.role !== "admin" &&
      req.user?._id.toString() !== req.params.id
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    if (email) {
      const exists = await User.findOne({
        email,
      });

      if (exists && exists._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    if (name) user.name = name;

    if (phone) user.phone = phone;

    if (image) user.image = image;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const blockUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBlocked = true;

    await user.save();

    res.status(200).json({
      message: "User blocked",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to block user",
    });
  }
};

export const unblockUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.isBlocked = false;

    await user.save();

    res.status(200).json({
      message: "User unblocked",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to unblock user",
    });
  }
};
