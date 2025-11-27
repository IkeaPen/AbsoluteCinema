import { Request, Response, NextFunction } from 'express';
import { ticketService } from "../services/ticketService";
import { validateIdParse, idParseAndExistenceValidators } from '../validators/idValidators';
import { createError } from '../middlewares/errorHandler';

export const ticketController = {
  
  async getScreeningBoughtSeatIds(req: Request, res: Response, next: NextFunction) {
    try {
      const screeningId = await idParseAndExistenceValidators.screeningId(req.params.screeningId);
      
      const allBoughtSeats = await ticketService.getScreeningBoughtSeats(screeningId);
      res.json(allBoughtSeats);
    } catch (error) {
      next(error);
    }
  },

  async createScreeningTicket(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.screeningId = await idParseAndExistenceValidators.screeningId(req.params.screeningId);
      req.body.seatId = await idParseAndExistenceValidators.seatId(req.params.seatId);
      req.body.userId = req.user!.user_id;

      const newTicket = await ticketService.createScreeningTicket(req.body);
      return res.status(201).json(newTicket);
    } catch (error) {
      next(error);
    }
  },

  async getTickets(req: Request, res: Response, next: NextFunction) {
    try {
      const allTickets = await ticketService.getTickets();
      res.json(allTickets);
    } catch (error) {
      next(error);
    }
  },

  async getUserTicketsWithScreeningAndMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const allUserTickets = await ticketService.getUserTicketsWithScreeningAndMovie(req.user!.user_id);
      res.json(allUserTickets);
    } catch (error) {
      next(error);
    }
  },
};