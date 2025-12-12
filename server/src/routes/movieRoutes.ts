import { Router } from 'express';
import { movieController } from '../controllers/movieController';
import { adminOnly, authHandler } from '../middlewares/authHandler';

const router = Router();

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *   post:
 *     summary: Create a new movie
 *     tags:
 *       - Movies
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Missing or invalid field in request body.
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 * /movies/airing:
 *   get:
 *     summary: Get all currently airing movies
 *     description: Returns movies that have at least one screening scheduled today or in the future.
 *     tags:
 *       - Movies
 *     responses:
 *       200:
 *         description: A list of currently airing movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 * /movies/by-screening-date:
 *   get:
 *     summary: Get movies by screening date
 *     description: Returns movies that have screenings on the specified date.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of movies with screenings on the given date.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       400:
 *         description: No date was provided or the date was invalid.
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 *   put:
 *     summary: Update a movie
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieInput'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid movie ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Record not found
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: 
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       400:
 *         description: Invalid movie ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Record not found
 */
router.get('/', movieController.getMovies);
router.get('/airing', movieController.getAiringMovies);
router.get('/by-screening-date', movieController.getMoviesByScreeningDate);
router.get('/:id', movieController.getMovieById);
router.post('/', authHandler, adminOnly, movieController.createMovie);
router.put('/:id', authHandler, adminOnly, movieController.updateMovie);
router.delete('/:id', authHandler, adminOnly, movieController.deleteMovie);

export default router;