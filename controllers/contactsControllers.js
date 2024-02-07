import asyncHandler from "express-async-handler";
import { Contact } from "../models/ContactModel.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = asyncHandler(async (_, res) => {
   const result = await listContacts();
   res.json(result);
});

export const getOneContact = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const result = await getContactById(id);

   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }

   res.json(result);
});

export const deleteContact = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const result = await removeContact(id);

   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }

   res.json({
      result,
      message: "Delete success",
   });
});

export const createContact = asyncHandler(async (req, res, next) => {
   const contact = await Contact.create({ ...req.body });
   res.status(201).json({
      code: 201,
      data: contact,
   });
});

export const updateContact = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const result = await updateById(id, req.body);

   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }

   res.json(result);
});

export const updateFavorite = asyncHandler(async (req, res) => {
   const { id } = req.params;
   const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

   if (!result) {
      throw HttpError(404, "Not found");
   }

   res.json(result);
});
