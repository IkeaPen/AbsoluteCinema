import { Request, Response, NextFunction } from 'express';
import { movieService } from "../services/movieService";
import { validateIdParse } from "../validators/idValidators";
import { createError } from '../middlewares/errorHandler';

export const movieController = {

  async getMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const allMovies = await movieService.getMovies();
      res.json(allMovies);
    } catch (error) {
      next(error);
    }
  },

  async getMovieById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "movie ID");

      const movieById = await movieService.getMovieById(id);
      if (!movieById) throw createError("Movie not found", 404);
      
      res.json(movieById);
    } catch (error) {
      next(error);
    }
  },

  async getAiringMovies(req: Request, res: Response, next: NextFunction) {
    try {
      const airingMovies = await movieService.getAiringMovies();
      res.json(airingMovies);
    } catch (error) {
      next(error);
    }
  },

  async getMoviesByScreeningDate(req: Request, res: Response, next: NextFunction) {
    try {
      const selectedDate = req.query.date;
      if (!selectedDate) throw createError("No selected date", 400);
      const filteredMovies = await movieService.getMoviesByScreeningDate(new Date(selectedDate as string));
      res.json(filteredMovies);
    } catch (error) {
      next(error);
    }
  },
  
  async createMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const newMovie = await movieService.createMovie(req.body);
      return res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  },

  async updateMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "movie ID");

      const newMovie = await movieService.updateMovie(id, req.body);
      return res.status(200).json(newMovie);
    } catch (error) {
      next(error);
    }
  },

  async deleteMovie(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateIdParse(req.params.id, "movie ID");

      const removedMovie = await movieService.deleteMovie(id);
      return res.status(200).json(removedMovie);
    } catch (error) {
      next(error);
    }
  },
};
/*
// Create an item
export const createItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newItem: Item = { id: Date.now(), name };
    items.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// Read single item
export const getItemById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = items.find((i) => i.id === id);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// Update an item
export const updateItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    items[itemIndex].name = name;
    res.json(items[itemIndex]);
  } catch (error) {
    next(error);
  }
};

// Delete an item
export const deleteItem = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    const deletedItem = items.splice(itemIndex, 1)[0];
    res.json(deletedItem);
  } catch (error) {
    next(error);
  }
};
*/