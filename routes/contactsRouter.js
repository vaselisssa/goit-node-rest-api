import express from "express";
import {
   createContactSchema,
   updateContactSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../middlewares/validateBody.js";
import {
   getAllContacts,
   getOneContact,
   deleteContact,
   createContact,
   updateContact,
} from "../controllers/contactsControllers.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

export default contactsRouter;
