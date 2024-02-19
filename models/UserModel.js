import { Schema, model } from "mongoose";
import { handleMongooseError } from "../midlewares/index.js";

const userSchema = new Schema(
   {
      password: {
         type: String,
         minlength: 6,
         required: [true, "Set password for user"],
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
      },
      subscription: {
         type: String,
         enum: ["starter", "pro", "business"],
         default: "starter",
      },
      token: String,
   },
   {
      versionKey: false,
   }
);

userSchema.post("save", handleMongooseError);

export const User = model("user", userSchema);
