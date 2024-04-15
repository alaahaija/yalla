import { roles } from "../../middelware/authorization.js";

export const endPoints ={
    createType:[roles.Admin],
    getAll:[roles.Admin],
    updateType:[roles.Admin],
};