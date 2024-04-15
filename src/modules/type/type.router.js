import { Router } from "express";
import * as typeController from './type.controller.js';
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./type.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router();

router.post('/create',authorization(endPoints.createType),asyncHandler(typeController.createType));
router.get('/getall',authorization(endPoints.getAll),asyncHandler(typeController.getAllTypes));
router.get('/active',asyncHandler(typeController.getActive));
router.get('/getType/:typeId',asyncHandler(typeController.getType));
router.patch('/update/:typeId',authorization(endPoints.updateType),asyncHandler(typeController.updateType));

export default router;