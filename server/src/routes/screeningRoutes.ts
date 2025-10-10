import { Router } from 'express';
import { screeningController } from '../controllers/screeningController';

const router = Router();

router.get('/', screeningController.getScreenings);
router.get('/:id', screeningController.getScreeningById);
router.post('/', screeningController.createScreening);
router.put('/:id', screeningController.updateScreening);
router.delete('/:id', screeningController.deleteScreening);

export default router;