import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { createError } from "../middlewares/errorHandler";

export const authService = {
 
  async createUser(userData: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(userData.passwordHash, 10);

    return prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
      },
    });
  },

  async loginUser(userData: Prisma.UserCreateInput) {
    

  },

  async logoutUser(userData: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(userData.passwordHash, 10);

    return prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
      },
    });
  },

  async checkUsernameExists(username: string) {
    return prisma.user.findUnique({ 
      where: { 
        username: username 
      }
    });
  },

  async checkPasswordValidation(password: string, userData: Prisma.UserCreateInput) {
    const valid = await bcrypt.compare(password, userData.passwordHash);
    
    return valid;
  },
};

