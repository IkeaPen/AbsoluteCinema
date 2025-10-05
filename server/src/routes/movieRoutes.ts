import { Router } from 'express';
import {
  getMovies
} from '../controllers/movieController';

const router = Router();

router.get('/', getMovies);
//router.get('/:id', getItemById);
//router.post('/', createItem);
//router.put('/:id', updateItem);
//router.delete('/:id', deleteItem);

export default router;