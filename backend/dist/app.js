"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const doctor_routes_1 = __importDefault(require("./routes/doctor.routes"));
const clinic_routes_1 = __importDefault(require("./routes/clinic.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
/* =========================
   SECURITY MIDDLEWARES
========================= */
app.use((0, helmet_1.default)());
// app.use(mongoSanitize());
/* =========================
   CORE MIDDLEWARES
========================= */
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.set("trust proxy", true);
/* =========================
   CORS CONFIG
========================= */
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
/* =========================
   RATE LIMITING
========================= */
// app.use("/api/auth", authLimiter);
/* =========================
   ROUTES
========================= */
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/dashboard/appointments", appointment_routes_1.default);
app.use("/api/dashboard/doctors", doctor_routes_1.default);
app.use("/api/dashboard/clinics", clinic_routes_1.default);
exports.default = app;
