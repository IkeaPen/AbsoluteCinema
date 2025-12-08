import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authHandler } from '../middlewares/authHandler';

const router = Router();

router.get('/me', authHandler, authController.getUser);
router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/refresh', authController.refreshUser);

export default router;