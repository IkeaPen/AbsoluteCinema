import { Router } from 'express';
import { screeningController } from '../controllers/screeningController';

const router = Router({ mergeParams: true });

router.get('/', screeningController.getCinemaHallScreenings);

export default router;