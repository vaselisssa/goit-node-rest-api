import Joi from "joi";

export const createContactSchema = Joi.object()
   .options({ abortEarly: false })
   .keys({
      name: Joi.string()
         .max(50)
         .required()
         .messages({ "any.required": "Missing required name field" }),
      email: Joi.string()
         .email()
         .required()
         .messages({ "any.required": "Missing required email field" }),
      phone: Joi.string()
         .min(3)
         .max(50)
         .required()
         .messages({ "any.required": "Missing required phone field" }),
      favorite: Joi.boolean(),
   });

export const updateContactSchema = Joi.object()
   .options({ abortEarly: false })
   .keys({
      name: Joi.string().max(50),
      email: Joi.string().email(),
      phone: Joi.string().min(3).max(50),
      favorite: Joi.boolean(),
   });

export const updateFavoriteSchema = Joi.object({
   favorite: Joi.boolean()
      .required()
      .messages({ "any.required": "Missing required favorite field" }),
});
