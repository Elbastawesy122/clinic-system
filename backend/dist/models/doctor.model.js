"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const doctorSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    clinic: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Clinic",
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        default: 0,
    },
    fees: {
        type: Number,
        required: true,
    },
    bio: {
        type: String,
        default: "",
    },
    image: String,
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
    isAvailable: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Doctor = mongoose_1.default.model("Doctor", doctorSchema);
