"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientById = exports.getPatients = exports.unblockUser = exports.blockUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const appointment_model_1 = require("../models/appointment.model");
const getAllUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const search = req.query.search || "";
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
        const totalUsers = await user_model_1.User.countDocuments(filter);
        const users = await user_model_1.User.find(filter)
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Failed to fetch users",
        });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        if (req.user?.role !== "admin" &&
            req.user?._id.toString() !== req.params.id) {
            return res.status(403).json({
                message: "Access denied",
            });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to fetch user",
        });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await user_model_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (req.user?.role !== "admin" &&
            req.user?._id.toString() !== req.params.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        if (!req.file && !name && !email && !phone) {
            return res.status(400).json({
                message: "No data to update",
            });
        }
        if (email) {
            const exists = await user_model_1.User.findOne({
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
        if (name)
            user.name = name;
        if (phone)
            user.phone = phone;
        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary_1.default.uploader.upload_stream({ folder: "clinic/users" }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                });
                streamifier_1.default.createReadStream(req.file.buffer).pipe(stream);
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        await user.deleteOne();
        res.status(200).json({
            message: "User deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.deleteUser = deleteUser;
const blockUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to block user",
        });
    }
};
exports.blockUser = blockUser;
const unblockUser = async (req, res) => {
    try {
        const user = await user_model_1.User.findById(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to unblock user",
        });
    }
};
exports.unblockUser = unblockUser;
const getPatients = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const search = req.query.search || "";
    const query = {
        role: "patient",
        name: {
            $regex: search,
            $options: "i",
        },
    };
    const totalPatients = await user_model_1.User.countDocuments(query);
    const patients = await user_model_1.User.find(query)
        .select("-password -refreshToken")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
    res.status(200).json({
        patients,
        totalPatients,
        totalPages: Math.ceil(totalPatients / limit),
        currentPage: page,
    });
};
exports.getPatients = getPatients;
const getPatientById = async (req, res) => {
    const { id } = req.params;
    const patient = await user_model_1.User.findOne({
        _id: id,
        role: "patient",
    }).select("-password -refreshToken");
    if (!patient) {
        return res.status(404).json({
            success: false,
            message: "Patient not found",
        });
    }
    const appointments = await appointment_model_1.Appointment.find({
        patient: id,
    })
        .populate("doctor")
        .populate("clinic")
        .sort({ appointmentDate: -1 });
    res.status(200).json({
        success: true,
        patient,
        appointments,
    });
};
exports.getPatientById = getPatientById;
