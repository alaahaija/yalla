import { roles } from "../../middelware/authorization.js";

export const endPoints ={
    createCat:[roles.Admin],
    updateCat:[roles.Admin],
};