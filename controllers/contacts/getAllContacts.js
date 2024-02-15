import asyncHandler from "express-async-handler";
import { Contact } from "../../models/index.js";

//Отримати всі контакти
export const getAllContacts = asyncHandler(async (req, res) => {
   const { _id: owner } = req.user;
   const { page = 1, limit = 20 } = req.query;
   const skip = (page - 1) * limit;

   const contacts = await Contact.find({ owner }, { skip, limit }).populate(
      "owner",
      "email"
   );

   res.status(200).json({
      code: 200,
      quantity: contacts.length,
      data: contacts,
   });
});
