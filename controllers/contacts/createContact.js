import asyncHandler from "express-async-handler";
import { Contact } from "../../models/index.js";

export const createContact = asyncHandler(async (req, res) => {
   const contact = await Contact.create({ ...req.body });

   res.status(201).json({
      code: 201,
      data: contact,
   });
});
