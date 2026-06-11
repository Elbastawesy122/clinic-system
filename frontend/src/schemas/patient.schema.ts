import { z } from "zod";

export const patientSchema = z.object({
  _id: z.string(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.literal("patient"),
  isBlocked: z.boolean(),
  isVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type PatientSchemaType = z.infer<typeof patientSchema>;
