import { z } from "zod";
import { workingDays } from "./clinic.schema";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const doctorFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name is too long"),
    email: z.string().email("Invalid email format"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    clinic: z.string().min(1, "Clinic is required"),
    specialization: z.string().min(2, "Specialization must be at least 2 characters").max(100, "Specialization is too long"),
    experience: z.number().min(0, "Experience cannot be negative").max(60, "Experience seems invalid"),
    fees: z.number().min(0, "Fees cannot be negative").max(100000, "Fees is too large"),
    bio: z.string().min(5, "Bio must be at least 5 characters").max(1000, "Bio is too long"),
    workingDays: z.array(z.enum(workingDays)).min(1, "At least one working day is required"),
    startTime: z.string().regex(timeRegex, "Start time must be in HH:mm format"),
    endTime: z.string().regex(timeRegex, "End time must be in HH:mm format"),
  })

  .refine((data) => data.startTime < data.endTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;
