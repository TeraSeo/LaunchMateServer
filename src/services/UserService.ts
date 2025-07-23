import { User } from "../entities/UserEntity"
import bcrypt from 'bcrypt';
import { sendOtpEmail } from "./MailService";
import { db } from "../configs/DbConfig";
import { UserStatDto } from "../dtos/UserStatDto";
import { TokenService } from "./TokenService";

export const UserService = {
    findUserByEmail: async (email: string): Promise<User | null> => {
        try {
            return await User.findOne({ where: { email } });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createUser: async (username:string, email:string, password:string): Promise<User> => {
        try {
            // 1. Encrypt password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // 2. Save user data
            const createdUser = await User.save({
                username: username,
                email: email,
                password: hashedPassword,
                downloadCnt: 0
            })

            return createdUser
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    validateUser: async (email: string, password: string): Promise<boolean> => {
        try {
            const user = await User.findOne({ where: { email } });
    
            if (!user) {
                return false; // User not found
            }
            
            const isPasswordValid = await bcrypt.compare(password, user.password);
            return isPasswordValid;
        } catch (error) {
            console.error('Error in validateUser:', error);
            return false;
        }
    },

    renewOtp: async (email: string) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) return;
    
          const otp = Math.floor(1000 + Math.random() * 9000).toString();
    
          user.otp = otp;
          await user.save();
    
          await sendOtpEmail(user.email, otp);
        } catch (error) {
          console.error("OTP renew error:", error);
        }
    },

    verifyOtp: async (email:string, code: string): Promise<Boolean> => {
        try {
            const user = await User.findOne({ where: { email } });
      
            if (!user) return false;
            return user.otp === code;
          } catch (error) {
            console.error(error);
            return false;
        }
    },

    getUserStats: async (token: string): Promise<UserStatDto> => {
        const userRepo = db.getRepository(User);
        const payload = TokenService.verifyToken(token);            
    
        const user = await userRepo.findOne({
          where: { email: payload?.email },
          relations: ['ideas'],
        });
    
        if (!user) {
          throw new Error(`User with email ${payload?.email} not found`);
        }

        const username = user.username;
        const totalIdea = user.ideas.length;
        const activeProjectCnt = user.ideas.filter(idea => !idea.isCompleted).length;
        const ideaIds = user.ideas.map(idea => idea.ideaId);
        const downloadCnt = user.downloadCnt;
    
        return {
          username,
          totalIdea,
          activeProjectCnt,
          downloadCnt,
          ideaIds,
        };
    }
}