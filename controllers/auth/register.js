import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import asyncHandler from "express-async-handler";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import { User } from "../../models/index.js";
import { HttpError, sendEmail } from "../../helpers/index.js";

dotenv.config();
const { PORT } = process.env;

export const register = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (user) {
      throw HttpError(409, "Email in use");
   }

   const hashPassword = await bcryptjs.hash(password, 10);
   const avatarURL = gravatar.url(email);
   const verificationToken = nanoid();

   const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
   });

   const verifyEmail = {
      to: email,
      subject: "Email Verification",
      html: `<a href="http://localhost:${PORT}/users/verify/${verificationToken}">Click to verify email.</a>`,
   };

   await sendEmail(verifyEmail);

   res.status(201).json({
      user: {
         email: newUser.email,
         subscription: newUser.subscription,
         avatarURL: newUser.avatarURL,
      },
   });
});
