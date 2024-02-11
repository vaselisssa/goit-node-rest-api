import { Schema, model } from "mongoose";
import { handleMongooseError } from "../midlewares/index.js";

const contactSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "Set name for contact"],
      },
      email: {
         type: String,
         unique: true,
      },
      phone: {
         type: String,
      },
      favorite: {
         type: Boolean,
         default: false,
      },
   },
   {
      versionKey: false,
   }
);

contactSchema.post("save", handleMongooseError);

export const Contact = model("contact", contactSchema);
