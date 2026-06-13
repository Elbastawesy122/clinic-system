"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clinic_controller_1 = require("../controllers/clinic.controller");
const protect_1 = require("../middlewares/protect");
const authorize_1 = require("../middlewares/authorize");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const clinic_validation_1 = require("../validations/clinic.validation");
const router = (0, express_1.Router)();
/* =========================
   CLINICS (PUBLIC / AUTHED)
========================= */
// Get all clinics + create clinic (admin only)
router
    .route("/")
    .get(protect_1.protect, clinic_controller_1.getClinics)
    .post(protect_1.protect, (0, authorize_1.authorize)("admin"), (0, validate_middleware_1.validate)(clinic_validation_1.createClinicSchema), clinic_controller_1.createClinic);
/* =========================
   SINGLE CLINIC
========================= */
router
    .route("/:id")
    .get(protect_1.protect, clinic_controller_1.getClinicById)
    .put(protect_1.protect, (0, authorize_1.authorize)("admin"), (0, validate_middleware_1.validate)(clinic_validation_1.updateClinicSchema), clinic_controller_1.updateClinic)
    .delete(protect_1.protect, (0, authorize_1.authorize)("admin"), clinic_controller_1.deleteClinic);
/* =========================
   SPECIAL ACTIONS
========================= */
router.patch("/toggle-status/:id", protect_1.protect, (0, authorize_1.authorize)("admin"), clinic_controller_1.toggleClinicStatus);
exports.default = router;
