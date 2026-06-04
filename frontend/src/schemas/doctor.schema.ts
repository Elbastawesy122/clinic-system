import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  specialization: z.string(),
  experience: z.coerce.number(),
  fees: z.coerce.number(),
  gender: z.enum(["Male", "Female"]),
  clinic: z.string(),
  workingDays: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string(),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;
