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

contactsRouter
   .route("/")
   .get(getAllContacts)
   .post(validateBody(createContactSchema), createContact);

contactsRouter
   .route("/:id")
   .get(getOneContact)
   .delete(deleteContact)
   .put(validateBody(updateContactSchema), updateContact);

export default contactsRouter;
