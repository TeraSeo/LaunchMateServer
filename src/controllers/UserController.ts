import { Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import { UserService } from "../services/UserService";
import { TokenService } from "../services/TokenService";

const createUser:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }

        const { username, email, password } = req.body;

        // 2. Check for email duplication
        const existingUser = await UserService.findUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(409);
        }

        // 3. Create user
        await UserService.createUser(username, email, password);
        
        return res.sendStatus(201);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

const validateUser:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }

        const { email, password } = req.body;

        // 2. Validate user
        const isValid = await UserService.validateUser(email, password);
        if (!isValid) return res.sendStatus(401);

        const token = TokenService.generateToken({ email, verified: false });
        await UserService.renewOtp(email);
        return res.status(200).json({
            success: isValid,
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

const renewOtp:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }

        // 2. Renew Otp
        const { email } = req.body;
        await UserService.renewOtp(email);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

const verifyOtp:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }

        // 2. Verify Otp
        const { email, code } = req.body;
        const isVerified = await UserService.verifyOtp(email, code);
        if (!isVerified) {
            return res.status(200).json({ success: false });
        }

        // 3. Generate new token with verified:true
        const token = TokenService.generateToken({ email, verified: true });

        return res.status(200).json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

const getUserStats:RequestHandler = async(req:Request, res:Response) => {
    try {
        // 1. Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.sendStatus(400);
        }

        // 2. Get user stat
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const userStat = await UserService.getUserStats(token);

        return res.status(200).json({
            success: true,
            userStat
        });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export { createUser, validateUser, renewOtp, verifyOtp, getUserStats };