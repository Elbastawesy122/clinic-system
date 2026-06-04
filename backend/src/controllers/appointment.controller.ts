import { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";
import { AuthRequest } from "../types/auth-request";
import { Doctor } from "../models/doctor.model";

export const createAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { doctor, clinic, appointmentDate, timeSlot, notes } = req.body;

    const existingAppointment = await Appointment.findOne({
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

    const appointment = await Appointment.create({
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
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email",
        },
      })
      .populate("clinic", "name")
      .sort({
        appointmentDate: -1,
      });

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
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
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { doctor, appointmentDate, timeSlot } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    if (doctor || appointmentDate || timeSlot) {
      const existing = await Appointment.findOne({
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

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      message: "Appointment updated successfully",
      appointment: updatedAppointment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const appointments = await Appointment.find({
      patient: req.user?._id,
    })

      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name",
        },
      })

      .populate("clinic", "name");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getDoctorAppointments = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const doctor = await Doctor.findOne({
      user: req.user?._id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
      });
    }

    const appointments = await Appointment.find({
      doctor: doctor._id,
    })
      .populate("patient", "name email")
      .populate("clinic", "name");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

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
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

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
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
