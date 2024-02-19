import Joi from "joi";

export const registerSchema = Joi.object({
   password: Joi.string().min(6).required().messages({
      "string.min": "Password must be longer than 6 symbols",
      "any.required": "Password must be longer than 6 symbols",
   }),
   email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid address",
      "any.required": "Email is required",
   }),
   subscription: Joi.string().valid("starter", "pro", "business").messages({
      "any.only": "Subscription has only 3 values: starter, pro, business",
   }),
});

export const loginSchema = Joi.object({
   password: Joi.string().min(6).required().messages({
      "any.required": "Enter password",
   }),
   email: Joi.string().email().required().messages({
      "any.required": "Enter email",
   }),
   subscription: Joi.string().valid("starter", "pro", "business").messages({
      "any.only": "Subscription has only 3 values: starter, pro, business",
   }),
});

export const updateSubscriptionSchema = Joi.object({
   subscription: Joi.string()
      .valid("starter", "pro", "business")
      .required()
      .messages({
         "any.required": "Subscription is required",
         "any.only": "Subscription has only 3 values: starter, pro, business",
      }),
});
