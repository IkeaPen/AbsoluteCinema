import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
import { adminOnly, authHandler } from '../middlewares/authHandler';

const router = Router();

router.get('/', authHandler, adminOnly, ticketController.getTickets);
router.get('/types', authHandler, ticketController.getTicketTypes);
router.get('/me', authHandler, ticketController.getUserTickets);
//router.post('/', authHandler, ticketController.createScreeningTicket);


export default router;