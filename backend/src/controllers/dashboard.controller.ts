import { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";
import { Doctor } from "../models/doctor.model";
import { Clinic } from "../models/clinic.model";
import { User } from "../models/user.model";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [appointmentsCount, doctorsCount, clinicsCount, patientsCount] =
      await Promise.all([
        Appointment.countDocuments(),
        Doctor.countDocuments(),
        Clinic.countDocuments(),
        User.countDocuments({ role: "patient" }),
      ]);

    return res.status(200).json({
      appointments: appointmentsCount,
      doctors: doctorsCount,
      clinics: clinicsCount,
      patients: patientsCount,
    });
  } catch (error) {
    console.error("🔥 getDashboardStats error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAppointmentsAnalytics = async (req: Request, res: Response) => {
  try {
    const data = await Appointment.aggregate([
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
  } catch (error) {
    console.error("🔥 analytics error:", error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};
