import { Appointment } from "@/types/appointment.types";

export const appointments: Appointment[] = [
  {
    id: "1",

    patient: "Ahmed Mohamed",

    doctor: "Dr. Sarah",

    clinic: "Eye Clinic",

    date: "2026-05-24",

    time: "10:00 AM",

    status: "Confirmed",
  },

  {
    id: "2",

    patient: "Ali Hassan",

    doctor: "Dr. Karim",

    clinic: "ENT Clinic",

    date: "2026-05-25",

    time: "01:00 PM",

    status: "Pending",
  },

  {
    id: "3",

    patient: "Mona Adel",

    doctor: "Dr. Nada",

    clinic: "Dental Clinic",

    date: "2026-05-26",

    time: "03:00 PM",

    status: "Cancelled",
  },
];
