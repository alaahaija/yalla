import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { authorization } from "../../middelware/authorization.js";
import { endPoints } from "./review.endpoint.js";
import { asyncHandler } from "../../utls/error.handling.js";
const router = Router({mergeParams:true});

router.post('/create',authorization(endPoints.create),asyncHandler(reviewController.createReview));
router.get('/getAll',asyncHandler(reviewController.getAllReviews));

export default router;