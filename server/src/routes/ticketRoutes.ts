import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
import { adminOnly, authHandler } from '../middlewares/authHandler';

const router = Router();

/**
 * @openapi
 * /tickets:
 *   get:
 *     summary: Get all tickets
 *     description: Returns all tickets in the system
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: A list of all tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 * /tickets/types:
 *   get:
 *     summary: Get all ticket types
 *     description: Returns all available ticket types
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: A list of ticket types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TicketType'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 * /tickets/me:
 *   get:
 *     summary: Get all tickets belonging to the authenticated user
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: A list of the user's tickets with detailed screening info
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ticket'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get('/', authHandler, adminOnly, ticketController.getTickets);
router.get('/types', authHandler, ticketController.getTicketTypes);
router.get('/me', authHandler, ticketController.getUserTickets);
//router.post('/', authHandler, ticketController.createScreeningTicket);


export default router;