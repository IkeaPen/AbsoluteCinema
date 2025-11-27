import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
import { adminOnly, authHandler } from '../middlewares/authHandler';

const router = Router();

router.get('/', authHandler, adminOnly, ticketController.getTickets);
router.get('/me', authHandler, ticketController.getUserTicketsWithScreeningAndMovie);


export default router;