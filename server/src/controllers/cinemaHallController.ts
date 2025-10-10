import { Request, Response, NextFunction } from 'express';
import { cinemaHallService } from "../services/cinemaHallService";
import { validateIdParse } from '../validators/idValidators';
import { createError } from '../middlewares/errorHandler';

export const cinemaHallController = {
  
  async getCinemaHalls(req: Request, res: Response, next: NextFunction) {
    try {
      const allCinemaHalls = await cinemaHallService.getCinemaHalls();
      res.json(allCinemaHalls);
    } catch (error) {
      next(error);
    }
  },

  async getCinemaHallById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "cinema hall ID");

      const cinemaHallById = await cinemaHallService.getCinemaHallById(id);
      if (!cinemaHallById) throw createError("Cinema hall not found", 404);
      
      res.json(cinemaHallById);
    } catch (error) {
      next(error);
    }
  },

  async createCinemaHall(req: Request, res: Response, next: NextFunction) {
    try {
      const newCinemaHall = await cinemaHallService.createCinemaHall(req.body);
      return res.status(201).json(newCinemaHall);
    } catch (error) {
      next(error);
    }
  },

  async updateCinemaHall(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, );

      const newCinemaHall = await cinemaHallService.updateCinemaHall(id, req.body);
      return res.status(200).json(newCinemaHall);
    } catch (error) {
      next(error);
    }
  },

  async deleteCinemaHall(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "cinema hall ID");
      
      const removedCinemaHall = await cinemaHallService.deleteCinemaHall(id);
      return res.status(200).json(removedCinemaHall);
    } catch (error) {
      next(error);
    }
  },
};