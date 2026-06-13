"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctor_controller_1 = require("../controllers/doctor.controller");
const protect_1 = require("../middlewares/protect");
const authorize_1 = require("../middlewares/authorize");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const doctor_validation_1 = require("../validations/doctor.validation");
const router = (0, express_1.Router)();
/* =========================
   PUBLIC / AUTH FLOW
========================= */
// Setup password (first login flow)
router.post("/setup-password/:token", doctor_controller_1.setupDoctorPassword);
/* =========================
   DOCTOR DASHBOARD
========================= */
// Doctor's patients (admin can also access)
router.get("/my-patients", protect_1.protect, (0, authorize_1.authorize)("doctor", "admin"), doctor_controller_1.getMyPatients);
/* =========================
   DOCTORS COLLECTION
========================= */
router
    .route("/")
    .get(protect_1.protect, doctor_controller_1.getDoctors)
    .post(protect_1.protect, (0, authorize_1.authorize)("admin"), (0, validate_middleware_1.validate)(doctor_validation_1.createDoctorSchema), doctor_controller_1.createDoctor);
/* =========================
   SINGLE DOCTOR
========================= */
router
    .route("/:id")
    .get(protect_1.protect, doctor_controller_1.getDoctorById)
    .put(protect_1.protect, (0, authorize_1.authorize)("admin"), (0, validate_middleware_1.validate)(doctor_validation_1.updateDoctorSchema), doctor_controller_1.updateDoctor)
    .delete(protect_1.protect, (0, authorize_1.authorize)("admin"), doctor_controller_1.deleteDoctor);
exports.default = router;
