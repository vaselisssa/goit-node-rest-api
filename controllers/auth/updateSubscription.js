import asyncHandler from "express-async-handler";
import { User } from "../../models/index.js";

export const updateSubscription = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   const { subscription } = req.body;

   await User.findByIdAndUpdate(_id, { subscription });
   res.status(200).json({
      code: 200,
      message: `Subscription updated to ${subscription}`,
   });
});
