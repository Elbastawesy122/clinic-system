"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protect_1 = require("../middlewares/protect");
const authorize_1 = require("../middlewares/authorize");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = (0, express_1.Router)();
/*
|--------------------------------------------------------------------------
| Dashboard Stats
|--------------------------------------------------------------------------
*/
router.get("/stats", protect_1.protect, (0, authorize_1.authorize)("admin"), dashboard_controller_1.getDashboardStats);
/*
|--------------------------------------------------------------------------
| Appointments Analytics
|--------------------------------------------------------------------------
*/
router.get("/appointments/analytics", protect_1.protect, (0, authorize_1.authorize)("admin"), dashboard_controller_1.getAppointmentsAnalytics);
exports.default = router;
