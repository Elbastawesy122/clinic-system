import { Router } from "express";

import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  setupDoctorPassword,
  getMyPatients,
} from "../controllers/doctor.controller";

import { protect } from "../middlewares/protect";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate.middleware";

import {
  createDoctorSchema,
  updateDoctorSchema,
} from "../validations/doctor.validation";

const router = Router();

/* =========================
   PUBLIC / AUTH FLOW
========================= */

// Setup password (first login flow)
router.post("/setup-password/:token", setupDoctorPassword);

/* =========================
   DOCTOR DASHBOARD
========================= */

// Doctor's patients (admin can also access)
router.get(
  "/my-patients",
  protect,
  authorize("doctor", "admin"),
  getMyPatients,
);

/* =========================
   DOCTORS COLLECTION
========================= */

router
  .route("/")
  .get(protect, getDoctors)
  .post(
    protect,
    authorize("admin"),
    validate(createDoctorSchema),
    createDoctor,
  );

/* =========================
   SINGLE DOCTOR
========================= */

router
  .route("/:id")
  .get(protect, getDoctorById)
  .put(protect, authorize("admin"), validate(updateDoctorSchema), updateDoctor)
  .delete(protect, authorize("admin"), deleteDoctor);

export default router;
