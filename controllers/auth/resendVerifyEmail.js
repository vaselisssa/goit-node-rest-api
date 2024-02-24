import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";
import { sendEmail } from "../../helpers/index.js";

dotenv.config();
const { PORT } = process.env;

export const resendVerifyEmail = asyncHandler(async (req, res) => {
   const { email } = req.body;

   const user = await User.findOne({ email });

   if (!user) {
      throw HttpError(404, "User not found");
   }

   if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
   }

   const verifyEmail = {
      to: email,
      subject: "Email Verification",
      html: `<a href="http://localhost:${PORT}/users/verify/${user.verificationToken}">Click to verify email.</a>`,
   };

   await sendEmail(verifyEmail);

   res.status(200).json({
      message: "Verification email sent",
   });
});
