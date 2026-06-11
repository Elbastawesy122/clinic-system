export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface IAppointment {
  _id: string;

  patient: string;
  doctor: string;
  clinic: string;

  appointmentDate: string; 
  timeSlot: string;

  status: AppointmentStatus;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  _id: string;

  patient: {
    _id: string;
    name: string;
    email: string;
  };

  doctor: {
    _id: string;
    user: {
      _id: string;
      name: string;
    };
  };

  clinic: {
    _id: string;
    name: string;
  };

  appointmentDate: string;
  timeSlot: string;

  status: AppointmentStatus;

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

export interface AppointmentDto {
  doctor: string;
  clinic: string;
  appointmentDate: string;
  timeSlot: string;
  notes?: string;
}

export interface UpdateAppointmentStatusPayload {
  id: string;
  status: AppointmentStatus;
}

export interface AppointmentsResponse {
  appointments: Appointment[];
  totalAppointments: number;
  totalPages: number;
  currentPage: number;
}