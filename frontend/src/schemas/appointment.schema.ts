import { z } from "zod";

export const appointmentStatusEnum = z.enum(["pending", "confirmed", "completed", "cancelled"]);

export const appointmentSchema = z.object({
  doctor: z.string(),
  clinic: z.string(),
  appointmentDate: z.string(),
  timeSlot: z.string(),
  notes: z.string().optional(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;

export const updateAppointmentSchema = appointmentSchema.partial();

export const updateAppointmentStatusSchema = z.object({
  status: appointmentStatusEnum,
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export type UpdateAppointmentStatusValues = z.infer<typeof updateAppointmentStatusSchema>;
