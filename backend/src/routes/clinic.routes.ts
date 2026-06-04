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
import { createClinicSchema, updateClinicSchema } from "../validations/clinic.validation";

const router = Router();

router.get("/", protect, getClinics);

router.get("/:id", protect, getClinicById);

router.post("/", protect, authorize("admin"), validate(createClinicSchema), createClinic);

router.put("/:id", protect, authorize("admin"), validate(updateClinicSchema), updateClinic);

router.delete("/:id", protect, authorize("admin"), deleteClinic);

router.patch(
  "/toggle-status/:id",
  protect,
  authorize("admin"),
  toggleClinicStatus,
);

export default router;
