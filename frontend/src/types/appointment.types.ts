export interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  clinic: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}
