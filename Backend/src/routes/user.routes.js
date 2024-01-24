import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import validate from '../middlewares/validator.middleware.js';
import { signupSchema } from '../validators/auth.validator.js';

const router = Router();

// Public Routes...
router.route('/register').post(validate(signupSchema), registerUser);

// Private Routes...

export { router as userRouter };
