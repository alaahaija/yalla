import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";

export const createOrder = joi.object({
    couponName:joi.string(),
    address:joi.string(),
    phone:joi.string(),
});
