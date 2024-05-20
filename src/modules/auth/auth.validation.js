import joi from "joi";
import { generalFeilds } from "../../middelware/validation.js";

export const register = joi.object({
    userName :joi.string().min(3).max(15).required().messages({
        "string.min":"min is 3",
        "string.max":"max is 15",
        "any.required":"name is required",
        "string.empty":"name is required"
    }),
    email:generalFeilds.email.required().messages({
        "any.required":"email is required",
    }),
    password:generalFeilds.password.required().messages({
        "any.required":"password is required",
    }),
    gender:joi.string(),
    phone:joi.string().min(10).max(10),
    address:joi.string(),
    role:joi.string(),

});
export const login = joi.object({
    email:generalFeilds.email.required().messages({
        "any.required":"email is required",
    }),
    password:generalFeilds.password.required().messages({
        "any.required":"password is required",
    }),
});
export const sendCode = joi.object({
    email:generalFeilds.email.required().messages({
        "any.required":"email is required",
    }),
});
export const forgetPassword = joi.object({
    email:generalFeilds.email.required().messages({
        "any.required":"email is required",
    }),
    code:joi.string().min(8).max(8).required(),
    password:generalFeilds.password.required().messages({
        "any.required":"password is required",
    }),
});