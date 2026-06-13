"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleClinicStatus = exports.deleteClinic = exports.updateClinic = exports.getClinicById = exports.getClinics = exports.createClinic = void 0;
const clinic_model_1 = require("../models/clinic.model");
const createClinic = async (req, res) => {
    try {
        const existingClinic = await clinic_model_1.Clinic.findOne({
            name: req.body.name,
        });
        if (existingClinic) {
            return res.status(400).json({
                message: "Clinic already exists",
            });
        }
        const clinic = await clinic_model_1.Clinic.create(req.body);
        res.status(201).json({
            message: "Clinic created successfully",
            clinic,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.createClinic = createClinic;
const getClinics = async (req, res) => {
    try {
        const search = req.query.search || "";
        const filter = search
            ? {
                name: {
                    $regex: search,
                    $options: "i",
                },
            }
            : {};
        const totalClinics = await clinic_model_1.Clinic.countDocuments(filter);
        const clinics = await clinic_model_1.Clinic.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            clinics,
            totalClinics,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getClinics = getClinics;
const getClinicById = async (req, res) => {
    try {
        const clinic = await clinic_model_1.Clinic.findById(req.params.id);
        if (!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            });
        }
        res.status(200).json(clinic);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.getClinicById = getClinicById;
const updateClinic = async (req, res) => {
    try {
        const clinic = await clinic_model_1.Clinic.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            });
        }
        res.status(200).json({
            message: "Clinic updated",
            clinic,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.updateClinic = updateClinic;
const deleteClinic = async (req, res) => {
    try {
        const clinic = await clinic_model_1.Clinic.findById(req.params.id);
        if (!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            });
        }
        await clinic.deleteOne();
        res.status(200).json({
            message: "Clinic deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.deleteClinic = deleteClinic;
const toggleClinicStatus = async (req, res) => {
    try {
        const clinic = await clinic_model_1.Clinic.findById(req.params.id);
        if (!clinic) {
            return res.status(404).json({
                message: "Clinic not found",
            });
        }
        clinic.isActive = !clinic.isActive;
        await clinic.save();
        res.status(200).json({
            message: "Clinic status updated",
            clinic,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};
exports.toggleClinicStatus = toggleClinicStatus;
