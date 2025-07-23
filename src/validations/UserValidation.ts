import { check, header } from "express-validator"

export const createUserValidation = () => {
    return [
        check("username").exists().withMessage("Username is required"),
        check("email").exists().withMessage("Email is required")
        .isEmail().withMessage("Not Email format"),
        check("password").exists().withMessage("Password is required").
        isLength({min: 6}).withMessage("Password should be between longer than 6 characters"),
    ];
}

export const loginUserValidation = () => {
    return [
        check("email").exists().withMessage("Email is required")
        .isEmail().withMessage("Not Email format"),
        check("password").exists().withMessage("Password is required").
        isLength({min: 6}).withMessage("Password should be between longer than 6 characters"),
    ];
}

export const renewOtpValidation = () => {
    return [
        check("email").exists().withMessage("Email is required")
        .isEmail().withMessage("Not Email format")
    ];
}

export const verifyOtpValidation = () => {
    return [
        check("email").exists().withMessage("Email is required")
        .isEmail().withMessage("Not Email format"),
        check("code").exists().withMessage("Otp is required").
        isLength({min: 4, max: 4}).withMessage("Otp should be 4 characters"),
    ];
}

export const getUserStatValidation = () => {
    return [
        header('authorization')
            .exists().withMessage('Authorization header is required')
            .bail()
            .custom((val) => val.startsWith('Bearer '))
            .withMessage('Authorization header must start with Bearer'),
    ];
}