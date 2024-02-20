import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import asyncHandler from "express-async-handler";
import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

export const register = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (user) {
      throw HttpError(409, "Email in use");
   }

   const hashPassword = await bcryptjs.hash(password, 10);
   const avatarURL = gravatar.url(email);
   const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
   });

   res.status(201).json({
      user: {
         email: newUser.email,
         subscription: newUser.subscription,
         avatarURL: newUser.avatarURL,
      },
   });
});
