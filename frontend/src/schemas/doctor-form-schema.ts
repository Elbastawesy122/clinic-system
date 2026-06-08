import { z } from "zod";

export const doctorFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  clinic: z.string().min(1),
  specialization: z.string().min(2),
  experience: z.number().min(0),
  fees: z.number().min(0),
  bio: z.string().min(5),
  workingDays: z.array(z.string()).min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;

export const workingDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
