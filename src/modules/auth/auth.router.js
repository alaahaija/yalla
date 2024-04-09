import { Router } from "express";
import * as authController from './auth.controller.js';
import { asyncHandler } from "../../utls/error.handling.js";
import { validation } from "../../middelware/validation.js";
import * as authValidator from "./auth.validation.js";
const router = Router();

router.post('/register',validation(authValidator.register),asyncHandler(authController.register));
router.get('/confirmEmail/:token',asyncHandler(authController.confirmEmail));
router.post('/login',validation(authValidator.login),asyncHandler(authController.login));
router.patch('/sendCode',validation(authValidator.sendCode),asyncHandler(authController.sendCode));
router.patch('/forgetPssword',validation(authValidator.forgetPassword),asyncHandler(authController.forgetPassword));

export default router;