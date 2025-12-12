import { Router } from 'express';
import { screeningController } from '../controllers/screeningController';
import { movieController } from '../controllers/movieController';

const router = Router({ mergeParams: true });

/**
 * @openapi
 * /movies/{movieId}/screenings:
 *   get:
 *     summary: Get all screenings for a specific movie
 *     tags:
 *       - Screenings
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie to retrieve screenings for
 *     responses:
 *       200:
 *         description: A list of screenings for the specified movie
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Invalid movie ID
 *       404:
 *         description: Movie not found
 * /movies/{movieId}/screenings/by-date:
 *   get:
 *     summary: Get screenings for a movie on a specific date
 *     tags:
 *       - Screenings
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the movie to retrieve screenings for
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date to filter screenings by (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: A list of screenings for the specified movie on the selected date
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Missing or invalid movie ID, or missing/invalid date parameter
 *       404:
 *         description: Movie not found
 */
router.get('/', screeningController.getMovieScreenings);
router.get('/by-date', screeningController.getMovieScreeningsByDate);

export default router;