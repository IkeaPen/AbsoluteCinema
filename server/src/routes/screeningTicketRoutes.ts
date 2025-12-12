import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
import { authHandler } from '../middlewares/authHandler';

const router = Router({ mergeParams: true });

/**
 * @openapi
 * /screenings/{screeningId}/seats/bought:
 *   get:
 *     summary: Get all bought seat IDs for a specific screening
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: screeningId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the screening to check bought seats for
 *     responses:
 *       200:
 *         description: A list of bought seat IDs for the specified screening
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 seatIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [12, 15, 22]
 *       400:
 *         description: Invalid screening ID or screening does not exist
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /screenings/{screeningId}/seats/{seatId}/tickets:
 *   post:
 *     summary: Buy a ticket for a specific seat in a screening
 *     tags:
 *       - Tickets
 *     parameters:
 *       - in: path
 *         name: screeningId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the screening
 *       - in: path
 *         name: seatId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the seat to purchase
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - finalPrice
 *               - ticketTypeId
 *             properties:
 *               finalPrice:
 *                 type: number
 *                 example: 12.5
 *               ticketTypeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Ticket successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         description: Invalid screening ID or seat ID, seat does not exist, or seat already bought
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/bought', authHandler, ticketController.getScreeningBoughtSeatIds);
router.post('/:seatId/tickets', authHandler, ticketController.createScreeningTicket);

export default router;