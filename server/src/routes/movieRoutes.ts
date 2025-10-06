import { Router } from 'express';
import { movieController } from '../controllers/movieController';

const router = Router();

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
//router.post('/', createItem);
//router.put('/:id', updateItem);
//router.delete('/:id', deleteItem);

export default router;