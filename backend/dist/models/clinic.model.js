"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clinic = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clinicSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: "",
    },
    image: String,
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    workingDays: [
        {
            type: String,
        },
    ],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Clinic = mongoose_1.default.model("Clinic", clinicSchema);
