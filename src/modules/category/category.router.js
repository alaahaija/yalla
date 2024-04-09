import { Router } from "express";
import * as categoryController from './category.controller.js'
import fileUpload from "../../utls/multer.js";
import { asyncHandler } from "../../utls/error.handling.js";
import * as catValidator from "./category.validation.js";
import { validation } from "../../middelware/validation.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./category.endpoint.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoints.createCat)),fileUpload().single('image'),validation(catValidator.createCat),asyncHandler(categoryController.createCat));
router.put('/update/:categoryId',asyncHandler(authorization(endPoints.updateCat)),fileUpload().single('image'),validation(catValidator.updateCat),asyncHandler(categoryController.updateCat));
router.get('/all',asyncHandler(categoryController.getAllCat));
router.get('/one/:categoryId',validation(catValidator.getCat),asyncHandler(categoryController.getCat));
export default router;