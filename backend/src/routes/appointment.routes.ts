import { Router } from "express";

import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  getMyAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  cancelAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

import { protect } from "../middlewares/protect";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate.middleware";

import {
  createAppointmentSchema,
  updateAppointmentSchema,
  updateAppointmentStatusSchema,
} from "../validations/appointment.validation";

const router = Router();

/* =========================
   ROOT ROUTE (ADMIN + CREATE)
========================= */
router
  .route("/")
  .get(protect, authorize("admin"), getAppointments)
  .post(
    protect,
    authorize("patient"),
    validate(createAppointmentSchema),
    createAppointment,
  );

/* =========================
   PATIENT APPOINTMENTS
========================= */
router.get("/my", protect, authorize("patient"), getMyAppointments);

/* =========================
   DOCTOR APPOINTMENTS
========================= */
router.get("/doctor", protect, authorize("doctor"), getDoctorAppointments);

/* =========================
   SINGLE APPOINTMENT
========================= */
router
  .route("/:id")
  .get(protect, getAppointmentById)
  .put(protect, validate(updateAppointmentSchema), updateAppointment)
  .delete(protect, deleteAppointment);

/* =========================
   STATUS UPDATE (ADMIN / DOCTOR)
========================= */
router.patch(
  "/status/:id",
  protect,
  authorize("admin", "doctor"),
  validate(updateAppointmentStatusSchema),
  updateAppointmentStatus,
);

/* =========================
   CANCEL APPOINTMENT
========================= */
router.patch("/cancel/:id", protect, cancelAppointment);

export default router;
