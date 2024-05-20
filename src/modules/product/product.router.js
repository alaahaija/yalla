import { Router } from "express";
import * as productController from "./product.controller.js";
import { asyncHandler } from "../../utls/error.handling.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./product.endpoint.js";
import fileUpload from "../../utls/multer.js";
import reviewRouter from '../review/review.router.js'
const router = Router();

router.use('/:productId/review',reviewRouter)

router.post('/create',authorization(endPoints.createPro),fileUpload().fields([{name:"image",maxCount:1},]),asyncHandler(productController.createPro));
router.get('/getByRestaurent/:restaurentId/active',asyncHandler(productController.getByRestaurent));
router.get('/getAll/:restaurentId',authorization(endPoints.getAll),asyncHandler(productController.getAll));
router.get('/getProDetails/:productId',asyncHandler(productController.getProDetails));
router.patch('/updatePro/:productId',authorization(endPoints.updatePro),fileUpload().fields([{name:'image',maxCount:1}]),asyncHandler(productController.updatePro));

export default router;