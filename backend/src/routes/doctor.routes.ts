import { Router } from "express";

import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  setupDoctorPassword,
} from "../controllers/doctor.controller";

import { protect } from "../middlewares/protect";

import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate.middleware";
import {
  createDoctorSchema,
  updateDoctorSchema,
} from "../validations/doctor.validation";

const router = Router();

router.get("/", protect, getDoctors);
router.get("/:id", protect, getDoctorById);
router.post(
  "/",
  protect,
  authorize("admin"),
  validate(createDoctorSchema),
  createDoctor,
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  validate(updateDoctorSchema),
  updateDoctor,
);
router.delete("/:id", protect, authorize("admin"), deleteDoctor);
router.post("/setup-password/:token", setupDoctorPassword);

export default router;
