import asyncHandler from "express-async-handler";

export const getCurrent = asyncHandler(async (req, res) => {
   const { email, subscription } = req.user;

   res.json({ email, subscription });
});
