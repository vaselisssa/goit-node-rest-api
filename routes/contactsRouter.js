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
import { validateBody, validateId } from "../midlewares/index.js";

const { createContactSchema, updateContactSchema, updateFavoriteSchema } =
   contactsSchemas;

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", validateId, getOneContact);

contactsRouter.delete("/:id", validateId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put(
   "/:id",
   validateId,
   validateBody(updateContactSchema),
   updateContact
);

contactsRouter.patch(
   "/:id/favorite",
   validateId,
   validateBody(updateFavoriteSchema),
   updateStatusContact
);

export { contactsRouter };
