import { roles } from "../../middelware/authorization.js";

export const endPoint = {
    create :[roles.User],
    getUserOrder:[roles.User],
    details:[roles.User,roles.Admin],
    changeStatus:[roles.Stackholder,roles.Admin,roles.delivery],
    getStackholderOrder:[roles.Stackholder],
};