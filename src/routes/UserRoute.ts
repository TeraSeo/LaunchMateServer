import express from "express";
import { createUserValidation, getUserStatValidation, loginUserValidation, renewOtpValidation, verifyOtpValidation } from "../validations/UserValidation";
import { createUser, getUserStats, renewOtp, validateUser, verifyOtp } from "../controllers/UserController";

export const user_route = express.Router();

user_route.post("/create", createUserValidation(), createUser);

user_route.post("/validate", loginUserValidation(), validateUser);

user_route.post("/renew/otp", renewOtpValidation(), renewOtp);

user_route.post("/verify/otp", verifyOtpValidation(), verifyOtp);

user_route.get("/get/stats", getUserStatValidation(), getUserStats);