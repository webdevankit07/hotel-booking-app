import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { check } from 'express-validator';

const router = Router();

const registerValidation = [
    check('fullName', 'fullName is required').isString().isLength({ min: 1 }),
    check('userName', 'userName is required').isString().isLength({ min: 1 }),
    check('email', 'email is required').isEmail().isLength({ min: 1 }),
    check('password', 'Password with 8 or more characters required').isLength({ min: 8 }),
];

// Public Routes...
router
    .get('/', (req, res) => {
        res.send({ status: 'User route is running on - 8000/api/v1/user ' });
    })
    .post('/register', registerValidation, registerUser);

// Private Routes...

export { router as userRouter };
