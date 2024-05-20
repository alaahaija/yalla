import { roles } from "../../middelware/authorization.js";

export const endPoints ={
    create:[roles.Admin],
    deliveryOrder:[roles.delivery,roles.Stackholder,roles.Admin],
};