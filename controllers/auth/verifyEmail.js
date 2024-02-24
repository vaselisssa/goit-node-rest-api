import asyncHandler from "express-async-handler";
import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

export const verifyEmail = asyncHandler(async (req, res) => {
   const { verificationToken } = req.params;

   const user = await User.findOne({ verificationToken });
   if (!user) {
      throw HttpError(404, "User not found");
   }

   await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
   });

   res.status(200).json({
      message: "Verification successful",
   });
});
