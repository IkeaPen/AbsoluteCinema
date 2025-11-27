import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const screeningService = {

  async getScreenings() {
    return prisma.screening.findMany();
  },

  async getScreeningById(id: number) {
    return prisma.screening.findFirst({
      where: {
        id: id
      }
    })
  },
 
  async createScreening(screeningData: Prisma.ScreeningCreateInput) {
    return prisma.screening.create({ 
      data: screeningData 
    });
  },

  async updateScreening(id: number, screeningData: Prisma.ScreeningCreateInput) {
    return prisma.screening.update({ 
      where: {
        id: id
      },
      data: screeningData 
    });
  },

  async deleteScreening(id: number) {
    return prisma.screening.delete({ 
      where: {
        id: id
      }
    });
  },

  async getMovieScreenings(movieId: number) {
    return prisma.screening.findMany({
      where: {
        movieId: movieId
      }
    })
  },

  async getCinemaHallScreeningsWithMovie(cinemaHallId: number) {
    return prisma.screening.findMany({
      where: {
        cinemaHallId: cinemaHallId
      },
      include: {
        movie: true
      }
    })
  },

  async checkScreeningExists(id: number) {
    return prisma.screening.findUnique({ 
      where: { 
        id: id 
      },
      select: { 
        id: true 
      },
    });
  },

  /*
  async getMovieScreeningById(movieId: number, id: number) {
    return prisma.screening.findFirst({
      where: {
        movieId: movieId,
        id: id
      }
    })
  },
  */
};

