import { roles } from "../../middelware/authorization.js";

export const endPoint ={
    getStackholder:[roles.Admin],
};