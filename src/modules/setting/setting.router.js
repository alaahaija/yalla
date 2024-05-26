import { Router } from "express";
import * as settingController from "./setting.controller.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./setting.endpoint.js";
import fileUpload from "../../utls/multer.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoints.create)),fileUpload().single('logo'),asyncHandler(settingController.create));
router.get('/get',asyncHandler(settingController.get));

export default router;