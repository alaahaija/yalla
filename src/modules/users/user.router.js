import { Router } from "express";
import * as userController from "./user.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoint } from "./user.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router();

router.get('/getStackholder',authorization(endPoint.getStackholder),asyncHandler(userController.getStackholder));

export default router;