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

router.post(
  "/",
  protect,
  authorize("patient"),
  validate(createAppointmentSchema),
  createAppointment,
);

router.get("/", protect, authorize("admin"), getAppointments);

router.get("/my", protect, authorize("patient"), getMyAppointments);

router.get("/doctor", protect, authorize("doctor"), getDoctorAppointments);

router.get("/:id", protect, getAppointmentById);

router.put(
  "/:id",
  protect,
  validate(updateAppointmentSchema),
  updateAppointment,
);

router.delete("/:id", protect, deleteAppointment);

router.patch(
  "/status/:id",
  protect,
  authorize("admin", "doctor"),
  validate(updateAppointmentStatusSchema),
  updateAppointmentStatus,
);

router.patch("/cancel/:id", protect, cancelAppointment);

export default router;
