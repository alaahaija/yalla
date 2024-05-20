import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";

export const createRestaurent = joi.object({
    name :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
    file:generalFeilds.file.required().messages({
        "any.required":"file is required",
    }),
    address:joi.string(),
    phone:joi.string(),
    description:joi.string(),
    slogan:joi.string(),
    typeId:joi.types().object,
});