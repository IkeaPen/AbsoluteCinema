import { Router } from 'express';
import { cinemaHallController } from '../controllers/cinemaHallController';
import { adminOnly, authHandler } from '../middlewares/authHandler';

const router = Router();

/**
 * @openapi
 * /cinema-halls:
 *   get:
 *     summary: Get all cinema halls
 *     tags:
 *       - CinemaHalls
 *     responses:
 *       200:
 *         description: A list of cinema halls
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CinemaHall'
 *   post:
 *     summary: Create a new cinema hall
 *     tags:
 *       - CinemaHalls
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CinemaHallInput'
 *     responses:
 *       201:
 *         description: Cinema hall created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaHall'
 *       400:
 *         description: Missing or invalid field in request body.
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 * /cinema-halls/{id}:
 *   get:
 *     summary: Get a cinema hall by ID
 *     tags:
 *       - CinemaHalls
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cinema hall details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaHall'
 *       400:
 *         description: Invalid cinema hall ID
 *       404:
 *         description: Cinema hall not found
 *   put:
 *     summary: Update a cinema hall
 *     tags:
 *       - CinemaHalls
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
 *             $ref: '#/components/schemas/CinemaHallInput'
 *     responses:
 *       200:
 *         description: Cinema hall updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaHall'
 *       400:
 *         description: Invalid cinema hall ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Record not found
 *   delete:
 *     summary: Delete a cinema hall by ID
 *     tags: 
 *       - CinemaHalls
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cinema hall deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CinemaHall'
 *       400:
 *         description: Invalid cinema hall ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Record not found
 */
router.get('/', cinemaHallController.getCinemaHalls);
router.get('/:id', cinemaHallController.getCinemaHallById);
router.post('/', authHandler, adminOnly, cinemaHallController.createCinemaHall);
router.put('/:id', authHandler, adminOnly, cinemaHallController.updateCinemaHall);
router.delete('/:id', authHandler, adminOnly, cinemaHallController.deleteCinemaHall);

export default router;