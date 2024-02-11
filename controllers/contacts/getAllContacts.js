import asyncHandler from "express-async-handler";
import { Contact } from "../../models/index.js";

//Отримати всі контакти
export const getAllContacts = asyncHandler(async (_, res) => {
   const contacts = await Contact.find({});
   res.status(200).json({
      code: 200,
      quantity: contacts.length,
      data: contacts,
   });
});
