import { Router } from "express";
import * as productController from "./product.controller.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./product.endpoint.js";
import fileUpload from "../../utls/multer.js";
import reviewRouter from '../review/review.router.js'
import { validation } from "../../middelware/validation.js";
import * as proValidator from "./product.validation.js";
const router = Router();

router.use('/:productId/review',reviewRouter)

router.post('/create',asyncHandler(authorization(endPoints.createPro)),fileUpload().single('image'),validation(proValidator.createPro),asyncHandler(productController.createPro));
router.get('/getByRestaurent/:restaurentId/active',validation(proValidator.getByRestaurent),asyncHandler(productController.getByRestaurent));
router.get('/getAll/:restaurentId',asyncHandler(authorization(endPoints.getAll)),asyncHandler(productController.getAll));
router.get('/getProDetails/:productId',asyncHandler(productController.getProDetails));
router.patch('/updatePro/:productId',asyncHandler(authorization(endPoints.updatePro)),fileUpload().single('image'),validation(proValidator.updatePro),asyncHandler(productController.updatePro));

export default router;