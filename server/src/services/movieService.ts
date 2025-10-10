import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";

export const movieService = {

  async getMovies() {
    return prisma.movie.findMany();
  },

  async getMovieById(id: number) {
    return prisma.movie.findFirst({
      where: {
        id: id
      }
    })
  },

  async createMovie(movieData: Prisma.MovieCreateInput) {
    return prisma.movie.create({ 
      data: movieData 
    });
  },

  async updateMovie(id: number, movieData: Prisma.MovieCreateInput) {
    return prisma.movie.update({ 
      where: {
        id: id
      },
      data: movieData 
    });
  },

  async deleteMovie(id: number) {
    return prisma.movie.delete({ 
      where: {
        id: id
      }
    });
  },

  async checkMovieExists(id: number) {
    return prisma.movie.findUnique({ 
      where: { 
        id: id 
      },
      select: { 
        id: true 
      },
    });
  },

};

