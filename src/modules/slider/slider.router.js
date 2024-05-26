import { Router } from "express";
import * as sliderController from "./slider.controller.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./slider.endpoint.js";
import fileUpload from "../../utls/multer.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoints.create)),fileUpload().single('image'),asyncHandler(sliderController.create));
router.get('/getSliders',asyncHandler(authorization(endPoints.getAll)),asyncHandler(sliderController.getSliders));
router.get('/getActiveSliders',asyncHandler(sliderController.getActiveSliders));
router.get('/details/:sliderId',authorization(endPoints.create),asyncHandler(sliderController.getDetails));

export default router