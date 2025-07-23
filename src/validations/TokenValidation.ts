import { Request, Response, NextFunction } from 'express';

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false, message: 'No Bearer token provided' });
  }

  next();
};
