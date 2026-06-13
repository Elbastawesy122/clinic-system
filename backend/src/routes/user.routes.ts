import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
  getPatientById,
  getPatients,
} from "../controllers/user.controller";

import { protect } from "../middlewares/protect";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate.middleware";
import { upload } from "../middlewares/upload.middleware";

import { updateUserSchema } from "../validations/user.validation";

const router = Router();

/*
|--------------------------------------------------------------------------
| ADMIN - USERS MANAGEMENT
|--------------------------------------------------------------------------
*/

router.route("/").get(protect, authorize("admin"), getAllUsers);

router
  .route("/:id")
  .get(protect, getUserById)
  .put(protect, upload.single("image"), validate(updateUserSchema), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

/*
|--------------------------------------------------------------------------
| USER STATUS ACTIONS (ADMIN ONLY)
|--------------------------------------------------------------------------
*/

router.patch("/block/:id", protect, authorize("admin"), blockUser);

router.patch("/unblock/:id", protect, authorize("admin"), unblockUser);

/*
|--------------------------------------------------------------------------
| DASHBOARD - PATIENTS (ADMIN / DOCTOR)
|--------------------------------------------------------------------------
*/

router.get(
  "/dashboard/patients",
  protect,
  authorize("admin", "doctor"),
  getPatients,
);

router.get(
  "/dashboard/patients/:id",
  protect,
  authorize("admin", "doctor"),
  getPatientById,
);

export default router;
