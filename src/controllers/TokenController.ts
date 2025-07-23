import { Request, RequestHandler, Response } from "express";
import { TokenService } from "../services/TokenService";

const verifyToken:RequestHandler = async(req:Request, res:Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ valid: false });
        }
  
        const token = authHeader.split(' ')[1];
        const decoded = TokenService.verifyToken(token);
        if (decoded) {
            return res.status(200).json({ valid: true, payload: decoded });
        }
        else {
            return res.status(401).json({ valid: false});
        }
  
      } catch (error) {
        return res.status(401).json({ valid: false });
    }
}

export { verifyToken };