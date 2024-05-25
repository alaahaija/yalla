import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";

export const createOrder = joi.object({
    couponName:joi.string(),
    address:joi.string(),
    phone:joi.string(),
});
export const changeStatus = joi.object({
    status:joi.string().required(),
    deliveryId:generalFeilds.id.required(),
    id:generalFeilds.id.required(),
});