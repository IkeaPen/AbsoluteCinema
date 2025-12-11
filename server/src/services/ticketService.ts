import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

export const ticketService = {

  async getTickets() {
    return prisma.ticket.findMany();
  },
  
  async getTicketTypes() {
    return prisma.ticketType.findMany();
  },

  async getUserTickets(userId: number) {
    return prisma.ticket.findMany({
      where: {
        userId: userId
      },
      include: {
        seat: true,
        screening: {
          include: {
            movie: true,
            cinemaHall: {
              include: { seats: true }
            }
          }
        }
      }
    });
  },

  async createScreeningTicket(ticketData: Prisma.TicketCreateInput) {
    return prisma.ticket.create({ 
      data: ticketData
    });
  },

  async getScreeningBoughtSeats(screeningId: number) {
    const result = await prisma.ticket.findMany({
      where: {
        screeningId: screeningId
      },
      select: {
        seatId: true,
      }
    });
    return { seatIds: result.map(r => r.seatId) };
  },
};

