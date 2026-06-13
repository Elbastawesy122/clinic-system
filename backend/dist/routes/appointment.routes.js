"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
const protect_1 = require("../middlewares/protect");
const authorize_1 = require("../middlewares/authorize");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const appointment_validation_1 = require("../validations/appointment.validation");
const router = (0, express_1.Router)();
/* =========================
   ROOT ROUTE (ADMIN + CREATE)
========================= */
router
    .route("/")
    .get(protect_1.protect, (0, authorize_1.authorize)("admin"), appointment_controller_1.getAppointments)
    .post(protect_1.protect, (0, authorize_1.authorize)("patient"), (0, validate_middleware_1.validate)(appointment_validation_1.createAppointmentSchema), appointment_controller_1.createAppointment);
/* =========================
   PATIENT APPOINTMENTS
========================= */
router.get("/my", protect_1.protect, (0, authorize_1.authorize)("patient"), appointment_controller_1.getMyAppointments);
/* =========================
   DOCTOR APPOINTMENTS
========================= */
router.get("/doctor", protect_1.protect, (0, authorize_1.authorize)("doctor"), appointment_controller_1.getDoctorAppointments);
/* =========================
   SINGLE APPOINTMENT
========================= */
router
    .route("/:id")
    .get(protect_1.protect, appointment_controller_1.getAppointmentById)
    .put(protect_1.protect, (0, validate_middleware_1.validate)(appointment_validation_1.updateAppointmentSchema), appointment_controller_1.updateAppointment)
    .delete(protect_1.protect, appointment_controller_1.deleteAppointment);
/* =========================
   STATUS UPDATE (ADMIN / DOCTOR)
========================= */
router.patch("/status/:id", protect_1.protect, (0, authorize_1.authorize)("admin", "doctor"), (0, validate_middleware_1.validate)(appointment_validation_1.updateAppointmentStatusSchema), appointment_controller_1.updateAppointmentStatus);
/* =========================
   CANCEL APPOINTMENT
========================= */
router.patch("/cancel/:id", protect_1.protect, appointment_controller_1.cancelAppointment);
exports.default = router;
