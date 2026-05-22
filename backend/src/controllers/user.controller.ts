import { Request, Response } from "express";

import { User } from "../models/user.model";

import bcrypt from "bcryptjs";

export const getUserById = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } =
      req.body;

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name) user.name = name;

    if (email) user.email = email;

    if (password) {
      const hashedPassword =
        await bcrypt.hash(password, 10);

      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({
      message: "User updated",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(
      req.params.id
    );

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