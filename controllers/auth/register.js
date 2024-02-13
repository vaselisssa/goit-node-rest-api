import bcryptjs from "bcryptjs";
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
   const newUser = await User.create({ ...req.body, password: hashPassword });

   res.status(201).json({
      user: {
         email: newUser.email,
         subscription: newUser.subscription,
      },
   });
});
