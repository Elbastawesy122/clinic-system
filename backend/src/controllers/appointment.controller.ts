import { Request, Response } from "express";
import { Appointment } from "../models/appointment.model";
import { AuthRequest } from "../types/auth-request";

export const createAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { doctor, clinic, date, time } = req.body;
    const exists = await Appointment.findOne({
      doctor,
      date,
      time,
    });

    if (exists) {
      return res.status(400).json({
        message: "Appointment already booked",
      });
    }

    const appointment = await Appointment.create({
      patient: req.user?._id,
      doctor,
      clinic,
      date,
      time,
    });

    res.status(201).json({
      message: "Appointment created",
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
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patient",
      "name email",
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment updated",

      appointment,
    });
  } catch (error) {
    res.status(500).json({
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
