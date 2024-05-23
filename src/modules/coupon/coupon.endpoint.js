import { roles } from "../../middelware/authorization.js";

export const endPoint = {
    createCoupon :[roles.Admin],
    getCoupons :[roles.Admin],

};