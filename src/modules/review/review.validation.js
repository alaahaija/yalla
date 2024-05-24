import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";
export const createReview = joi.object({
    comment:joi.string().required(),
    rating:joi.string().min(1).max(5).required(),
    productId:generalFeilds.id.required(),
});