import mongoose from "mongoose";

export interface IAppointment extends mongoose.Document {
  patient: mongoose.Types.ObjectId;
  doctor: string;
  clinic: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: String,
      required: true,
    },
    clinic: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,

      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

export const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema,
);
