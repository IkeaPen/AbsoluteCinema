import { Router } from 'express';
import { seatController } from '../controllers/seatController';
import { authHandler } from '../middlewares/authHandler';

const router = Router({ mergeParams: true });

/**
 * @openapi
 * /cinema-halls/{cinemaHallId}/seats:
 *   get:
 *     summary: Get all seats for a specific cinema hall
 *     tags:
 *       - Seats
 *     parameters:
 *       - in: path
 *         name: cinemaHallId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the cinema hall to retrieve seats for
 *     responses:
 *       200:
 *         description: A list of seats for the specified cinema hall
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Invalid cinema hall ID
 *       404:
 *         description: Cinema hall not found
 */
router.get('/', authHandler, seatController.getCinemaHallSeats);
//router.get('/:id', seatController.getCinemaHallSeatById);
//router.post('/', seatController.createCinemaHallSeat);
//router.put('/:id', seatController.updateCinemaHallSeat);
//router.delete('/:id', seatController.deleteCinemaHallSeat);

export default router;