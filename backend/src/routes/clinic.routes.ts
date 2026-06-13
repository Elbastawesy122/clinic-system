import { Router } from "express";

import {
  createClinic,
  getClinics,
  getClinicById,
  updateClinic,
  deleteClinic,
  toggleClinicStatus,
} from "../controllers/clinic.controller";

import { protect } from "../middlewares/protect";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate.middleware";

import {
  createClinicSchema,
  updateClinicSchema,
} from "../validations/clinic.validation";

const router = Router();

/* =========================
   CLINICS (PUBLIC / AUTHED)
========================= */

// Get all clinics + create clinic (admin only)
router
  .route("/")
  .get(protect, getClinics)
  .post(
    protect,
    authorize("admin"),
    validate(createClinicSchema),
    createClinic,
  );

/* =========================
   SINGLE CLINIC
========================= */

router
  .route("/:id")
  .get(protect, getClinicById)
  .put(protect, authorize("admin"), validate(updateClinicSchema), updateClinic)
  .delete(protect, authorize("admin"), deleteClinic);

/* =========================
   SPECIAL ACTIONS
========================= */

router.patch(
  "/toggle-status/:id",
  protect,
  authorize("admin"),
  toggleClinicStatus,
);

export default router;
