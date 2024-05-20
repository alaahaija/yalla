import { roles } from "../../middelware/authorization.js";

export const endPoints ={
    createPro:[roles.Admin],
    getAll:[roles.Admin],
    updatePro:[roles.Admin],
};