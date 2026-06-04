export interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  fees: number;
  gender: "Male" | "Female";
  image?: string;
  clinic: {
    _id: string;
    name: string;
  };
  workingDays: string[];
  startTime: string;
  endTime: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface DoctorDto {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  experience: number;
  fees: number;
  gender: "Male" | "Female";
  clinic: string;
  workingDays: string[];
  startTime: string;
  endTime: string;
  image?: string;
}
