import { Router } from "express";
import * as deliveryController from "./delivery.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./delivery.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { validation } from "../../middelware/validation.js";
import * as deliveryValidator from "./delivery.validation.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoints.create)),validation(deliveryValidator.deliveryCreate),asyncHandler(deliveryController.deliveryCreate));
router.get('/get',asyncHandler(deliveryController.getDelivery));
router.put('/update',asyncHandler(authorization(endPoints.updateDelivery)),validation(deliveryValidator.updateDelivery),asyncHandler(deliveryController.updateDelivery));
router.get('/deliveryOrder',asyncHandler(authorization(endPoints.deliveryOrder)),asyncHandler(deliveryController.deliveryOrder));

export default router;