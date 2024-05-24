import { Router } from "express";
import * as orderController from "./order.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoint } from "./order.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { validation } from "../../middelware/validation.js";
import * as orderValidator from "./order.validation.js"; 
const router = Router();

router.post('/create',asyncHandler(authorization(endPoint.create)),validation(orderValidator.createOrder),asyncHandler(orderController.createOrder));
router.get('/getUserOrder',asyncHandler(authorization(endPoint.getUserOrder)),asyncHandler(orderController.getUserOrder));
router.get('/getDetails/:id',asyncHandler(authorization(endPoint.details)),asyncHandler(orderController.getOrder));
router.get('/stackholder/all',asyncHandler(authorization(endPoint.getStackholderOrder)),asyncHandler(orderController.getStackholderOrder));
router.patch('/changeStatus/:id',asyncHandler(authorization(endPoint.changeStatus))/*,validation(orderValidator.changeStatus)*/,asyncHandler(orderController.changeStatus));

export default router;