import Joi from "joi";

export const createAppointmentSchema = Joi.object({
  doctor: Joi.string().required(),
  clinic: Joi.string().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
});

export const updateAppointmentSchema = Joi.object({
  doctor: Joi.string(),
  clinic: Joi.string(),
  date: Joi.string(),
  time: Joi.string(),
  status: Joi.string().valid("Pending", "Confirmed", "Cancelled"),
});
