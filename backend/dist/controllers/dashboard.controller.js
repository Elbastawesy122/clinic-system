"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentsAnalytics = exports.getDashboardStats = void 0;
const appointment_model_1 = require("../models/appointment.model");
const doctor_model_1 = require("../models/doctor.model");
const clinic_model_1 = require("../models/clinic.model");
const user_model_1 = require("../models/user.model");
const getDashboardStats = async (req, res) => {
    try {
        const [appointmentsCount, doctorsCount, clinicsCount, patientsCount] = await Promise.all([
            appointment_model_1.Appointment.countDocuments(),
            doctor_model_1.Doctor.countDocuments(),
            clinic_model_1.Clinic.countDocuments(),
            user_model_1.User.countDocuments({ role: "patient" }),
        ]);
        return res.status(200).json({
            appointments: appointmentsCount,
            doctors: doctorsCount,
            clinics: clinicsCount,
            patients: patientsCount,
        });
    }
    catch (error) {
        console.error("🔥 getDashboardStats error:", error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
const getAppointmentsAnalytics = async (req, res) => {
    try {
        const data = await appointment_model_1.Appointment.aggregate([
            {
                $group: {
                    _id: {
                        $month: "$appointmentDate",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
            {
                $project: {
                    _id: 0,
                    monthNumber: "$_id",
                    count: 1,
                },
            },
        ]);
        // تحويل رقم الشهر لاسم شهر
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const formatted = data.map((item) => ({
            month: months[item.monthNumber - 1],
            appointments: item.count,
        }));
        return res.status(200).json({
            data: formatted,
        });
    }
    catch (error) {
        console.error("🔥 analytics error:", error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getAppointmentsAnalytics = getAppointmentsAnalytics;
