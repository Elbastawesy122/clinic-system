export interface Patient {
  _id: string;
  name: string;
  email: string;
  role: "patient";
  isBlocked: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PatientsResponse {
  users: Patient[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

export interface DoctorPatient {
  _id: string;
  name: string;
  email: string;
}

export interface DoctorPatientsResponse {
  patient: DoctorPatient;
  clinic: {
    _id: string;
    name: string;
  };
  appointmentDate: string;
  timeSlot: string;
  status: string;
}
