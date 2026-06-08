import { Request, Response } from "express";
import { Clinic } from "../models/clinic.model";

export const createClinic = async (req: Request, res: Response) => {
  try {
    const existingClinic = await Clinic.findOne({
      name: req.body.name,
    });

    if (existingClinic) {
      return res.status(400).json({
        message: "Clinic already exists",
      });
    }

    const clinic = await Clinic.create(req.body);

    res.status(201).json({
      message: "Clinic created successfully",

      clinic,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getClinics = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";

    const filter = search
      ? {
          name: {
            $regex: search,
            $options: "i",
          },
        }
      : {};

    const totalClinics = await Clinic.countDocuments(filter);

    const clinics = await Clinic.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      clinics,
      totalClinics,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getClinicById = async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        message: "Clinic not found",
      });
    }

    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateClinic = async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteClinic = async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res.status(404).json({
        message: "Clinic not found",
      });
    }

    await clinic.deleteOne();

    res.status(200).json({
      message: "Clinic deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const toggleClinicStatus = async (req: Request, res: Response) => {
  try {
    const clinic = await Clinic.findById(req.params.id);

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
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
