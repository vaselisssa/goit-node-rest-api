import asyncHandler from "express-async-handler";
import { Contact } from "../../models/index.js";

export const createContact = asyncHandler(async (req, res) => {
   const { _id: owner } = req.user;
   const contact = await Contact.create({ ...req.body, owner });

   res.status(201).json({
      code: 201,
      data: contact,
   });
});
