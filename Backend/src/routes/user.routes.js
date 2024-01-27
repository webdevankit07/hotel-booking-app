import { Router } from 'express';
import { loginUser, registerUser, validateToken } from '../controllers/user.controller.js';
import validate from '../middlewares/validator.middleware.js';
import { loginSchema, signupSchema } from '../validators/auth.validator.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

// Public Routes...
router.route('/register').post(validate(signupSchema), registerUser);
router.route('/login').post(validate(loginSchema), loginUser);

// Private Routes...
router.route('/auth/validate-token').get(verifyToken, validateToken);

export { router as userRouter };
