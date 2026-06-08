export interface Doctor {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  clinic: {
    _id: string;
    name: string;
  };
  specialization: string;
  experience: number;
  fees: number;
  bio: string;
  image?: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorDto {
  name: string;
  email: string;
  phone: string;
  clinic: string;
  specialization: string;
  experience: number;
  fees: number;
  bio: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
}

export interface DoctorsResponse {
  doctors: Doctor[];
  totalDoctors: number;
  totalPages: number;
  currentPage: number;
}