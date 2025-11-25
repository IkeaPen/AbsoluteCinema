import { Request, Response, NextFunction } from 'express';
import { authService } from "../services/authService";
import { validateIdParse, idParseAndExistenceValidators } from '../validators/idValidators';
import { createError } from '../middlewares/errorHandler';

export const authController = {

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await authService.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
   //   const user = await prisma.user.findUnique({ where: { email } });
      const userExists = await authService.checkUsernameExists(req.body.username);
      if (!userExists) throw createError("Username not found", 400);
      const passwordValidation = await authService.checkPasswordValidation(req.body.password, userExists);
      if (!passwordValidation) throw createError("Invalid password", 400);

      const user = await authService.loginUser(req.body);
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },

  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await authService.logoutUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  },
};