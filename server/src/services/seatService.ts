import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const seatService = {

  async getCinemaHallSeats(cinemaHallId: number) {
    return prisma.seat.findMany({
      where: {
        cinemaHallId: cinemaHallId
      }
    })
  },

  async getSeats() {
    return prisma.seat.findMany();
  },

  async getSeatById(id: number) {
    return prisma.seat.findFirst({
      where: {
        id: id
      }
    })
  },
 
  async createSeat(seatData: Prisma.SeatCreateInput) {
    return prisma.seat.create({ 
      data: seatData 
    });
  },

  async updateSeat(id: number, seatData: Prisma.SeatCreateInput) {
    return prisma.seat.update({ 
      where: {
        id: id
      },
      data: seatData
    });
  },

  async deleteSeat(id: number) {
    return prisma.seat.delete({ 
      where: {
        id: id
      }
    });
  },

  /*async getCinemaHallSeatById(cinemaHallId: number, id: number) {
    return prisma.seat.findFirst({
      where: {
        cinemaHallId: cinemaHallId,
        id: id
      }
    })
  },
 
  async createCinemaHallSeat(seatData: Prisma.SeatCreateInput) {
    return prisma.seat.create({ 
      data: seatData 
    });
  },

  async updateCinemaHallSeat(cinemaHallId: number, id: number, seatData: Prisma.SeatCreateInput) {
    return prisma.seat.update({ 
      where: {
        cinemaHallId: cinemaHallId,
        id: id
      },
      data: seatData
    });
  },

  async deleteCinemaHallSeat(cinemaHallId: number, id: number) {
    return prisma.seat.delete({ 
      where: {
        cinemaHallId: cinemaHallId,
        id: id
      }
    });
  },*/
};

