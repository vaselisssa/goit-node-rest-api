import asyncHandler from "express-async-handler";
import { User } from "../../models/index.js";

export const logout = asyncHandler(async (req, res) => {
   const { _id } = req.user;
   await User.findByIdAndUpdate(_id, { token: "" });

   res.status(204).json({
      code: 204,
      message: "User is logged out",
   });
});
