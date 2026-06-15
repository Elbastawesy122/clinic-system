// import nodemailer from "nodemailer";

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

import { Resend } from "resend";

let resend: Resend;

function getResend() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("❌ RESEND_API_KEY is missing at runtime");
    }

    resend = new Resend(apiKey);
  }

  return resend;
}

export const sendMail = async (to: string, subject: string, html: string) => {
  const client = getResend();

  return await client.emails.send({
    from: `Clinic System <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
