import { Router } from "express";
import * as userController from "./user.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoint } from "./user.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router();

router.get('/getStackholder',authorization(endPoint.getStackholder),asyncHandler(userController.getStackholder));
router.get('/getDelivery/:orderId',authorization(endPoint.getDelivery),asyncHandler(userController.getDelivery));
router.get('/getUsers',authorization(endPoint.getUsers),asyncHandler(userController.getUsers));
router.get('/userWithToken',authorization(endPoint.all),asyncHandler(userController.userWithToken));
router.patch('/updateUserInfo',authorization(endPoint.all),asyncHandler(userController.updateUserInfo));

export default router;