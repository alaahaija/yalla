import { Router } from "express";
import * as typeController from './type.controller.js';
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./type.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { validation } from "../../middelware/validation.js";
import * as typeValidator from "./type.validation.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoints.createType)),validation(typeValidator.createType),asyncHandler(typeController.createType));
router.get('/getall',asyncHandler(authorization(endPoints.getAll)),asyncHandler(typeController.getAllTypes));
router.get('/active',asyncHandler(typeController.getActive));
router.get('/getType/:typeId',validation(typeValidator.getType),asyncHandler(typeController.getType));
router.get('/restaurent/:typeId',validation(typeValidator.getRestaurents),asyncHandler(typeController.getRestaurents));
router.patch('/update/:typeId',asyncHandler(authorization(endPoints.updateType)),validation(typeValidator.updateType),asyncHandler(typeController.updateType));

export default router;