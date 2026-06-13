import { z } from "zod";

export const appointmentStatusEnum = z.enum(["pending", "confirmed", "completed", "cancelled"]);

export const appointmentSchema = z.object({
  doctor: z.string().min(1, "Doctor is required"),
  clinic: z.string().min(1, "Clinic is required"),
  appointmentDate: z
    .string()
    .min(1, "Appointment date is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid appointment date format",
    }),
  timeSlot: z
    .string()
    .min(1, "Time slot is required")
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Time slot must be in HH:mm format",
    }),
  notes: z.string().max(500, "Notes must not exceed 500 characters").optional(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;
export type AppointmentFormValues = AppointmentSchema;

export const updateAppointmentSchema = appointmentSchema.partial();

export const updateAppointmentStatusSchema = z.object({
  status: appointmentStatusEnum,
});

export type UpdateAppointmentStatusValues = z.infer<typeof updateAppointmentStatusSchema>;
