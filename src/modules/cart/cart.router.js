import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoint } from "./cart.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { validation } from "../../middelware/validation.js";
import * as cartValidator from "./cart.validation.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoint.create)),validation(cartValidator.createCart),asyncHandler(cartController.createCart));
router.patch('/remove',asyncHandler(authorization(endPoint.removeItem)),validation(cartValidator.removeItem),asyncHandler(cartController.removeItem));
router.patch('/clear',asyncHandler(authorization(endPoint.clearCart)),asyncHandler(cartController.clearCart));
router.patch('/update',asyncHandler(authorization(endPoint.updateQuantity)),validation(cartValidator.updateQuantity),asyncHandler(cartController.updateQuantity));
router.get('/getCart',asyncHandler(authorization(endPoint.getCart)),asyncHandler(cartController.getCart));

export default router;