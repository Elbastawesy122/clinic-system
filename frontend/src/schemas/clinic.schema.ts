import { z } from "zod";

export const clinicFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(5),
  location: z.string().min(3),
  phone: z.string().min(10),
  image: z.string().optional(),
  workingDays: z.array(z.string()).min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
});

export type ClinicFormValues = z.infer<typeof clinicFormSchema>;

export const workingDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
