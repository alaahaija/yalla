import { roles } from "../../middelware/authorization.js";


export const endPoint ={
    getStackholder:[roles.Admin],
    getDelivery:[roles.Admin,roles.Stackholder],
    getUsers:[roles.Admin],
    all:[roles.Admin,roles.Stackholder,roles.User,roles.delivery]
};