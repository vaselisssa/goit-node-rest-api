import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { NODEMAILER_EMAIL, NODEMAILER_PASS } = process.env;

const nodemailerConfig = {
   host: "smtp.meta.ua",
   port: 465,
   secure: true,
   auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASS,
   },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
   const email = { ...data, from: NODEMAILER_EMAIL };
   await transport.sendMail(email);

   // const emailOptions = {
   //    from: NODEMAILER_EMAIL,
   //    to: email,
   //    subject: "Email Verification",
   //    text: `Please verify your email: ${verificationLink}`,
   //    html: `<p>Please verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
   // };
};
