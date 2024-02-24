import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

dotenv.config();
const { SECRET_KEY } = process.env;

export const login = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (!user) {
      throw HttpError(401, "Email or password is wrong");
   }

   if (!user.verify) {
      throw HttpError(401, "Email isn't verified");
   }

   const isValidPassword = await bcryptjs.compare(password, user.password);

   if (!isValidPassword) {
      throw HttpError(401, "Email or password is wrong");
   }

   const payload = {
      id: user._id,
   };

   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
   await User.findByIdAndUpdate(user._id, { token });

   res.status(200).json({
      token,
      user: {
         email: user.email,
         subscription: user.subscription,
      },
   });
});
