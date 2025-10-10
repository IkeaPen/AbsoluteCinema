import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const cinemaHallService = {

  async getCinemaHalls() {
    return prisma.cinemaHall.findMany();
  },

  async getCinemaHallById(id: number) {
    return prisma.cinemaHall.findFirst({
      where: {
        id: id
      }
    })
  },
 
  async createCinemaHall(cinemaHallData: Prisma.CinemaHallCreateInput) {
    return prisma.cinemaHall.create({ 
      data: cinemaHallData 
    });
  },

  async updateCinemaHall(id: number, cinemaHallData: Prisma.CinemaHallCreateInput) {
    return prisma.cinemaHall.update({ 
      where: {
        id: id
      },
      data: cinemaHallData
    });
  },

  async deleteCinemaHall(id: number) {
    return prisma.cinemaHall.delete({ 
      where: {
        id: id
      }
    });
  },

  async checkCinemaHallExists(id: number) {
    return prisma.cinemaHall.findUnique({ 
      where: { 
        id: id 
      },
      select: { 
        id: true 
      },
    });
  },
};

