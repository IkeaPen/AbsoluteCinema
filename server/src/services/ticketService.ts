import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

export const ticketService = {

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

  async createScreeningTicket(ticketData: Prisma.TicketCreateInput) {
    return prisma.ticket.create({ 
      data: ticketData
    });
  },

  async getTickets() {
    return prisma.ticket.findMany();
  },

  async getUserTicketsWithScreeningAndMovie(userId: number) {
    return prisma.ticket.findMany({
      where: {
        userId: userId
      },
      include: {
        screening: {
          include: {
            movie: true
          }
        }
      }
    });
  },
};

