import { createError } from "../middlewares/errorHandler";
import { movieService } from "../services/movieService";
import { cinemaHallService } from "../services/cinemaHallService";
import { screeningService } from "../services/screeningService";
import { seatService } from "../services/seatService";
//import { screeningService } from "../services/screeningService";

export function validateIdParse(id: unknown, label = "ID"): number {
  const parsedId = Number(id);
  if (isNaN(parsedId)) {
    throw createError(`Invalid ${label}`, 400);
  }
  return parsedId;
}

export const idParseAndExistenceValidators = {
  async movieId(movieId: unknown) {
    const id = validateIdParse(movieId, "movie ID");
    const movieExists = await movieService.checkMovieExists(id);
    if (!movieExists) throw createError("Movie not found", 404);
    return id;
  },

  async cinemaHallId(cinemaHallId: unknown) {
    const id = validateIdParse(cinemaHallId, "cinema hall ID");
    const hallExists = await cinemaHallService.checkCinemaHallExists(id);
    if (!hallExists) throw createError("Cinema hall not found", 404);
    return id;
  },

  async screeningId(screeningId: unknown) {
    const id = validateIdParse(screeningId, "screening ID");
    const screeningExists = await screeningService.checkScreeningExists(id);
    if (!screeningExists) throw createError("Screening not found", 404);
    return id;
  },

  async seatId(seatId: unknown) {
    const id = validateIdParse(seatId, "seat ID");
    const seatExists = await seatService.checkSeatExists(id);
    if (!seatExists) throw createError("Seat not found", 404);
    return id;
  },
};
