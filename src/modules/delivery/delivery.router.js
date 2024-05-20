import { Router } from "express";
import * as deliveryController from "./delivery.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./delivery.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router();

router.post('/create',authorization(endPoints.create),asyncHandler(deliveryController.deliveryCreate));
router.get('/get',asyncHandler(deliveryController.getDelivery));
router.put('/update',asyncHandler(deliveryController.updateDelivery));
router.get('/deliveryOrder',authorization(endPoints.deliveryOrder),asyncHandler(deliveryController.deliveryOrder));

export default router;