import joi from "joi";

export const deliveryCreate = joi.object({
    price:joi.number().required(),
    discount:joi.number(),
});
export const updateDelivery = joi.object({
    price:joi.number().required(),
    discount:joi.number(),
});