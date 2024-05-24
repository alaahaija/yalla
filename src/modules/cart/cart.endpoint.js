import { roles } from "../../middelware/authorization.js";

export const endPoint = {
    create :[roles.User],
    removeItem :[roles.User],
    clearCart :[roles.User],
    updateQuantity :[roles.User],
    getCart :[roles.User],
};