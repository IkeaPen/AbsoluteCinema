import { Request, Response, NextFunction } from 'express';
import { screeningService } from "../services/screeningService";
import { validateIdParse, idParseAndExistenceValidators } from '../validators/idValidators';
import { createError } from '../middlewares/errorHandler';

export const screeningController = {
  
  async getScreenings(req: Request, res: Response, next: NextFunction) {
    try {
      const allScreenings = await screeningService.getScreenings();
      res.json(allScreenings);
    } catch (error) {
      next(error);
    }
  },

  async getScreeningById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "screening ID");

      const screeningById = await screeningService.getScreeningById(id);
      if (!screeningById) throw createError("Screening not found", 404);
      
      res.json(screeningById);
    } catch (error) {
      next(error);
    }
  },

  async createScreening(req: Request, res: Response, next: NextFunction) {
    try {
      const newScreening = await screeningService.createScreening(req.body);
      return res.status(201).json(newScreening);
    } catch (error) {
      next(error);
    }
  },

  async updateScreening(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "screening ID");

      const newScreening = await screeningService.updateScreening(id, req.body);
      return res.status(200).json(newScreening);
    } catch (error) {
      next(error);
    }
  },

  async deleteScreening(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "screening ID");
      
      const removedScreening = await screeningService.deleteScreening(id);
      return res.status(200).json(removedScreening);
    } catch (error) {
      next(error);
    }
  },

  //Nestings:

  async getMovieScreenings(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = await idParseAndExistenceValidators.movieId(req.params.movieId);
      
      const allMovieScreenings = await screeningService.getMovieScreenings(movieId);
      res.json(allMovieScreenings);
    } catch (error) {
      next(error);
    }
  },

  async getCinemaHallScreeningsWithMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const cinemaHallId = await idParseAndExistenceValidators.cinemaHallId(req.params.cinemaHallId);
      
      const allCinemaHallScreenings = await screeningService.getCinemaHallScreeningsWithMovie(cinemaHallId);
      res.json(allCinemaHallScreenings);
    } catch (error) {
      next(error);
    }
  },

  /*
  async getMovieScreeningById(req: Request, res: Response, next: NextFunction) {
    try {
      const movieId = parseInt(req.params.movieId, 10);
      if (isNaN(movieId)) return res.status(400).json({ message: "Invalid movie ID" });

      const movieExists = await movieService.checkMovieExists(movieId);
      if (!movieExists) return res.status(404).json({ message: "Movie not found" });

      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid screening ID" });

      const movieScreeningById = await screeningService.getMovieScreeningById(movieId, id);
      if (!movieScreeningById) return res.status(404).json({ message: "Screening not found" });
      
      res.json(movieScreeningById);
    } catch (error) {
      next(error);
    }
  },
  */
};