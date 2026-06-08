export interface Clinic {
  _id: string;
  name: string;
  description: string;
  image?: string;
  location: string;
  phone: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClinicDto {
  name: string;
  description: string;
  image?: string;
  location: string;
  phone: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
}

export interface ClinicsResponse {
  clinics: Clinic[];
  totalClinics: number;
  totalPages: number;
  currentPage: number;
}
