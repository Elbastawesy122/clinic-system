import { Router } from "express";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  blockUser,
  unblockUser,
} from "../controllers/user.controller";

import { protect } from "../middlewares/protect";
import { authorize } from "../middlewares/authorize";
import { validate } from "../middlewares/validate.middleware";
import { updateUserSchema } from "../validations/user.validation";

const router = Router();

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get("/", protect, authorize("admin"), getAllUsers);

router.delete("/:id", protect, authorize("admin"), deleteUser);

router.patch("/block/:id", protect, authorize("admin"), blockUser);

router.patch("/unblock/:id", protect, authorize("admin"), unblockUser);

/*
|--------------------------------------------------------------------------
| Authenticated Users
|--------------------------------------------------------------------------
*/

router.get("/:id", protect, getUserById);

router.put("/:id", protect, validate(updateUserSchema), updateUser);

export default router;
