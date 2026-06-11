import { Patient, DoctorPatient } from "@/types/patient.types";

export const isDoctorPatient = (p: Patient | DoctorPatient): p is DoctorPatient => {
  return "patient" in p;
};
