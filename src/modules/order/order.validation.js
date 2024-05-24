import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";

export const createOrder = joi.object({
    couponId:generalFeilds.id,
});
export const changeStatus = joi.object({
    status:joi.string().required(),
    deliveryId:generalFeilds.id.required(),
    id:generalFeilds.id.required(),
});