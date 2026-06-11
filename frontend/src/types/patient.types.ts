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

export interface DoctorPatient {
  patient: Patient;
}

export interface PatientsResponse {
  patients: Patient[];
  totalPatients: number;
  totalPages: number;
  currentPage: number;
}

export interface DoctorPatientsResponse {
  patients: DoctorPatient[];
  totalPatients: number;
  totalPages: number;
  currentPage: number;
}

export type PatientRow = Patient | DoctorPatient;