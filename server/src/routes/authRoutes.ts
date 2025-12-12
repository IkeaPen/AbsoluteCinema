import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authHandler } from '../middlewares/authHandler';

const router = Router();

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get the authenticated user's information
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReturn'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               username:
 *                 type: string
 *                 example: "johnDoe"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *     responses:
 *       201:
 *         description: User successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReturn'
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Username already exists
 *
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johnDoe"
 *               password:
 *                 type: string
 *                 example: "mypassword123"
 *     responses:
 *       200:
 *         description: Login successful — cookies set.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReturn'
 *       400:
 *         description: Missing fields / wrong username / wrong password
 *
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logged out"
 *
 * /auth/refresh:
 *   post:
 *     summary: Refresh access & refresh tokens
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Tokens refreshed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserReturn'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found.
 */
router.get('/me', authHandler, authController.getUser);
router.post('/register', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/refresh', authController.refreshUser);

export default router;