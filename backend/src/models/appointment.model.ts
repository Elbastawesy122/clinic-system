import mongoose, { Types } from "mongoose";

export interface IAppointment extends mongoose.Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  clinic: Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clinic",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes: String,
  },
  {
    timestamps: true,
  },
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema,
);
