import { Router } from 'express';
import { seatController } from '../controllers/seatController';
import { adminOnly, authHandler } from '../middlewares/authHandler';

const router = Router();

/**
 * @openapi
 * /seats:
 *   get:
 *     summary: Get all seats
 *     tags:
 *       - Seats
 *     responses:
 *       200:
 *         description: A list of seats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Seat'
 *   post:
 *     summary: Create a new seat
 *     tags:
 *       - Seats
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SeatInput'
 *     responses:
 *       201:
 *         description: Seat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Missing or invalid field in request body.
 *       409:
 *         description: Duplicate entry violates unique constraint
 * /seats/{id}:
 *   get:
 *     summary: Get a seat by ID
 *     tags:
 *       - Seats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seat details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Invalid seat ID
 *       404:
 *         description: Seat not found
 *   put:
 *     summary: Update a seat
 *     tags:
 *       - Seats
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
 *             $ref: '#/components/schemas/SeatInput'
 *     responses:
 *       200:
 *         description: Seat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Invalid seat ID
 *       404:
 *         description: Record not found
 *       409:
 *         description: Duplicate entry violates unique constraint
 *   delete:
 *     summary: Delete a seat by ID
 *     tags: 
 *       - Seats
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Seat'
 *       400:
 *         description: Invalid seat ID
 *       404:
 *         description: Record not found
 */
router.get('/', authHandler, seatController.getSeats);
router.get('/:id', authHandler, seatController.getSeatById);
router.post('/', authHandler, adminOnly, seatController.createSeat);
router.put('/:id', authHandler, adminOnly, seatController.updateSeat);
router.delete('/:id', authHandler, adminOnly, seatController.deleteSeat);

export default router;