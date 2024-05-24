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
    address:joi.string().required(),
    status:joi.string(),
    phone:joi.string().required(),
    description:joi.string(),
    slogan:joi.string(),
    typeId:generalFeilds.id.required(),
    userId:generalFeilds.id.required(),
});
export const updateRestaurent = joi.object({
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
    status:joi.string(),
    phone:joi.string(),
    description:joi.string(),
    slogan:joi.string(),
    typeId:generalFeilds.id.required(),
    userId:generalFeilds.id.required(),
    restaurentId:generalFeilds.id.required(),
});