export interface Appointment {
  _id: string;
  patient: {
    name: string;
    email: string;
  };
  doctor: string;
  clinic: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

export interface CreateAppointmentDto {
  doctor: string;
  clinic: string;
  date: string;
  time: string;
}

export interface UpdateAppointmentDto {
  doctor?: string;
  clinic?: string;
  date?: string;
  time?: string;
  status?: string;
}
