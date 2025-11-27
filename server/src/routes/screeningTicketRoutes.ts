import { Router } from 'express';
import { ticketController } from '../controllers/ticketController';
import { authHandler } from '../middlewares/authHandler';

const router = Router({ mergeParams: true });

router.get('/bought', authHandler, ticketController.getScreeningBoughtSeatIds);
router.post('/:seatId/tickets', authHandler, ticketController.createScreeningTicket);

export default router;