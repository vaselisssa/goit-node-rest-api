import express from "express";
import {
   getAllContacts,
   getOneContact,
   deleteContact,
   createContact,
   updateContact,
   updateStatusContact,
} from "../controllers/contacts/index.js";
import { contactsSchemas } from "../schemas/index.js";
import {
   authMiddleware,
   validateBody,
   validateId,
} from "../midlewares/index.js";

const { createContactSchema, updateContactSchema, updateFavoriteSchema } =
   contactsSchemas;

const contactsRouter = express.Router();

contactsRouter.get("/", authMiddleware, getAllContacts);

contactsRouter.get("/:id", authMiddleware, validateId, getOneContact);

contactsRouter.delete("/:id", authMiddleware, validateId, deleteContact);

contactsRouter.post(
   "/",
   authMiddleware,
   validateBody(createContactSchema),
   createContact
);

contactsRouter.put(
   "/:id",
   authMiddleware,
   validateId,
   validateBody(updateContactSchema),
   updateContact
);

contactsRouter.patch(
   "/:id/favorite",
   authMiddleware,
   validateId,
   validateBody(updateFavoriteSchema),
   updateStatusContact
);

export { contactsRouter };
