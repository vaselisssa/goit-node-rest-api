import { isValidObjectId } from "mongoose";
import HttpError from "../helpers/HttpError.js";

const validateId = (req, res, next) => {
   const { id } = req.params;

   if (!isValidObjectId(id)) {
      next(HttpError(400, `id: ${id} is not valid`));
   }

   next();
};

export default validateId;
