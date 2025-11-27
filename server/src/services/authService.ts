import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

export const authService = {
 
  async createUser(userData: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  },

  async checkUserIDExists(user_id: number) {
    return prisma.user.findUnique({ 
      where: { 
        id: user_id 
      }
    });
  },

  async checkUsernameExists(username: string) {
    return prisma.user.findUnique({ 
      where: { 
        username: username 
      }
    });
  },

  async checkPasswordValidation(password: string, userHashedPassword: string) {
    const valid = await bcrypt.compare(password, userHashedPassword);
    
    return valid;
  },

  async storeRefreshToken(userId: number, token: string, expiresAt: Date) {
    return prisma.refreshToken.create({
      data: {
        userId: userId,
        token: token,
        expiresAt: expiresAt,
      },
    });
  },


  async findRefreshToken(token: string) {
    return prisma.refreshToken.findUnique({
      where: { 
        token: token 
      },
    });
  },

  async deleteRefreshToken(token: string) {
    return prisma.refreshToken.deleteMany({
      where: { 
        token: token
      },
    });
  },

  async deleteUserRefreshTokens(userId: number) {
    return prisma.refreshToken.deleteMany({
      where: { 
        userId: userId
      },
    });
  }
};

