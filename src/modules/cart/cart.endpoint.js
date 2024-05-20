import { roles } from "../../middelware/authorization.js";

export const endPoint = {
    create :[roles.User],
};