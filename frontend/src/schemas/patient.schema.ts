import { z } from "zod";

const objectId = z.string().min(1, "Invalid ID");

export const patientSchema = z.object({
  _id: objectId,
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  role: z.literal("patient"),
  isBlocked: z.boolean(),
  isVerified: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const patientPreviewSchema = z.object({
  _id: objectId,
  name: z.string(),
  email: z.string().email(),
});

export type PatientPreview = z.infer<typeof patientPreviewSchema>;

export type PatientSchemaType = z.infer<typeof patientSchema>;
