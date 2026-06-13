"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyPatients = exports.setupDoctorPassword = exports.deleteDoctor = exports.updateDoctor = exports.getDoctorById = exports.getDoctors = exports.createDoctor = void 0;
const user_model_1 = require("../models/user.model");
const doctor_model_1 = require("../models/doctor.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const sendMail_1 = require("../utils/sendMail");
const appointment_model_1 = require("../models/appointment.model");
const createDoctor = async (req, res) => {
    try {
        const { name, email, phone, clinic, specialization, experience, fees, bio, workingDays, startTime, endTime, } = req.body;
        const existingUser = await user_model_1.User.findOne({
            email,
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        const temporaryPassword = await bcryptjs_1.default.hash(crypto_1.default.randomBytes(16).toString("hex"), 10);
        const setupToken = crypto_1.default.randomBytes(32).toString("hex");
        const user = await user_model_1.User.create({
            name,
            email,
            phone,
            password: temporaryPassword,
            role: "doctor",
            isVerified: true,
            resetPasswordToken: setupToken,
            resetPasswordExpire: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        const doctor = await doctor_model_1.Doctor.create({
            user: user._id,
            clinic,
            specialization,
            experience,
            fees,
            bio,
            workingDays,
            startTime,
            endTime,
        });
        const setupLink = `${process.env.CLIENT_URL}/user/setup-password/${setupToken}`;
        await (0, sendMail_1.sendMail)(email, "Welcome To Clinic System", `
      <div style="font-family:Arial,sans-serif;padding:20px">

        <h2>
          Welcome Dr. ${name}
        </h2>

        <p>
          Your doctor account has been created successfully.
        </p>

        <p>
          Please click the button below to set your password.
        </p>

        <a
          href="${setupLink}"
          style="
            display:inline-block;
            padding:12px 24px;
            background:#409D9B;
            color:#fff;
            text-decoration:none;
            border-radius:8px;
            margin-top:10px;
          "
        >
          Set Password
        </a>

        <p style="margin-top:20px">
          This link expires in 24 hours.
        </p>

      </div>
      `);
        res.status(201).json({
            message: "Doctor created successfully and email sent",
            doctor,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.createDoctor = createDoctor;
const getDoctors = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const search = req.query.search || "";
        const skip = (page - 1) * limit;
        const matchStage = {};
        if (search) {
            matchStage["user.name"] = {
                $regex: search,
                $options: "i",
            };
        }
        const doctors = await doctor_model_1.Doctor.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            { $unwind: "$user" },
            {
                $lookup: {
                    from: "clinics",
                    localField: "clinic",
                    foreignField: "_id",
                    as: "clinic",
                },
            },
            { $unwind: "$clinic" },
            {
                $match: matchStage,
            },
            {
                $sort: { createdAt: -1 },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
        ]);
        const totalDoctors = await doctor_model_1.Doctor.countDocuments(search ? {} : {});
        return res.status(200).json({
            doctors,
            totalDoctors,
            totalPages: Math.ceil(totalDoctors / limit),
            currentPage: page,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getDoctors = getDoctors;
const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctor_model_1.Doctor.findById(req.params.id)
            .populate("user")
            .populate("clinic");
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
        res.status(200).json(doctor);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getDoctorById = getDoctorById;
const updateDoctor = async (req, res) => {
    try {
        const doctor = await doctor_model_1.Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
        const user = await user_model_1.User.findById(doctor.user);
        if (user) {
            user.name = req.body.name ?? user.name;
            user.email = req.body.email ?? user.email;
            user.phone = req.body.phone ?? user.phone;
            await user.save();
        }
        Object.assign(doctor, {
            clinic: req.body.clinic ?? doctor.clinic,
            specialization: req.body.specialization ?? doctor.specialization,
            experience: req.body.experience ?? doctor.experience,
            fees: req.body.fees ?? doctor.fees,
            bio: req.body.bio ?? doctor.bio,
            workingDays: req.body.workingDays ?? doctor.workingDays,
            startTime: req.body.startTime ?? doctor.startTime,
            endTime: req.body.endTime ?? doctor.endTime,
            isAvailable: req.body.isAvailable ?? doctor.isAvailable,
        });
        await doctor.save();
        res.status(200).json({
            message: "Doctor updated",
            doctor,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.updateDoctor = updateDoctor;
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await doctor_model_1.Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
        await user_model_1.User.findByIdAndDelete(doctor.user);
        await doctor.deleteOne();
        res.status(200).json({
            message: "Doctor deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.deleteDoctor = deleteDoctor;
const setupDoctorPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const user = await user_model_1.User.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: {
            $gt: new Date(),
        },
    });
    if (!user) {
        return res.status(400).json({
            message: "Invalid or expired token",
        });
    }
    user.password = await bcryptjs_1.default.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(200).json({
        message: "Password set successfully",
    });
};
exports.setupDoctorPassword = setupDoctorPassword;
const getMyPatients = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const search = String(req.query.search || "").trim();
        const skip = (page - 1) * limit;
        const doctor = await doctor_model_1.Doctor.findOne({
            user: req.user?._id,
        });
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
        const pipeline = [
            {
                $match: {
                    doctor: doctor._id,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient",
                },
            },
            {
                $unwind: "$patient",
            },
        ];
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        {
                            "patient.name": {
                                $regex: search,
                                $options: "i",
                            },
                        },
                        {
                            "patient.email": {
                                $regex: search,
                                $options: "i",
                            },
                        },
                    ],
                },
            });
        }
        pipeline.push({
            $group: {
                _id: "$patient._id",
                patient: {
                    $first: {
                        _id: "$patient._id",
                        name: "$patient.name",
                        email: "$patient.email",
                        isBlocked: "$patient.isBlocked",
                        isVerified: "$patient.isVerified",
                    },
                },
                totalAppointments: {
                    $sum: 1,
                },
                lastAppointment: {
                    $max: "$appointmentDate",
                },
            },
        }, {
            $sort: {
                lastAppointment: -1,
            },
        }, {
            $facet: {
                patients: [
                    {
                        $skip: skip,
                    },
                    {
                        $limit: limit,
                    },
                ],
                totalCount: [
                    {
                        $count: "count",
                    },
                ],
            },
        });
        const result = await appointment_model_1.Appointment.aggregate(pipeline);
        const patients = result[0]?.patients || [];
        const totalPatients = result[0]?.totalCount?.[0]?.count || 0;
        return res.status(200).json({
            patients,
            totalPatients,
            totalPages: Math.ceil(totalPatients / limit),
            currentPage: page,
        });
    }
    catch (error) {
        console.error("🔥 getMyPatients FULL ERROR:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : error,
        });
    }
};
exports.getMyPatients = getMyPatients;
