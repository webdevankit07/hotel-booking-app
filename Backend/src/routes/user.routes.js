import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';
import validate from '../middlewares/validator.middleware.js';
import { loginSchema, signupSchema } from '../validators/auth.validator.js';

const router = Router();

// Public Routes...
router.route('/register').post(validate(signupSchema), registerUser);
router.route('/login').post(validate(loginSchema), loginUser);

// Private Routes...

export { router as userRouter };
