import asyncHandler from "express-async-handler";
import { Contact } from "../models/ContactModel.js";
import HttpError from "../helpers/HttpError.js";

//Отримати всі контакти
export const getAllContacts = asyncHandler(async (_, res) => {
   const contacts = await Contact.find({});
   res.status(200).json({
      code: 200,
      quantity: contacts.length,
      data: contacts,
   });
});

//Отримати один контакт 
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

//Видалити контакт
export const deleteContact = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const contact = await Contact.findByIdAndDelete(id);

   if (!contact) {
      throw HttpError(404, `Contact with id: ${id} is not found`);
   }

   res.status(200).json({ message: "Deleted successfully" });
});

//Додати контакт
export const createContact = asyncHandler(async (req, res) => {
   const contact = await Contact.create({ ...req.body });

   res.status(201).json({
      code: 201,
      data: contact,
   });
});

//Поновити контакт
export const updateContact = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const contact = await Contact.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
   );

   if (!contact) {
      throw HttpError(404, `Contact with id: ${id} is not found`);
   }

   res.status(200).json({
      code: 200,
      data: contact,
   });
});

//Поновити статус контакту
export const updateStatusContact = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const contact = await Contact.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
   );

   if (!contact) {
      throw HttpError(404, `Contact with id: ${id} is not found`);
   }

   res.status(200).json({
      code: 200,
      data: contact,
   });
});
