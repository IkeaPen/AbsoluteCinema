import { Router } from 'express';
import { seatController } from '../controllers/seatController';

const router = Router();

router.get('/', seatController.getSeats);
router.get('/:id', seatController.getSeatById);
router.post('/', seatController.createSeat);
router.put('/:id', seatController.updateSeat);
router.delete('/:id', seatController.deleteSeat);

export default router;