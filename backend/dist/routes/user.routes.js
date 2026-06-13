"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const protect_1 = require("../middlewares/protect");
const authorize_1 = require("../middlewares/authorize");
const validate_middleware_1 = require("../middlewares/validate.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const user_validation_1 = require("../validations/user.validation");
const router = (0, express_1.Router)();
/*
|--------------------------------------------------------------------------
| ADMIN - USERS MANAGEMENT
|--------------------------------------------------------------------------
*/
router.route("/").get(protect_1.protect, (0, authorize_1.authorize)("admin"), user_controller_1.getAllUsers);
router
    .route("/:id")
    .get(protect_1.protect, user_controller_1.getUserById)
    .put(protect_1.protect, upload_middleware_1.upload.single("image"), (0, validate_middleware_1.validate)(user_validation_1.updateUserSchema), user_controller_1.updateUser)
    .delete(protect_1.protect, (0, authorize_1.authorize)("admin"), user_controller_1.deleteUser);
/*
|--------------------------------------------------------------------------
| USER STATUS ACTIONS (ADMIN ONLY)
|--------------------------------------------------------------------------
*/
router.patch("/block/:id", protect_1.protect, (0, authorize_1.authorize)("admin"), user_controller_1.blockUser);
router.patch("/unblock/:id", protect_1.protect, (0, authorize_1.authorize)("admin"), user_controller_1.unblockUser);
/*
|--------------------------------------------------------------------------
| DASHBOARD - PATIENTS (ADMIN / DOCTOR)
|--------------------------------------------------------------------------
*/
router.get("/dashboard/patients", protect_1.protect, (0, authorize_1.authorize)("admin", "doctor"), user_controller_1.getPatients);
router.get("/dashboard/patients/:id", protect_1.protect, (0, authorize_1.authorize)("admin", "doctor"), user_controller_1.getPatientById);
exports.default = router;
