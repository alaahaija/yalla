import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";

export const createCart = joi.object({
    productId:generalFeilds.id.required(),
});
export const removeItem = joi.object({
    productId:generalFeilds.id.required(),
});
export const updateQuantity= joi.object({
    productId:generalFeilds.id.required(),
    operation:joi.string(),
});