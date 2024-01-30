import {
   listContacts,
   getContactById,
   removeContact,
   addContact,
   updateById,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getAllContacts = ctrlWrapper(async (_, res) => {
   const result = await listContacts();
   res.json(result);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
   const { id } = req.params;
   const result = await getContactById(id);

   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }

   res.json(result);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
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

export const createContact = ctrlWrapper(async (req, res) => {
   const result = await addContact(req.body);
   res.status(201).json(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
   const { id } = req.params;
   const result = await updateById(id, req.body);

   if (!result) {
      throw HttpError(404, `Contact with id=${id} is not found`);
   }

   res.json(result);
});
