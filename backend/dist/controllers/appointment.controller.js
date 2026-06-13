"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelAppointment = exports.updateAppointmentStatus = exports.getDoctorAppointments = exports.getMyAppointments = exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.getAppointments = exports.createAppointment = void 0;
const appointment_model_1 = require("../models/appointment.model");
const doctor_model_1 = require("../models/doctor.model");
const createAppointment = async (req, res) => {
    try {
        const { doctor, clinic, appointmentDate, timeSlot, notes } = req.body;
        const existingAppointment = await appointment_model_1.Appointment.findOne({
            doctor,
            appointmentDate,
            timeSlot,
            status: {
                $ne: "cancelled",
            },
        });
        if (existingAppointment) {
            return res.status(400).json({
                message: "This time slot is already booked",
            });
        }
        const appointment = await appointment_model_1.Appointment.create({
            patient: req.user?._id,
            doctor,
            clinic,
            appointmentDate,
            timeSlot,
            notes,
        });
        res.status(201).json({
            message: "Appointment booked successfully",
            appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.createAppointment = createAppointment;
const getAppointments = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const searchMatch = search
            ? {
                $or: [
                    { "patient.name": { $regex: search, $options: "i" } },
                    { "doctorUser.name": { $regex: search, $options: "i" } },
                    { "clinic.name": { $regex: search, $options: "i" } },
                ],
            }
            : {};
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient",
                },
            },
            { $unwind: "$patient" },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctor",
                    foreignField: "_id",
                    as: "doctor",
                },
            },
            { $unwind: "$doctor" },
            {
                $lookup: {
                    from: "users",
                    localField: "doctor.user",
                    foreignField: "_id",
                    as: "doctorUser",
                },
            },
            { $unwind: "$doctorUser" },
            {
                $addFields: {
                    "doctor.user": "$doctorUser",
                },
            },
            {
                $lookup: {
                    from: "clinics",
                    localField: "clinic",
                    foreignField: "_id",
                    as: "clinic",
                },
            },
            { $unwind: "$clinic" },
            { $match: searchMatch },
            { $sort: { appointmentDate: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    doctorUser: 0,
                },
            },
        ];
        const appointments = await appointment_model_1.Appointment.aggregate(pipeline);
        const countPipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient",
                },
            },
            { $unwind: "$patient" },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctor",
                    foreignField: "_id",
                    as: "doctor",
                },
            },
            { $unwind: "$doctor" },
            {
                $lookup: {
                    from: "users",
                    localField: "doctor.user",
                    foreignField: "_id",
                    as: "doctorUser",
                },
            },
            { $unwind: "$doctorUser" },
            {
                $addFields: {
                    "doctor.user": "$doctorUser",
                },
            },
            {
                $lookup: {
                    from: "clinics",
                    localField: "clinic",
                    foreignField: "_id",
                    as: "clinic",
                },
            },
            { $unwind: "$clinic" },
            { $match: searchMatch },
            { $count: "total" },
        ];
        const totalResult = await appointment_model_1.Appointment.aggregate(countPipeline);
        const totalAppointments = totalResult[0]?.total || 0;
        return res.status(200).json({
            appointments,
            totalAppointments,
            totalPages: Math.ceil(totalAppointments / limit),
            currentPage: page,
        });
    }
    catch (error) {
        console.error("getAppointments error:", error);
        return res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};
exports.getAppointments = getAppointments;
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await appointment_model_1.Appointment.findById(req.params.id)
            .populate("patient")
            .populate({
            path: "doctor",
            populate: {
                path: "user",
            },
        })
            .populate("clinic");
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }
        res.status(200).json(appointment);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getAppointmentById = getAppointmentById;
const updateAppointment = async (req, res) => {
    try {
        const { doctor, appointmentDate, timeSlot } = req.body;
        const appointment = await appointment_model_1.Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }
        if (doctor || appointmentDate || timeSlot) {
            const existing = await appointment_model_1.Appointment.findOne({
                _id: { $ne: req.params.id },
                doctor: doctor || appointment.doctor,
                appointmentDate: appointmentDate || appointment.appointmentDate,
                timeSlot: timeSlot || appointment.timeSlot,
                status: { $ne: "cancelled" },
            });
            if (existing) {
                return res.status(400).json({
                    message: "This time slot is already booked",
                });
            }
        }
        const updatedAppointment = await appointment_model_1.Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        return res.status(200).json({
            message: "Appointment updated successfully",
            appointment: updatedAppointment,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.updateAppointment = updateAppointment;
const deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointment_model_1.Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }
        res.status(200).json({
            message: "Appointment deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.deleteAppointment = deleteAppointment;
const getMyAppointments = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const filter = {
            patient: req.user?._id,
        };
        const searchMatch = search
            ? {
                $or: [
                    {
                        "doctorUser.name": {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        "clinic.name": {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        timeSlot: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                ],
            }
            : {};
        const pipeline = [
            {
                $match: filter,
            },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctor",
                    foreignField: "_id",
                    as: "doctor",
                },
            },
            { $unwind: "$doctor" },
            {
                $lookup: {
                    from: "users",
                    localField: "doctor.user",
                    foreignField: "_id",
                    as: "doctorUser",
                },
            },
            { $unwind: "$doctorUser" },
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
                $match: searchMatch,
            },
            {
                $sort: { appointmentDate: -1 },
            },
            { $skip: skip },
            { $limit: limit },
        ];
        const appointments = await appointment_model_1.Appointment.aggregate(pipeline);
        const totalResult = await appointment_model_1.Appointment.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctor",
                    foreignField: "_id",
                    as: "doctor",
                },
            },
            { $unwind: "$doctor" },
            {
                $lookup: {
                    from: "users",
                    localField: "doctor.user",
                    foreignField: "_id",
                    as: "doctorUser",
                },
            },
            { $unwind: "$doctorUser" },
            {
                $lookup: {
                    from: "clinics",
                    localField: "clinic",
                    foreignField: "_id",
                    as: "clinic",
                },
            },
            { $unwind: "$clinic" },
            { $match: searchMatch },
            { $count: "total" },
        ]);
        const totalAppointments = totalResult[0]?.total || 0;
        res.status(200).json({
            appointments,
            totalAppointments,
            totalPages: Math.ceil(totalAppointments / limit),
            currentPage: page,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getMyAppointments = getMyAppointments;
const getDoctorAppointments = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const doctor = await doctor_model_1.Doctor.findOne({
            user: req.user?._id,
        });
        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found",
            });
        }
        const filter = {
            doctor: doctor._id,
        };
        const searchMatch = search
            ? {
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
                    {
                        "clinic.name": {
                            $regex: search,
                            $options: "i",
                        },
                    },
                    {
                        timeSlot: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                ],
            }
            : {};
        const pipeline = [
            { $match: filter },
            {
                $lookup: {
                    from: "users",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient",
                },
            },
            { $unwind: "$patient" },
            {
                $lookup: {
                    from: "clinics",
                    localField: "clinic",
                    foreignField: "_id",
                    as: "clinic",
                },
            },
            { $unwind: "$clinic" },
            { $match: searchMatch },
            { $sort: { appointmentDate: -1 } },
            { $skip: skip },
            { $limit: limit },
        ];
        const appointments = await appointment_model_1.Appointment.aggregate(pipeline);
        const totalResult = await appointment_model_1.Appointment.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: "users",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient",
                },
            },
            { $unwind: "$patient" },
            {
                $lookup: {
                    from: "clinics",
                    localField: "clinic",
                    foreignField: "_id",
                    as: "clinic",
                },
            },
            { $unwind: "$clinic" },
            { $match: searchMatch },
            { $count: "total" },
        ]);
        const totalAppointments = totalResult[0]?.total || 0;
        res.status(200).json({
            appointments,
            totalAppointments,
            totalPages: Math.ceil(totalAppointments / limit),
            currentPage: page,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getDoctorAppointments = getDoctorAppointments;
const updateAppointmentStatus = async (req, res) => {
    try {
        const appointment = await appointment_model_1.Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }
        appointment.status = req.body.status;
        await appointment.save();
        res.status(200).json({
            message: "Status updated",
            appointment,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.updateAppointmentStatus = updateAppointmentStatus;
const cancelAppointment = async (req, res) => {
    try {
        const appointment = await appointment_model_1.Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }
        appointment.status = "cancelled";
        await appointment.save();
        res.status(200).json({
            message: "Appointment cancelled",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.cancelAppointment = cancelAppointment;
