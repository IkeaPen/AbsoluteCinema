/*import type { Prisma, Movie, CinemaHall, Seat, Screening, Ticket, TicketType, User } from "../../../server/node_modules/@prisma/client";

export type MovieCreateInput = Prisma.MovieCreateInput;
export type CinemaHallCreateInput = Prisma.CinemaHallCreateInput;
export type SeatCreateInput = Prisma.SeatCreateInput;
export type ScreeningCreateInput = Prisma.ScreeningCreateInput;
export type TicketCreateInput = Prisma.TicketCreateInput;
export type TicketTypeCreateInput = Prisma.TicketTypeCreateInput;
export type UserCreateInput = Prisma.UserCreateInput;*/

export interface Movie {
  title: string;
  studio: string;
  description?: string | null | undefined;
  releaseDate: string | Date;
//  screenings?: Screening[] | undefined;
}

export interface CinemaHall {
  name: string;
//  seats?: Seat[] | undefined;
//  screenings?: Screening[];
}

export interface Seat {
  row: number;
  number: number;
  cinemaHallId: number;
//  tickets?: Ticket[];
}

export interface Screening {
  date: string | Date;
  priceRatio?: number | undefined;
  movieId: number;
  cinemaHallId: number;
//  tickets?: Ticket[];
}

export interface Ticket {
  finalPrice: number;
  userId: number;
  screeningId: number;
  ticketTypeId: number;
  seatId: number;
}

export interface TicketType {
  price: number;
  description: string;
//  tickets?: Ticket[] | undefined;
}

export interface User {
  username: string;
  passwordHash: string;
  email: string;
//  tickets?: Ticket[] | undefined;
}