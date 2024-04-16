import { roles } from "../../middelware/authorization.js";

export const endPoints ={
    createRestaurent:[roles.Admin],
    getAll:[roles.Admin],
    updatType:[roles.Admin],
};