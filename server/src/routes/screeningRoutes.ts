import { Router } from 'express';
import { screeningController } from '../controllers/screeningController';

const router = Router();

/**
 * @openapi
 * /screenings:
 *   get:
 *     summary: Get all screenings
 *     tags:
 *       - Screenings
 *     responses:
 *       200:
 *         description: A list of screenings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Screening'
 *   post:
 *     summary: Create a new screening
 *     tags:
 *       - Screenings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ScreeningInput'
 *     responses:
 *       201:
 *         description: Screening created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Missing or invalid field in request body.
 * /screenings/{id}:
 *   get:
 *     summary: Get a screening by ID
 *     tags:
 *       - Screenings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Screening details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Invalid screening ID
 *       404:
 *         description: Screening not found
 *   put:
 *     summary: Update a screening
 *     tags:
 *       - Screenings
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
 *             $ref: '#/components/schemas/ScreeningInput'
 *     responses:
 *       200:
 *         description: Screening updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Invalid screening ID
 *       404:
 *         description: Record not found
 *   delete:
 *     summary: Delete a screening by ID
 *     tags: 
 *       - Screenings
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Screening deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Screening'
 *       400:
 *         description: Invalid screening ID
 *       404:
 *         description: Record not found
 */
router.get('/', screeningController.getScreenings);
router.get('/:id', screeningController.getScreeningById);
router.post('/', screeningController.createScreening);
router.put('/:id', screeningController.updateScreening);
router.delete('/:id', screeningController.deleteScreening);

export default router;