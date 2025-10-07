import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const movieService = {

  async getMovies() {
    return prisma.movie.findMany();
  },

  async getMovieById(id: string) {
    if (Number.isNaN(Number(id))) return null;
    return prisma.movie.findFirst({
      where: {
        id: Number(id)
      }
    })
  },

  async createMovie(movieData: Prisma.MovieCreateInput) {
    return prisma.movie.create({ 
      data: movieData 
    });
  },

  async updateMovie(id: string, movieData: Prisma.MovieCreateInput) {
    if (Number.isNaN(Number(id))) throw new Error('cannot update movie: id must be a number');
    return prisma.movie.update({ 
      where: {
        id: Number(id)
      },
      data: movieData 
    });
  },

  async deleteMovie(id: string, movieData: Prisma.MovieCreateInput) {
    if (Number.isNaN(Number(id))) throw new Error('cannot delete movie: id must be a number');
    return prisma.movie.delete({ 
      where: {
        id: Number(id)
      }
    });
  },

  /*async addMovie(input: any) {
    // Example of business rule
    if (!input.title) throw new Error("Movie must have a title");
    return MovieRepository.create(input);
  },*/
};

