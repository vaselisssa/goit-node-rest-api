import express from "express";
import {
   getAllContacts,
   getOneContact,
   deleteContact,
   createContact,
   updateContact,
   updateFavorite,
} from "../controllers/contactsControllers.js";
import {
   createContactSchema,
   updateContactSchema,
   updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../midlewares/validateBody.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.patch("/:id/favorite", updateFavorite);

export default contactsRouter;
