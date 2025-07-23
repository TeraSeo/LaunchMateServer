import express from "express";
import { verifyToken } from "../controllers/TokenController";

export const token_route = express.Router();

token_route.get('/verify', verifyToken);