import { Router } from 'express';
import { screeningController } from '../controllers/screeningController';

const router = Router({ mergeParams: true });

/**
 * @openapi
 * /cinema-halls/{cinemaHallId}/screenings:
 *   get:
 *     summary: Get all screenings for a specific cinema hall
 *     tags:
 *       - Screenings
 *     parameters:
 *       - in: path
 *         name: cinemaHallId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cinema hall to retrieve screenings for
 *     responses:
 *       200:
 *         description: A list of screenings for the specified cinema hall
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Invalid cinema hall ID
 *       404:
 *         description: Cinema hall not found
 */
router.get('/', screeningController.getCinemaHallScreenings);

export default router;