import joi from "joi";

export const createCoupon = joi.object({
    name:joi.string().min(5).max(20).required(),
    amount:joi.number().positive().integer(),
    expireDate:joi.date().greater('now').required(),
});