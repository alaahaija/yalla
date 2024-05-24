import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";

export const createPro = joi.object({
    name :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
    file:generalFeilds.file.required().messages({
        "any.required":"file is required",
    }),
    price:joi.number().required(),
    discount:joi.number(),
    categoryId:generalFeilds.id.required(),
    restaurentId:generalFeilds.id.required(),
    description:joi.string(),
    status:joi.string(),
});
export const getByRestaurent = joi.object({
    restaurentId:generalFeilds.id.required(),
});
export const getAll = joi.object({
    restaurentId:generalFeilds.id.required(),
});
export const updatePro = joi.object({
    name :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
    file:generalFeilds.file.required().messages({
        "any.required":"file is required",
    }),
    price:joi.number().required(),
    discount:joi.number(),
    categoryId:generalFeilds.id.required(),
    restaurentId:generalFeilds.id.required(),
    description:joi.string(),
    status:joi.string(),
    productId:generalFeilds.id.required(),
});