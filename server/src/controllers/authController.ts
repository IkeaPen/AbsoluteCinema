import { Request, Response, NextFunction } from 'express';
import { authService } from "../services/authService";
import { createError } from '../middlewares/errorHandler';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { User } from '@prisma/client';

type UserReturnType = Omit<User, 'id' | 'password'>;

export const authController = {

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userInfo = await authService.getUser(req.user!.user_id);
      if (!userInfo) throw createError("Could not get user", 400);
      
      const userReturnInfo: UserReturnType = {username: userInfo.username, email: userInfo.email, role: userInfo.role, creationDate: userInfo.creationDate};
      return res.status(201).json(userReturnInfo);
    } catch (error) {
      next(error);
    }
  },

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, username, password } = req.body;
      if (!email || !username || !password) throw createError("Email, username and password required", 400);
      const usernameExists = await authService.checkUsernameExists(username);
      if (usernameExists) throw createError("User already exists", 409);
      
      const newUser = await authService.createUser(req.body);
      const userReturnInfo: UserReturnType = {username: newUser.username, email: newUser.email, role: newUser.role, creationDate: newUser.creationDate};
      return res.status(201).json(userReturnInfo);
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      if (!username || !password) throw createError("Username and password required", 400);

      const user = await authService.checkUsernameExists(username);
      if (!user) throw createError("Username not found", 400);
      const passwordValidation = await authService.checkPasswordValidation(password, user.password);
      if (!passwordValidation) throw createError("Invalid password", 400);

      await createTokenCookies(res, user);
      
      const userReturnInfo: UserReturnType = {username: user.username, email: user.email, role: user.role, creationDate: user.creationDate};
      return res.status(200).json(userReturnInfo);
    } catch (error) {
      next(error);
    }
  },

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(200).json({ message: "Logged out" });
    }

    const session = await authService.findRefreshToken(refreshToken);

    if (session) {
      await authService.deleteUserRefreshTokens(session.userId);
    }
    
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out" });
  },

  async refreshUser(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) return next(createError("Unauthorized", 401));

      const stored = await authService.findRefreshToken(refreshToken);
      if (!stored) return next(createError("Unauthorized", 401));
      
      const userInfo = verifyRefreshToken(refreshToken);

      const user = await authService.checkUserIDExists(userInfo.user_id);
      if (!user) return next(createError("User not found", 404));

      await createTokenCookies(res, user);

      const userReturnInfo: UserReturnType = {username: user.username, email: user.email, role: user.role, creationDate: user.creationDate};
      return res.status(200).json(userReturnInfo);
    } catch (err) {
      return next(createError("Unauthorized", 401));
    }
  }
};

export async function createTokenCookies(res: Response, user: User) {
  const newAccessToken = createAccessToken(user.id, user.role);
  const newRefreshToken = createRefreshToken(user.id);

  const expiresAt = 7 * 24 * 60 * 60 * 1000;
  const refreshExpiry = new Date(Date.now() + expiresAt);

  await authService.deleteUserRefreshTokens(user.id);

  await authService.storeRefreshToken(user.id, newRefreshToken, refreshExpiry);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: expiresAt,
    path: "/", 
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: expiresAt,
    path: "/",
  });
};