import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().max(255),
  studio: z.string().max(255),
  description: z.string().nullable(),
  releaseDate: z.iso.datetime(),
  imageUrl: z.string().url().nullable(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieCreateSchema = MovieSchema.omit({id: true});
export type MovieCreateDTO = z.infer<typeof MovieCreateSchema>;


export const CinemaHallSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(80),
});

export type CinemaHall = z.infer<typeof CinemaHallSchema>;

export const CinemaHallCreateSchema = CinemaHallSchema.omit({id: true});
export type CinemaHallCreateDTO = z.infer<typeof CinemaHallCreateSchema>;


export const SeatSchema = z.object({
  id: z.number().int().positive(),
  row: z.number().int().nonnegative(),
  number: z.number().int().nonnegative(),
  cinemaHallId: z.number().int().positive(),
});

export type Seat = z.infer<typeof SeatSchema>;

export const SeatCreateSchema = SeatSchema.omit({id: true});
export type SeatCreateDTO = z.infer<typeof SeatCreateSchema>;


export const ScreeningSchema = z.object({
  id: z.number().int().positive(),
  date: z.iso.datetime(),
  priceRatio: z.number().positive(),
  movieId: z.number().int().positive(),
  cinemaHallId: z.number().int().positive(),
});

export type Screening = z.infer<typeof ScreeningSchema>;

export const ScreeningCreateSchema = ScreeningSchema.omit({id: true});
export type ScreeningCreateDTO = z.infer<typeof ScreeningCreateSchema>;


export const TicketTypeSchema = z.object({
  id: z.number().int().positive(),
  price: z.number().positive(),
  description: z.string(),
});

export type TicketType = z.infer<typeof TicketTypeSchema>;

export const TicketTypeCreateSchema = TicketTypeSchema.omit({id: true});
export type TicketTypeCreateDTO = z.infer<typeof TicketTypeCreateSchema>;


export const TicketSchema = z.object({
  id: z.number().int().positive(),
  finalPrice: z.number().positive(),
  purchaseDate: z.iso.datetime(),
  userId: z.number().int().positive(),
  screeningId: z.number().int().positive(),
  ticketTypeId: z.number().int().positive(),
  seatId: z.number().int().positive(),
});

export type Ticket = z.infer<typeof TicketSchema>;

export const TicketCreateSchema = TicketSchema.omit({id: true});
export type TicketCreateDTO = z.infer<typeof TicketCreateSchema>;


export const UserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().max(255),
  email: z.string().email().max(255),
  creationDate: z.iso.datetime(),
  role: z.enum(["USER", "ADMIN"]),
});

export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = UserSchema.omit({id: true});
export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
