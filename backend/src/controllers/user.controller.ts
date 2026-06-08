import { Response, NextFunction } from "express";

import { AuthRequest } from "../types/auth-request";
import { User } from "../models/user.model";
import cloudinary from "../config/cloudinary";
import streamifier from "streamifier";

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const search = (req.query.search as string) || "";

    const skip = (page - 1) * limit;

    const filter = search
      ? {
          $or: [
            {
              name: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const totalUsers = await User.countDocuments(filter);

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({
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
    const { name, email, phone } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      req.user?.role !== "admin" &&
      req.user?._id.toString() !== req.params.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (!req.file && !name && !email && !phone) {
      return res.status(400).json({
        message: "No data to update",
      });
    }

    if (email) {
      const exists = await User.findOne({
        email,
        _id: { $ne: user._id },
      });

      if (exists) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    if (req.file) {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "clinic/users" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });

      user.image = result.secure_url;
    }
    await user.save();

    console.log("FILE:", req.file);
    console.log("BUFFER:", req.file?.buffer);
    return res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error instanceof Error ? error.message : String(error),
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
