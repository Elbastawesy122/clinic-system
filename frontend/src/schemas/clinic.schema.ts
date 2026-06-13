import { z } from "zod";

export const workingDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;

export type WorkingDay = (typeof workingDays)[number];

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const clinicFormSchema = z.object({
  name: z.string().min(3, "Clinic name must be at least 3 characters").max(100, "Clinic name is too long"),
  description: z.string().min(5, "Description must be at least 5 characters").max(1000, "Description is too long"),
  location: z.string().min(3, "Location must be at least 3 characters").max(255, "Location is too long"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
  workingDays: z.array(z.enum(workingDays)).min(1, "At least one working day is required"),
  startTime: z.string().regex(timeRegex, "Start time must be in HH:mm format"),
  endTime: z.string().regex(timeRegex, "End time must be in HH:mm format"),
});

export type ClinicFormValues = z.infer<typeof clinicFormSchema>;
