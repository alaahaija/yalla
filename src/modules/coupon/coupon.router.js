import { Router } from "express";
import * as couponController from "./coupon.controller.js";
import { validation } from "../../middelware/validation.js";
import * as couponValidator from "./coupon.validation.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoint } from "./coupon.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router();

router.post('/create',asyncHandler(authorization(endPoint.createCoupon)),validation(couponValidator.createCoupon),asyncHandler(couponController.createCoupon));
router.get('/getAll',asyncHandler(authorization(endPoint.getCoupons)),asyncHandler(couponController.getCoupon));

export default router;