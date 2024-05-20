import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";
export const createCat = joi.object({
    name :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
    file:generalFeilds.file.required().messages({
        "any.required":"file is required",
    }),
});
export const updateCat = joi.object({
    name :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
    file:generalFeilds.file.messages({
        "any.required":"file is required",
    }),
    categoryId :generalFeilds.id,
});
export const getCat = joi.object({
    categoryId:generalFeilds.id.required(),
});