import { Router } from 'express';
import { getUserDetails, loginUser, logoutUser, registerUser, validateToken } from '../controllers/auth.controller.js';
import validate from '../middlewares/validator.middleware.js';
import { loginSchema, signupSchema } from '../validators/auth.validator.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

// Public Routes...
router.route('/register').post(validate(signupSchema), registerUser);
router.route('/login').post(validate(loginSchema), loginUser);

// Private Routes...
router.route('/me').get(verifyToken, getUserDetails);
router.route('/validate-token').get(verifyToken, validateToken);
router.route('/logout').post(verifyToken, logoutUser);

export { router as authRoutes };
