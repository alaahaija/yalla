import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";
export const createType = joi.object({
    name :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
});
export const getType = joi.object({
    typeId:generalFeilds.id.required(),
});
export const getRestaurents = joi.object({
    typeId:generalFeilds.id.required(),
});
export const updateType = joi.object({
    name :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
    status:joi.string(),
    typeId:generalFeilds.id.required(),
});
