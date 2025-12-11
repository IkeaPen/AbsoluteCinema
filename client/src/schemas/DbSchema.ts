import { z } from "zod";

export const CinemaHallSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(80),
});

export type CinemaHall = z.infer<typeof CinemaHallSchema>;

export const CinemaHallCreateSchema = CinemaHallSchema.omit({id: true});
export type CinemaHallCreateDTO = z.infer<typeof CinemaHallCreateSchema>;


export const ScreeningSchema = z.object({
  id: z.number().int().positive(),
  date: z.iso.datetime(),
  priceRatio: z.number().positive(),
  movieId: z.number().int().positive(),
  cinemaHallId: z.number().int().positive("Hall is required")
});

export type Screening = z.infer<typeof ScreeningSchema>;

export const ScreeningCreateSchema = ScreeningSchema.extend({
  priceRatio: z.number().positive().nullable().optional(),
  date: z.string().nonempty("Date is required").refine(
    val => !isNaN(Date.parse(val)),
    "Invalid datetime"
  ),
}).omit({id: true});
export type ScreeningCreateDTO = z.infer<typeof ScreeningCreateSchema>;


export const MovieSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().max(255).min(1, "Title is required"),
  studio: z.string().max(255).min(1, "Studio is required"),
  description: z.string().nullable(),
  releaseDate: z.iso.datetime(),
  imageUrl: z.url().nullable(),
  screenings: z.array(ScreeningSchema).optional()
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieUpdateSchema = MovieSchema.extend({
  releaseDate: z.string().refine(
    (v) => !isNaN(Date.parse(v)),
    "Invalid date"
  ),
  imageUrl: z.string().optional(),
});

export type MovieUpdateDTO = z.infer<typeof MovieUpdateSchema>;

export const MovieCreateSchema = MovieUpdateSchema.omit({id: true});
export type MovieCreateDTO = z.infer<typeof MovieCreateSchema>;


export const SeatSchema = z.object({
  id: z.number().int().positive(),
  row: z.number().int().nonnegative(),
  number: z.number().int().nonnegative(),
  cinemaHallId: z.number().int().positive(),
  isBooked: z.boolean().optional()
});

export type Seat = z.infer<typeof SeatSchema>;

export const SeatCreateSchema = SeatSchema.omit({id: true});
export type SeatCreateDTO = z.infer<typeof SeatCreateSchema>;


export const ScreeningWithExtrasSchema = ScreeningSchema.extend({
  movie: MovieSchema,
  cinemaHall: CinemaHallSchema,
  seats: z.array(SeatSchema)
});

export type ScreeningWithExtras = z.infer<typeof ScreeningWithExtrasSchema>;


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
  seat: SeatSchema,
  screening: ScreeningWithExtrasSchema,
});

export type Ticket = z.infer<typeof TicketSchema>;

export const TicketCreateSchema = TicketSchema.omit({id: true, purchaseDate: true, userId: true});
export type TicketCreateDTO = z.infer<typeof TicketCreateSchema>;


export const UserSchema = z.object({
  username: z.string().max(80, "Username characters limit is 80").min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email").max(255),
  creationDate: z.iso.datetime(),
  role: z.enum(["USER", "ADMIN"]),
});

export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = UserSchema.omit({creationDate: true, role: true}).extend({password: z.string().max(80, "Password characters limit is 80").min(6, "Password must be at least 6 characters")});
export type UserCreateDTO = z.infer<typeof UserCreateSchema>;
export const UserLoginSchema = UserSchema.omit({creationDate: true, role: true, email: true}).extend({password: z.string().max(80, "Password characters limit is 80").min(6, "Password must be at least 6 characters")});
export type UserLoginDTO = z.infer<typeof UserLoginSchema>;
