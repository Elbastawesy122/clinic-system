"use strict";
// import nodemailer from "nodemailer";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
// export const sendMail = async (to: string, subject: string, html: string) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     html,
//   });
// };
////////////////////////////////////////////////////////////////////////////////////
// import { Resend } from "resend";
// let resend: Resend;
// function getResend() {
//   if (!resend) {
//     const apiKey = process.env.RESEND_API_KEY;
//     if (!apiKey) {
//       throw new Error("❌ RESEND_API_KEY is missing at runtime");
//     }
//     resend = new Resend(apiKey);
//   }
//   return resend;
// }
// export const sendMail = async (to: string, subject: string, html: string) => {
//   const client = getResend();
//   return await client.emails.send({
//     from: `Clinic System <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
// };
/////////////////////////////////////////////////////////////////
// import sgMail from "@sendgrid/mail";
// let sendgrid: typeof sgMail;
// function getSendGrid() {
//   if (!sendgrid) {
//     const apiKey = process.env.SENDGRID_API_KEY;
//     if (!apiKey) {
//       throw new Error("❌ SENDGRID_API_KEY is missing at runtime");
//     }
//     sgMail.setApiKey(apiKey);
//     sendgrid = sgMail;
//   }
//   return sendgrid;
// }
// export const sendMail = async (to: string, subject: string, html: string) => {
//   const client = getSendGrid();
//   return await client.send({
//     to,
//     from: `Clinic System <${process.env.EMAIL_USER}>`,
//     replyTo: process.env.EMAIL_USER,
//     subject,
//     html,
//   });
// };
const axios_1 = __importDefault(require("axios"));
const sendMail = async (to, subject, html) => {
    console.log("BREVO_API_KEY EXISTS:", !!process.env.BREVO_API_KEY);
    if (!process.env.BREVO_API_KEY) {
        throw new Error("BREVO_API_KEY is missing");
    }
    if (!process.env.EMAIL_USER) {
        throw new Error("EMAIL_USER is missing");
    }
    const response = await axios_1.default.post("https://api.brevo.com/v3/smtp/email", {
        sender: {
            name: "Clinic System",
            email: process.env.EMAIL_USER,
        },
        to: [
            {
                email: to,
            },
        ],
        subject,
        htmlContent: html,
    }, {
        headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
exports.sendMail = sendMail;
