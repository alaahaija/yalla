import { roles } from "../../middelware/authorization.js";

export const endPoints ={
    createRestaurent:[roles.Admin],
    getAll:[roles.Admin],
    updateRestaurent:[roles.Admin],
};