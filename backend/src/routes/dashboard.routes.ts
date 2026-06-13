import { Router } from "express";
import { protect } from "../middlewares/protect";
import { authorize } from "../middlewares/authorize";

import {
  getDashboardStats,
  getAppointmentsAnalytics,
} from "../controllers/dashboard.controller";

const router = Router();

/*
|--------------------------------------------------------------------------
| Dashboard Stats
|--------------------------------------------------------------------------
*/
router.get("/stats", protect, authorize("admin"), getDashboardStats);

/*
|--------------------------------------------------------------------------
| Appointments Analytics
|--------------------------------------------------------------------------
*/
router.get(
  "/appointments/analytics",
  protect,
  authorize("admin"),
  getAppointmentsAnalytics
);

export default router;