import { Router } from "express";
import * as restaurentController from "./restaurent.controller.js";
import fileUpload from "../../utls/multer.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./restaurent.endpoint.js";
const router = Router();

router.post('/create',authorization(endPoints.createRestaurent),fileUpload().single('logo'),asyncHandler(restaurentController.createRestaurent));
router.get('/getall',authorization(endPoints.getAll),asyncHandler(restaurentController.getAllRestaurent));
router.get('/active',asyncHandler(restaurentController.getActive));
router.patch('/update/:restaurentId',authorization(endPoints.updatType),fileUpload().single('logo'),asyncHandler(restaurentController.updateType));


export default router;