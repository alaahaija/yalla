import { Router } from "express";
import * as orderController from "./order.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoint } from "./order.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router();

router.post('/create',authorization(endPoint.create),asyncHandler(orderController.createOrder));
router.get('/getUserOrder',authorization(endPoint.getUserOrder),asyncHandler(orderController.getUserOrder));
router.get('/getDetails/:id',authorization(endPoint.details),asyncHandler(orderController.getOrder));
router.get('/stackholder/all',authorization(endPoint.getStackholderOrder),asyncHandler(orderController.getStackholderOrder));
router.patch('/changeStatus/:id',authorization(endPoint.changeStatus),asyncHandler(orderController.changeStatus));

export default router;