import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "AbsoluteCinema API",
      version: "1.0.0",
      description: "AbsoluteCinema API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local dev server",
      },
    ],

    components: {
        schemas: {
            Movie: {
            type: "object",
            properties: {
                id: { type: "integer" },
                title: { type: "string", example: "Inception" },
                studio: { type: "string", example: "Warner Bros." },
                description: { type: "string", nullable: true, example: "A thief who enters dreams..." },
                releaseDate: { type: "string", format: "date-time", example: "2010-07-16T00:00:00.000Z" },
            },
            },
            MovieInput: {
            type: "object",
            required: ["title", "studio", "releaseDate"],
            properties: {
                title: { type: "string" },
                studio: { type: "string" },
                description: { type: "string", nullable: true },
                releaseDate: { type: "string", format: "date-time" },
            },
            },

            CinemaHall: {
            type: "object",
            properties: {
                id: { type: "integer" },
                name: { type: "string", example: "Hall 1" },
            },
            },
            CinemaHallInput: {
            type: "object",
            required: ["name"],
            properties: {
                name: { type: "string" },
            },
            },

            Seat: {
            type: "object",
            properties: {
                id: { type: "integer" },
                row: { type: "integer", example: 5 },
                number: { type: "integer", example: 8 },
                cinemaHallId: { type: "integer" },
            },
            },
            SeatInput: {
            type: "object",
            required: ["row", "number", "cinemaHallId"],
            properties: {
                row: { type: "integer" },
                number: { type: "integer" },
                cinemaHallId: { type: "integer" },
            },
            },

            Screening: {
            type: "object",
            properties: {
                id: { type: "integer" },
                date: { type: "string", format: "date-time" },
                priceRatio: { type: "number", example: 1.2 },
                movieId: { type: "integer" },
                cinemaHallId: { type: "integer" },
            },
            },
            ScreeningInput: {
            type: "object",
            required: ["date", "priceRatio", "movieId", "cinemaHallId"],
            properties: {
                date: { type: "string", format: "date-time" },
                priceRatio: { type: "number" },
                movieId: { type: "integer" },
                cinemaHallId: { type: "integer" },
            },
            },

            /*Ticket: {
            type: "object",
            properties: {
                id: { type: "integer" },
                finalPrice: { type: "number", example: 12.99 },
                purchaseDate: { type: "string", format: "date-time" },
                userId: { type: "integer" },
                screeningId: { type: "integer" },
                ticketTypeId: { type: "integer" },
                seatId: { type: "integer" },
            },
            },
            TicketInput: {
            type: "object",
            required: ["finalPrice", "userId", "screeningId", "ticketTypeId", "seatId"],
            properties: {
                finalPrice: { type: "number" },
                userId: { type: "integer" },
                screeningId: { type: "integer" },
                ticketTypeId: { type: "integer" },
                seatId: { type: "integer" },
            },
            },

            TicketType: {
            type: "object",
            properties: {
                id: { type: "integer" },
                price: { type: "number", example: 10.0 },
                description: { type: "string", example: "Standard ticket" },
            },
            },
            TicketTypeInput: {
            type: "object",
            required: ["price", "description"],
            properties: {
                price: { type: "number" },
                description: { type: "string" },
            },
            },

            User: {
            type: "object",
            properties: {
                id: { type: "integer" },
                username: { type: "string", example: "john_doe" },
                email: { type: "string", example: "john@example.com" },
                creationDate: { type: "string", format: "date-time" },
            },
            },
            UserInput: {
            type: "object",
            required: ["username", "passwordHash", "email"],
            properties: {
                username: { type: "string" },
                passwordHash: { type: "string" },
                email: { type: "string" },
            },
            },*/
        },
    },

  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
