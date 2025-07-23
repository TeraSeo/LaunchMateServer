import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in .env');
}

type Payload = {
  email: string;
  verified: boolean;
};

export const TokenService = {
  generateToken: (payload: Payload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  },

  verifyToken: (token: string): Payload | null => {
    try {
      return jwt.verify(token, JWT_SECRET) as Payload;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  },
};
