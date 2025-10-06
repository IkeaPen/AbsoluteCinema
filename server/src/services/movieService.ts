import { prisma } from "../config/prisma";

export const movieService = {

  async listAllMovies() {
    return prisma.movie.findMany();
  },

  async listMovieById(id: string) {
    if (Number.isNaN(Number(id))) return null;
    return prisma.movie.findFirst( {
      where: {
        id: Number(id)
      }
    })
  }

  /*async addMovie(input: any) {
    // Example of business rule
    if (!input.title) throw new Error("Movie must have a title");
    return MovieRepository.create(input);
  },*/
};

