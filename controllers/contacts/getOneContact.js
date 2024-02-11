import asyncHandler from "express-async-handler";
import { Contact } from "../../models/index.js";
import { HttpError } from "../../helpers/index.js";

export const getOneContact = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const contact = await Contact.findById(id);

   if (!contact) {
      throw HttpError(404, `Contact with id: ${id} is not found`);
   }

   res.status(200).json({
      code: 200,
      data: contact,
   });
});
