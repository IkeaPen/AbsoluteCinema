import { Router } from 'express';
import { cinemaHallController } from '../controllers/cinemaHallController';

const router = Router();

router.get('/', cinemaHallController.getCinemaHalls);
router.get('/:id', cinemaHallController.getCinemaHallById);
router.post('/', cinemaHallController.createCinemaHall);
router.put('/:id', cinemaHallController.updateCinemaHall);
router.delete('/:id', cinemaHallController.deleteCinemaHall);

export default router;