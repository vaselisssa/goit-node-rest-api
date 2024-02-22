import asyncHandler from "express-async-handler";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import { User } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

const avatarsDir = path.resolve("public", "avatars");
console.log(avatarsDir);

export const updateAvatar = asyncHandler(async (req, res) => {
   const { _id } = req.user;

   if (!req.file) {
      throw HttpError(400, "Avatar is required.");
   }

   const { path: tempUpload, originalname } = req.file;

   const fileName = `${_id}_${originalname}`;
   const resultUpload = path.resolve(avatarsDir, fileName);

   const image = await Jimp.read(tempUpload);
   image.resize(250, 250).write(tempUpload);
   await fs.rename(tempUpload, resultUpload);

   const avatarURL = path.join("avatars", fileName);
   await User.findByIdAndUpdate(_id, { avatarURL });

   res.json({
      avatarURL,
   });
});
