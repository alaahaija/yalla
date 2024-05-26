import { roles } from "../../middelware/authorization.js";

export const endPoints = {
    create:[roles.Admin],
};