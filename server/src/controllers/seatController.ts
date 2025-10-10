import { Request, Response, NextFunction } from 'express';
import { seatService } from "../services/seatService";
import { validateIdParse, idParseAndExistenceValidators } from '../validators/idValidators';
import { createError } from '../middlewares/errorHandler';

/*async function checkCinemaHallIdValidation(cinemaHallId: number, res: Response) {
  if (isNaN(cinemaHallId)) {
    res.status(400).json({ message: "Invalid cinema hall ID" });
    return false;
  }

  const cinemaHallExists = await cinemaHallService.checkCinemaHallExists(cinemaHallId);
  if (!cinemaHallExists) {
    res.status(404).json({ message: "Cinema hall not found" });
    return false;
  }
  return true;
}*/

export const seatController = {
  
  async getCinemaHallSeats(req: Request, res: Response, next: NextFunction) {
    try {
      const cinemaHallId = await idParseAndExistenceValidators.cinemaHallId(req.params.cinemaHallId);
      
      const allCinemaHallSeats = await seatService.getCinemaHallSeats(cinemaHallId);
      res.json(allCinemaHallSeats);
    } catch (error) {
      next(error);
    }
  },

  async getSeats(req: Request, res: Response, next: NextFunction) {
    try {
      const allSeats = await seatService.getSeats();
      res.json(allSeats);
    } catch (error) {
      next(error);
    }
  },

  async getSeatById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "seat ID");

      const seatById = await seatService.getSeatById(id);
      if (!seatById) throw createError("Seat not found", 404);
      
      res.json(seatById);
    } catch (error) {
      next(error);
    }
  },

  async createSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const newSeat = await seatService.createSeat(req.body);
      return res.status(201).json(newSeat);
    } catch (error) {
      next(error);
    }
  },

  async updateSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "seat ID");

      const newSeat = await seatService.updateSeat(id, req.body);
      return res.status(200).json(newSeat);
    } catch (error) {
      next(error);
    }
  },

  async deleteSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "seat ID");
      
      const removedSeat = await seatService.deleteSeat(id);
      return res.status(200).json(removedSeat);
    } catch (error) {
      next(error);
    }
  },

  /*async getCinemaHallSeatById(req: Request, res: Response, next: NextFunction) {
    try {
      const cinemaHallId = await idParseAndExistenceValidators.cinemaHallId(req.params.cinemaHallId);

      const id = validateIdParse(req.params.id, "seat ID");

      const cinemaHallSeatById = await seatService.getCinemaHallSeatById(cinemaHallId, id);
      if (!cinemaHallSeatById) throw createError("Seat not found", 404);
      
      res.json(cinemaHallSeatById);
    } catch (error) {
      next(error);
    }
  },

  async createCinemaHallSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const cinemaHallId = await idParseAndExistenceValidators.cinemaHallId(req.params.cinemaHallId);
      
      req.body["cinemaHallId"] = cinemaHallId;
      const newCinemaHallSeat = await seatService.createCinemaHallSeat(req.body);
      return res.status(201).json(newCinemaHallSeat);
    } catch (error) {
      next(error);
    }
  },

  async updateCinemaHallSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const cinemaHallId = await idParseAndExistenceValidators.cinemaHallId(req.params.cinemaHallId);
      const id = validateIdParse(req.params.id, "seat ID");

      req.body["cinemaHallId"] = cinemaHallId;
      const newCinemaHallSeat = await seatService.updateCinemaHallSeat(cinemaHallId, id, req.body);
      return res.status(200).json(newCinemaHallSeat);
    } catch (error) {
      next(error);
    }
  },

  async deleteCinemaHallSeat(req: Request, res: Response, next: NextFunction) {
    try {
      const cinemaHallId = await idParseAndExistenceValidators.cinemaHallId(req.params.cinemaHallId);
      const id = validateIdParse(req.params.id, "seat ID");
      
      const removedCinemaHallSeat = await seatService.deleteCinemaHallSeat(cinemaHallId, id);
      return res.status(200).json(removedCinemaHallSeat);
    } catch (error) {
      next(error);
    }
  },*/
};