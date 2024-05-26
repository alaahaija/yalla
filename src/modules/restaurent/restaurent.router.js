import { Router } from "express";
import * as restaurentController from "./restaurent.controller.js";
import fileUpload from "../../utls/multer.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./restaurent.endpoint.js";
import * as resValidate from "./restaurent.validation.js";
import { validation } from "../../middelware/validation.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoints.createRestaurent)),fileUpload().single('logo'),validation(resValidate.createRestaurent),asyncHandler(restaurentController.createRestaurent));
router.get('/getall',asyncHandler(authorization(endPoints.getAll)),asyncHandler(restaurentController.getAllRestaurent));
router.get('/active',asyncHandler(restaurentController.getActive));
router.patch('/update/:restaurentId',asyncHandler(authorization(endPoints.updateRestaurent)),fileUpload().single('logo'),validation(resValidate.updateRestaurent),asyncHandler(restaurentController.updateRestaurent));
router.get('/random',asyncHandler(restaurentController.getRandomRest));

export default router;