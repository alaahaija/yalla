import { Router } from "express";
import * as cartController from "./cart.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoint } from "./cart.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router();

router.post('/create',authorization(endPoint.create),asyncHandler(cartController.createCart));
router.patch('/remove',authorization(endPoint.create),asyncHandler(cartController.removeItem));
router.patch('/clear',authorization(endPoint.create),asyncHandler(cartController.clearCart));
router.patch('/update',authorization(endPoint.create),asyncHandler(cartController.updateQuantity));
router.get('/getCart',authorization(endPoint.create),asyncHandler(cartController.getCart));

export default router;