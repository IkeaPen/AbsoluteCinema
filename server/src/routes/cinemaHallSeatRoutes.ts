import { Router } from 'express';
import { seatController } from '../controllers/seatController';

const router = Router({ mergeParams: true });

router.get('/', seatController.getCinemaHallSeats);
//router.get('/:id', seatController.getCinemaHallSeatById);
//router.post('/', seatController.createCinemaHallSeat);
//router.put('/:id', seatController.updateCinemaHallSeat);
//router.delete('/:id', seatController.deleteCinemaHallSeat);

export default router;