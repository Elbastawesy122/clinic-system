import express from "express";

import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";

import { protect } from "../middlewares/protect";

import { validate } from "../middlewares/validate.middleware";

import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "../validations/appointment.validation";

const router = express.Router();

router.post("/", protect, validate(createAppointmentSchema), createAppointment);

router.get("/", protect, getAppointments);

router.get("/:id", protect, getAppointmentById);

router.put(
  "/:id",
  protect,
  validate(updateAppointmentSchema),
  updateAppointment,
);

router.delete("/:id", protect, deleteAppointment);

export default router;
