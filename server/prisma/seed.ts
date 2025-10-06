import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Users
  const user1 = await prisma.user.create({
    data: {
      username: "alice",
      email: "alice@example.com",
      passwordHash: "hashed_password_1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "bob",
      email: "bob@example.com",
      passwordHash: "hashed_password_2",
    },
  });

  // Ticket Types
  const regular = await prisma.ticketType.create({
    data: { price: 10.0, description: "Regular seat ticket" },
  });

  const vip = await prisma.ticketType.create({
    data: { price: 15.0, description: "VIP seat ticket with extra legroom" },
  });

  // Movies
  const movie1 = await prisma.movie.create({
    data: {
      title: "Inception",
      studio: "Warner Bros",
      description:
        "A skilled thief who steals corporate secrets through the use of dream-sharing technology.",
      releaseDate: new Date("2010-07-16"),
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: "Interstellar",
      studio: "Paramount Pictures",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      releaseDate: new Date("2014-11-07"),
    },
  });

  // Cinema Halls
  const hall1 = await prisma.cinemaHall.create({
    data: {
      name: "Hall A",
      seats: {
        create: Array.from({ length: 5 }).flatMap((_, row) =>
          Array.from({ length: 8 }).map((_, num) => ({
            row: row + 1,
            number: num + 1,
          }))
        ),
      },
    },
  });

  const hall2 = await prisma.cinemaHall.create({
    data: {
      name: "Hall B",
      seats: {
        create: Array.from({ length: 4 }).flatMap((_, row) =>
          Array.from({ length: 6 }).map((_, num) => ({
            row: row + 1,
            number: num + 1,
          }))
        ),
      },
    },
  });

  // Screenings
  const screening1 = await prisma.screening.create({
    data: {
      date: new Date("2025-10-07T18:00:00Z"),
      priceRatio: 1.0,
      movieId: movie1.id,
      cinemaHallId: hall1.id,
    },
  });

  const screening2 = await prisma.screening.create({
    data: {
      date: new Date("2025-10-07T21:00:00Z"),
      priceRatio: 1.2,
      movieId: movie2.id,
      cinemaHallId: hall2.id,
    },
  });

  // Tickets
  const seatA1 = await prisma.seat.findFirst({
    where: { cinemaHallId: hall1.id, row: 1, number: 1 },
  });

  const seatB2 = await prisma.seat.findFirst({
    where: { cinemaHallId: hall2.id, row: 2, number: 3 },
  });

  if (seatA1 && seatB2) {
    await prisma.ticket.create({
      data: {
        finalPrice: regular.price * screening1.priceRatio,
        userId: user1.id,
        screeningId: screening1.id,
        ticketTypeId: regular.id,
        seatId: seatA1.id,
      },
    });

    await prisma.ticket.create({
      data: {
        finalPrice: vip.price * screening2.priceRatio,
        userId: user2.id,
        screeningId: screening2.id,
        ticketTypeId: vip.id,
        seatId: seatB2.id,
      },
    });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    //@ts-ignore
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
